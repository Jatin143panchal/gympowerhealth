import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword"; // ✅ Add this
import Contact from "./pages/Contact";
import Join from "./pages/Join";
import Membership from "./pages/Membership";
import Trainers from "./pages/Trainers";
import Services from "./pages/Services";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

import { ComplimentarySection } from "./components/home/ComplimentarySection";

import WhatsAppButton from "./components/WhatsAppButton";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import RedirectIfAuth from "./components/auth/RedirectIfAuth";

// Admin
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import MembersPage from "./pages/admin/Members";
import BroadcastPage from "./pages/admin/Broadcast";
import AnnouncementsPage from "./pages/admin/Announcements";
import SettingsPage from "./pages/admin/Settings";

// User
import UserLayout from "./components/user/UserLayout";
import UserDashboard from "./pages/user/Dashboard";
import WorkoutsPage from "./pages/user/Workouts";
import DietPage from "./pages/user/Diet";
import UserAnnouncementsPage from "./pages/user/Announcements";
import ProfilePage from "./pages/user/Profile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<RedirectIfAuth><Login /></RedirectIfAuth>} />
          <Route path="/forgot-password" element={<RedirectIfAuth><ForgotPassword /></RedirectIfAuth>} />
          <Route path="/reset-password" element={<RedirectIfAuth><ResetPassword /></RedirectIfAuth>} /> {/* ✅ New */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/join" element={<Join />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/trainers" element={<Trainers />} />
          <Route path="/services" element={<Services />} />
          <Route path="/complimentary" element={<ComplimentarySection />} />
          <Route path="/about" element={<About />} />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requireAdmin>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="members" element={<MembersPage />} />
            <Route path="broadcast" element={<BroadcastPage />} />
            <Route path="announcements" element={<AnnouncementsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          {/* User Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <UserLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<UserDashboard />} />
            <Route path="workouts" element={<WorkoutsPage />} />
            <Route path="diet" element={<DietPage />} />
            <Route path="announcements" element={<UserAnnouncementsPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>

      {/* Floating WhatsApp */}
      <WhatsAppButton />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
