import { Routes, Route } from 'react-router-dom';
import AdminSignupForm from '../pages/Auth/adminSignup.jsx';
import AdminLoginForm from '../pages/Auth/adminLogin.jsx';
// import AdminProfile from '../pages/Admin/adminProfile.jsx'; // Ensure this file exists

function AdminPathRouter() {
  return (
    <Routes>
      <Route path="signup" element={<AdminSignupForm />} />
      <Route path="login" element={<AdminLoginForm />} />
      {/* <Route path="profile" element={<AdminProfile />} /> */}
    </Routes>
  );
}

export default AdminPathRouter;
