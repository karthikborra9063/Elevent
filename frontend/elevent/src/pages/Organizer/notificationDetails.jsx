import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { AiOutlineMail, AiOutlineArrowLeft } from 'react-icons/ai';
import { MdEventNote } from 'react-icons/md';
import { FaUserCircle } from 'react-icons/fa';
import {useNavigate} from 'react-router-dom';

const notificationDetails = () => {
  // Default notification object for demonstration
  const navigate = useNavigate();
  const notification =  {
    id: 1,
    from: "John Doe",
    fromType: "Attendee",
    subject: "Event Inquiry",
    message: "Can you provide more details about the event?",
    profileImage: "/images/sampleProfile.webp", // Placeholder for profile image
    time: "2 hours ago",
  };
  const handleBackNotifications = () => {
    navigate('/organizer/notifications');
  };
  
  return (
    <div style={{ backgroundColor: '#121212', color: '#E0E0E0', minHeight: '100vh', padding: '40px' }}>
      <Container className="py-4" style={{ maxWidth: '800px', backgroundColor: '#1F1F1F', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.5)' }}>
      <Button
        onClick={handleBackNotifications}
        variant="secondary"
        className="mb-4"
        style={{ backgroundColor: '#BB86FC', border: 'none' }}
      >
        <AiOutlineArrowLeft className="me-2" size={20} /> Back to Notifications
      </Button>

        <Card className="shadow-sm border-0 rounded-3" style={{ backgroundColor: '#2A2A2A', overflow: 'hidden' }}>
          <Card.Body>
            <Row className="align-items-center mb-4">
              <Col xs="auto">
                {notification.profileImage ? (
                  <img
                    src={notification.profileImage}
                    alt="Profile"
                    width={80}
                    height={80}
                    className="rounded-circle border border-secondary"
                  />
                ) : (
                  <FaUserCircle size={80} className="text-secondary" />
                )}
              </Col>
              <Col>
                <h4 style={{ color: '#BB86FC' }}>{notification.subject}</h4>
                <p className="mb-1" style={{ color: '#A0A0A0' }}>From: {notification.from}</p>
                <p className="mb-0" style={{ color: '#A0A0A0' }}>Role: {notification.fromType}</p>
                <small style={{ color: '#A0A0A0' }}>{notification.time}</small>
              </Col>
            </Row>

            <hr style={{ borderColor: '#333' }} />

            <Card.Text style={{ fontSize: '1rem', color: '#E0E0E0' }}>
              {notification.message}
            </Card.Text>

            <div className="mt-4">
              {notification.fromType === "Attendee" && (
                <AiOutlineMail size={30} className="text-primary me-3" title="Message from Attendee" />
              )}
              {notification.fromType === "Admin" && (
                <MdEventNote size={30} className="text-warning me-3" title="Admin Note" />
              )}
              {notification.fromType === "Elevent" && (
                <AiOutlineMail size={30} className="text-info me-3" title="Event Notification" />
              )}
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default notificationDetails;
