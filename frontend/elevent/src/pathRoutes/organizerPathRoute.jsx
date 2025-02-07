import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AttendeeSignupForm from '../pages/Auth/attendeeSignup.jsx';
import AttendeeLoginForm from '../pages/Auth/attendeeLogin.jsx';
import OrganizerSignupForm from '../pages/Auth/organizerSignup.jsx';
import OrganizerLoginForm from '../pages/Auth/organizerLogin.jsx';
import AdminSignupForm from '../pages/Auth/adminSignup.jsx';
import AdminLoginForm from '../pages/Auth/adminLogin.jsx'
import OrganizerProfile from '../pages/Profile/organizerProfile.jsx';
import CreateEventForm from '../pages/Organizer/createEvent.jsx';
import EventList from '../pages/Organizer/eventList.jsx';
import EventDetails from '../pages/Organizer/eventDetails.jsx';
import NotificationList from '../pages/Organizer/notificationList.jsx';
import NotificationDetails from '../pages/Organizer/notificationDetails.jsx'
import MessageAdmin from '../pages/Organizer/messageAdmin.jsx';
import UpdateToAttendee from '../pages/Organizer/updateToAttendee.jsx';

function organizerPathRoute(){
    return (
        <Router>
          <Navbar />
          <Routes>
            <Route path="signup" element={<OrganizerSignupForm/>}/>
            <Route path="login" element={<OrganizerLoginForm/>}/>
            <Route path="profile" element={<OrganizerProfile/>}/>
            <Route path="create-event" element={<CreateEventForm/>}/>
            <Route path="events" element={<EventList/>}/>
            <Route path="events/:eventId" element={<EventDetails/>}/>
            <Route path="notifications" element={<NotificationList/>}/>
            <Route path="notifications/temp" element={<NotificationDetails/>}/>
            <Route path="messageAdmin" element={<MessageAdmin/>}/>
            <Route path="updateToAttendees" element={<UpdateToAttendee/>}/>
          </Routes>
        </Router>
      );
}
export default organizerPathRoute;