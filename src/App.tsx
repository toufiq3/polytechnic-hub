import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AdminLayout } from "@/components/layout/AdminLayout";
import Dashboard from "./pages/Dashboard";
import StudentsList from "./pages/StudentsList";
import AddStudent from "./pages/AddStudent";
import DiscontinuedStudents from "./pages/DiscontinuedStudents";
import Admissions from "./pages/Admissions";
import ClassRoutine from "./pages/ClassRoutine";
import AttendanceMarks from "./pages/AttendanceMarks";
import StudentProfiles from "./pages/StudentProfiles";
import Alumni from "./pages/Alumni";
import Documents from "./pages/Documents";
import Applications from "./pages/Applications";
import CorrectionRequests from "./pages/CorrectionRequests";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import ActivityLogs from "./pages/ActivityLogs";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route element={<AdminLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/students" element={<StudentsList />} />
              <Route path="/add-student" element={<AddStudent />} />
              <Route path="/discontinued-students" element={<DiscontinuedStudents />} />
              <Route path="/admissions" element={<Admissions />} />
              <Route path="/class-routine" element={<ClassRoutine />} />
              <Route path="/attendance-marks" element={<AttendanceMarks />} />
              <Route path="/student-profiles" element={<StudentProfiles />} />
              <Route path="/alumni" element={<Alumni />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/applications" element={<Applications />} />
              <Route path="/correction-requests" element={<CorrectionRequests />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/activity-logs" element={<ActivityLogs />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
