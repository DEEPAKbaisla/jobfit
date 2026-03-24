import { createBrowserRouter } from "react-router";
import { lazy,Suspense } from "react";
import { Protected } from "./features/auth/components/Protected";

// import Login from "./features/auth/pages/Login";
// import Register from "./features/auth/pages/Register";
// import Home from "./features/interview/pages/Home";
// import Interview from "./features/interview/pages/Interview";
// import LandingPage from "./components/Home";




// ✅ Lazy load all pages
const Login = lazy(() => import("./features/auth/pages/Login"));
const Register = lazy(() => import("./features/auth/pages/Register"));
const Home = lazy(() => import("./features/interview/pages/Home"));
const Interview = lazy(() => import("./features/interview/pages/Interview"));
const LandingPage = lazy(() => import("./components/Home"));

// ✅ Reusable loading fallback
const PageLoader = () => (
  <main className="flex items-center justify-center min-h-screen bg-[#06060a]">
    <div className="flex flex-col items-center gap-6">
      <div className="relative w-20 h-20">
        <svg viewBox="0 0 80 80" className="w-20 h-20 -rotate-90">
          <circle cx="40" cy="40" r="30" fill="none" stroke="rgba(124,58,237,0.15)" strokeWidth="5" strokeLinecap="round"/>
          <circle
            cx="40" cy="40" r="30"
            fill="none" stroke="#7C3AED" strokeWidth="5" strokeLinecap="round"
            strokeDasharray="188" strokeDashoffset="188"
            style={{ animation: "spin-arc 1.4s ease-in-out infinite" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-9 h-9 rounded-lg bg-violet-700 flex items-center justify-center text-white"
            style={{ fontFamily: "Georgia, serif", fontSize: 13, fontWeight: 700 }}>
            JF
          </div>
        </div>
      </div>
      <p className="text-xl font-bold text-white" style={{ fontFamily: "Georgia, serif" }}>
        Job<span className="text-violet-400 italic font-normal">Fit</span>
      </p>
      <style>{`
        @keyframes spin-arc {
          0%   { stroke-dashoffset: 188; }
          50%  { stroke-dashoffset: 47;  }
          100% { stroke-dashoffset: 188; }
        }
      `}</style>
    </div>
  </main>
);

// ✅ Wrap element with Suspense
const withSuspense = (element: React.ReactNode) => (
  <Suspense fallback={<PageLoader />}>
    {element}
  </Suspense>
);

// export const router = createBrowserRouter([
  
//   {
//     path: "/prep",
//     element: <Protected><Home/></Protected>
//   },{
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "/register",
//     element: <Register />,
//   },
//   {
//     path: "/interview/:interviewId",
//     element: <Protected><Interview/></Protected>
//   },
//   {
//     path: "/",
//     element: <LandingPage />,
//   }

// ]);


export const router = createBrowserRouter([
  {
    path: "/",
    element: withSuspense(<LandingPage />),
  },
  {
    path: "/prep",
    element: withSuspense(<Protected><Home /></Protected>),
  },
  {
    path: "/login",
    element: withSuspense(<Login />),
  },
  {
    path: "/register",
    element: withSuspense(<Register />),
  },
  {
    path: "/interview/:interviewId",
    element: withSuspense(<Protected><Interview /></Protected>),
  },
]);
