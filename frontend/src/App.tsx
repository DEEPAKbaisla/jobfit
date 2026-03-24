import { Toaster } from "@/components/ui/sonner";
import { RouterProvider } from "react-router";
import { router } from "./app.routes.tsx";
import { AuthProvider } from "./features/auth/auth.context.tsx";
import { InterviewProvider } from "./features/interview/interview.context.tsx";

const App = () => {
  return (
    <AuthProvider>
      <InterviewProvider>
        <Toaster richColors position="top-right" closeButton />
        <RouterProvider router={router} />
      </InterviewProvider>
    </AuthProvider>
  );
};

export default App;
