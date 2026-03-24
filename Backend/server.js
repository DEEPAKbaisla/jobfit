import dotenv from "dotenv";
dotenv.config();
import app from "./src/app.js";

let PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});

// Export for Vercel serverless
export default app;