import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./Home";
import Event from "./Event";
import Course from "./Course";
import Student from "./Student";
import Teacher from "./Teacher";
import Scholarship from "./Scholarship";
import Contact from "./Contact";

// Admin Imports
import { AuthProvider } from "./admin/context/AuthContext.jsx";
import ProtectedRoute from "./admin/components/ProtectedRoute.jsx";
import AdminLayout from "./admin/components/AdminLayout.jsx";
import AdminLogin from "./admin/pages/AdminLogin.jsx";
import AdminRegister from "./admin/pages/AdminRegister.jsx";
import AdminDashboard from "./admin/pages/AdminDashboard.jsx";
import CoursesManager from "./admin/pages/CoursesManager.jsx";
import EventsManager from "./admin/pages/EventsManager.jsx";
import StudentsManager from "./admin/pages/StudentsManager.jsx";
import TeachersManager from "./admin/pages/TeachersManager.jsx";
import AchievementsManager from "./admin/pages/AchievementsManager.jsx";
import MessagesManager from "./admin/pages/MessagesManager.jsx";
import EnrollmentsManager from "./admin/pages/EnrollmentsManager.jsx";
import SettingsManager from "./admin/pages/SettingsManager.jsx";

function App() {
  return(
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<Home/>} />
          <Route path="/course" element={<Course/>}/>
          <Route path="/event" element={<Event/>}/>
          <Route path="/student" element={<Student/>}/>
          <Route path="/teacher" element={<Teacher/>}/>
          <Route path="/scholarship" element={<Scholarship/>}/>
          <Route path="/contact" element={<Contact/>}/>

          {/* Admin Authentication Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<AdminRegister />} />

          {/* Protected Admin Routes with Sidebar Layout */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="courses" element={<CoursesManager />} />
            <Route path="events" element={<EventsManager />} />
            <Route path="students" element={<StudentsManager />} />
            <Route path="teachers" element={<TeachersManager />} />
            <Route path="scholarships" element={<AchievementsManager />} />
            <Route path="messages" element={<MessagesManager />} />
            <Route path="enrollments" element={<EnrollmentsManager />} />
            <Route path="settings" element={<SettingsManager />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
export default App