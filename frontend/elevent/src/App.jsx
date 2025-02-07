import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminNavbar from './Navbar/adminNavbar.jsx';
import AdminPathRouter from './pathRoutes/adminPathRoute.jsx';

function App() {
  return (
    <Router>
      <AdminNavbar />
      <Routes>
        <Route path="admin/*" element={<AdminPathRouter />} />
      </Routes>
    </Router>
  );
}

export default App;
