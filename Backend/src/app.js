import express from "express";
import authRouter from "./routes/auth.routes.js";
import interviewRouter from "./routes/interview.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";

const app = express();
// ✅ Security headers
app.use(helmet());
// ✅ Gzip compression
app.use(compression());

const allowedOrigins = process.env.FRONTEND_URL?.split(",") || [
  "http://localhost:5173",
];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

// ✅ General rate limit — 100 requests per 15 min per IP
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { message: "Too many requests, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api", generalLimiter);

// ✅ Strict rate limit for AI route — 10 per hour (expensive calls)
const aiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: { message: "AI report limit reached, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api/interview", aiLimiter);

// ✅ Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

/*   using all routes  */
app.get("/", (req,res) => {
 res.send("Backend is working successfully");
});
app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
  });
});

export default app;
