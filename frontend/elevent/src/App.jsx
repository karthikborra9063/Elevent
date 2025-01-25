import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './navbar';
import AttendeeSignupForm from './pages/Auth/attendeeSignup.jsx';
import AttendeeLoginForm from './pages/Auth/attendeeLogin.jsx';
import OrganizerSignupForm from './pages/Auth/organizerSignup.jsx';
import OrganizerLoginForm from './pages/Auth/organizerLogin.jsx';
import AdminSignupForm from './pages/Auth/adminSignup.jsx';
import AdminLoginForm from './pages/Auth/adminLogin.jsx'
import OrganizerProfile from './pages/Profile/organizerProfile.jsx';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="attendee/signup" element={<AttendeeSignupForm />} />
        <Route path="attendee/login" element={<AttendeeLoginForm />} />
        <Route path="organizer/signup" element={<OrganizerSignupForm/>}/>
        <Route path="organizer/login" element={<OrganizerLoginForm/>}/>
        <Route path="admin/signup" element={<AdminSignupForm/>}/>
        <Route path="admin/login" element={<AdminLoginForm/>}/>
        <Route path="profile" element={<OrganizerProfile/>}/>
      </Routes>
    </Router>
  );
}

export default App;
