import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './navbar';
import AttendeeSignupForm from './pages/Auth/attendeeSignup.jsx';
import AttendeeLoginForm from './pages/Auth/attendeeLogin.jsx';
import OrganizerSignupForm from './pages/Auth/organizerSignup.jsx';
import OrganizerLoginForm from './pages/Auth/organizerLogin.jsx';
import AdminSignupForm from './pages/Auth/adminSignup.jsx';
import AdminLoginForm from './pages/Auth/adminLogin.jsx'
import OrganizerProfile from './pages/Profile/organizerProfile.jsx';
import CreateEventForm from './pages/Organizer/createEvent.jsx';
import EventList from './pages/Organizer/eventList.jsx';
import EventDetails from './pages/Organizer/eventDetails.jsx';
import NotificationList from './pages/Organizer/notificationList.jsx';
import NotificationDetails from './pages/Organizer/notificationDetails.jsx'
import MessageAdmin from './pages/Organizer/messageAdmin.jsx';
import UpdateToAttendee from './pages/Organizer/updateToAttendee.jsx';

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
        <Route path="create-event" element={<CreateEventForm/>}/>
        <Route path="organizer/events" element={<EventList/>}/>
        <Route path="organizer/events/:eventId" element={<EventDetails/>}/>
        <Route path="organizer/notifications" element={<NotificationList/>}/>
        <Route path="organizer/notifications/temp" element={<NotificationDetails/>}/>
        <Route path="organizer/messageAdmin" element={<MessageAdmin/>}/>
        <Route path="organizer/updateToAttendees" element={<UpdateToAttendee/>}/>
      </Routes>
    </Router>
  );
}

export default App;
