import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Image, Badge, Container, Row, Col } from 'react-bootstrap';
import { AiOutlineBell, AiOutlineMail } from 'react-icons/ai';
import { MdEventNote } from 'react-icons/md';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

const NotificationList = () => {
  // Sample data for notifications
  const navigate = useNavigate();
  const notifications = [
    {
      id: 1,
      from: "John Doe",
      fromType: "Attendee",
      subject: "Event Inquiry",
      message: "Can you provide more details about the event?",
      profileImage: "/images/sampleProfile.webp", // Placeholder for the profile image
      time: "2 hours ago",
    },
    {
      id: 2,
      from: "Admin",
      fromType: "Admin",
      subject: "Policy Update",
      message: "Please review the updated terms and conditions.",
      profileImage: "/images/sampleProfile.webp", 
      time: "1 day ago",
    },
    {
      id: 3,
      from: "Event Team",
      fromType: "Elevent",
      subject: "Event Setup",
      message: "Your event setup is complete.",
      profileImage: "/images/sampleProfile.webp", 
      time: "3 days ago",
    },
  ];

  const [activeNotification, setActiveNotification] = useState(null);

  const handleCardClick = () => {
      navigate(`temp`);
  };

  return (
    <div style={{ backgroundColor: '#121212', color: '#E0E0E0', minHeight: '100vh', padding: '40px' }}>
      <Container className="py-4" style={{ maxWidth: '900px', backgroundColor: '#1F1F1F', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.5)' }}>
        <h2 className="text-center mb-4" style={{ color: '#BB86FC', fontWeight: 'bold' }}>
          <AiOutlineBell className="me-2" size={30} /> Notifications
        </h2>
        <Row>
          {notifications.map((notification) => (
            <Col xs={12} key={notification.id} className="mb-3">
              <Card
                className={`shadow-sm border-0 rounded-3 ${activeNotification === notification.id ? 'border border-primary' : ''}`}
                style={{ backgroundColor: '#2A2A2A', color: '#E0E0E0', overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.2s ease' }}
                onClick={() => handleCardClick()}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                <Card.Body className="d-flex align-items-center">
                  <div style={{ position: 'relative' }}>
                    {notification.profileImage ? (
                      <Image
                        src={notification.profileImage}
                        roundedCircle
                        width={60}
                        height={60}
                        className="me-3 border border-secondary"
                        alt="Profile"
                      />
                    ) : (
                      <FaUserCircle size={60} className="me-3 text-secondary" />
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <Card.Title className="mb-1 d-flex justify-content-between align-items-center">
                      {notification.subject}
                      <Badge style={{ backgroundColor: '#03DAC6', color: '#000', fontSize: '0.85rem' }} pill>
                        {notification.fromType}
                      </Badge>
                    </Card.Title>
                    <Card.Subtitle className="mb-2" style={{ color: '#A0A0A0', fontSize: '0.9rem' }}>
                      From: {notification.from}
                    </Card.Subtitle>
                    <Card.Text style={{ fontSize: '0.95rem', color: '#E0E0E0' }}>
                      {notification.message}
                    </Card.Text>
                    <small style={{ color: '#A0A0A0' }}>{notification.time}</small>
                  </div>
                  <div className="ms-3">
                    {notification.fromType === "Attendee" && <AiOutlineMail size={24} className="text-primary" />}
                    {notification.fromType === "Admin" && <MdEventNote size={24} className="text-warning" />}
                    {notification.fromType === "Elevent" && <AiOutlineBell size={24} className="text-info" />}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default NotificationList;
