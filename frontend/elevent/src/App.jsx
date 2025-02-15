import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminNavbar from './Navbar/adminNavbar.jsx';
import OrganizerNavbar from './Navbar/organizerNavbar.jsx';
import DefaultNavbar from './Navbar/defaultNavbar.jsx';
import AdminPathRouter from './pathRoutes/adminPathRoute.jsx';
import OrganizerRouter from './pathRoutes/organizerPathRoute.jsx';
import { isAuthenticated } from './utils/auth.js';
import { useState } from 'react';
import AdminSignupForm from './pages/Auth/adminSignup.jsx';
import AdminLoginForm from './pages/Auth/adminLogin.jsx';
import OrganizerSignupForm from './pages/Auth/organizerSignup.jsx';
import OrganizerLoginForm from './pages/Auth/organizerLogin.jsx';
import HomePage from './pages/homePage.jsx'
// Check authentication once at the start
const authenticatedUser = isAuthenticated();

function App() {
  const [role, setRole] = useState(authenticatedUser?.role || null);

  const getNavbar = () => {
    switch (role) {
      case 'Admin':
        return <AdminNavbar />;
      case 'Organizer':
        return <OrganizerNavbar />;
      default:
        return <DefaultNavbar />;
    }
  };

  return (
    <Router>
      {getNavbar()}
      <Routes>
        <Route 
          path="admin/*" 
          element={role === 'Admin' ? <AdminPathRouter /> : <Navigate to="/admin/login" />} 
        />
        <Route 
          path="organizer/*" 
          element={role === 'Organizer' ? <OrganizerRouter /> : <Navigate to="/organizer/login" />} 
        />
        <Route path="admin/signup" element={<AdminSignupForm />} />
        <Route path="admin/login" element={<AdminLoginForm />} />
        <Route path="organizer/signup" element={<OrganizerSignupForm />} />
        <Route path="organizer/login" element={<OrganizerLoginForm />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
