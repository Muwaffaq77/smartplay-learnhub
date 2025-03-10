
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

// Pages
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Levels from "./pages/Levels";
import Course from "./pages/Course";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Onboarding from "./pages/Onboarding";
import Chat from "./pages/Chat";
import Leaderboard from "./pages/Leaderboard";
import LevelDetail from "./pages/LevelDetail";
import SubjectDetail from "./pages/SubjectDetail";

// Context
import { UserProvider, useUser } from "./contexts/UserContext";

const queryClient = new QueryClient();

// Auth route guard component
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isOnboarded } = useUser();
  
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  
  if (!isOnboarded()) {
    return <Navigate to="/onboarding" replace />;
  }
  
  return <>{children}</>;
};

// Onboarding route guard
const OnboardingRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isOnboarded } = useUser();
  
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  
  if (isOnboarded()) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

// Public route guard (for auth page)
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isOnboarded } = useUser();
  
  if (isAuthenticated) {
    if (!isOnboarded()) {
      return <Navigate to="/onboarding" replace />;
    }
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-blue-deep">
        <div className="animate-float animate-pulse-soft">
          <h1 className="text-4xl font-bold text-white">SmartPlay</h1>
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<PublicRoute><Auth /></PublicRoute>} />
        <Route path="/onboarding" element={<OnboardingRoute><Onboarding /></OnboardingRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/levels" element={<PrivateRoute><Levels /></PrivateRoute>} />
        <Route path="/levels/:levelId" element={<PrivateRoute><LevelDetail /></PrivateRoute>} />
        <Route path="/subject/:levelId/:subjectId" element={<PrivateRoute><SubjectDetail /></PrivateRoute>} />
        <Route path="/course/:id" element={<PrivateRoute><Course /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/chat" element={<PrivateRoute><Chat /></PrivateRoute>} />
        <Route path="/leaderboard" element={<PrivateRoute><Leaderboard /></PrivateRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </UserProvider>
    </QueryClientProvider>
  );
};

export default App;
