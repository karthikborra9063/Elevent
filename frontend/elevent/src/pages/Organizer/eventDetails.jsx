import React from "react";
import { Container, Row, Col, Card, ListGroup, Badge, Button } from "react-bootstrap";
import { FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaDollarSign, FaMicrophone, FaBuilding, FaConciergeBell } from "react-icons/fa";

const sampleEvent = {
  id: 1,
  eventname: "Tech Conference 2025",
  category: "Technology",
  startDate: "2025-02-15",
  endDate: "2025-02-17",
  venue: "Tech Arena, Silicon Valley",
  address: {
    street: "123 Innovation Blvd",
    city: "Silicon Valley",
    state: "California",
    postalCode: "94025",
    country: "USA",
  },
  banner: "/images/banner.webp",
  status: "approved",
  ticketsRequired: true,
  price: 299.99,
  maxAttendees: 500,
  currentAttendees: 350,
  speakers: ["Elon Musk", "Sundar Pichai", "Satya Nadella"],
  services: ["Free WiFi", "Lunch Provided", "Networking Opportunities"],
  sponsors: ["Google", "Microsoft", "Tesla"],
};

const EventDetails = () => {
  return (
    <div style={{ backgroundColor: "#1e1e1e", color: "#F8FAFC", minHeight: "100vh" }}>
      <Container>
        {/* Banner Section */}
        <Card className="bg-dark text-light border-0 shadow-lg mb-4">
          <Card.Img
            variant="top"
            src={sampleEvent.banner}
            alt={sampleEvent.eventname}
            style={{ maxHeight: "400px", objectFit: "cover", borderBottom: "4px solid #00bcd4" }}
          />
          <Card.ImgOverlay className="d-flex flex-column justify-content-center text-center" style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}>
            <h1 style={{ fontWeight: "bold", fontSize: "2.75rem" }}>{sampleEvent.eventname}</h1>
            <p>
              <Badge bg="primary" className="me-2">{sampleEvent.category}</Badge>
              {sampleEvent.status === "approved" ? (
                <Badge bg="success">Approved</Badge>
              ) : (
                <Badge bg="warning">Pending</Badge>
              )}
            </p>
          </Card.ImgOverlay>
        </Card>

        {/* Event Information */}
        <Row className="gy-4">
          {/* Left Column */}
          <Col md={8}>
            {/* Event Details Card */}
            <Card className="bg-dark text-light border-0 shadow-sm mb-4">
              <Card.Body>
                <h4 className="text-info mb-4">Event Details</h4>
                <ListGroup variant="flush" className="bg-dark">
                  <ListGroup.Item className="bg-dark text-light border-0">
                    <FaCalendarAlt className="me-2 text-primary" />
                    <strong>Dates:</strong> {sampleEvent.startDate} - {sampleEvent.endDate}
                  </ListGroup.Item>
                  <ListGroup.Item className="bg-dark text-light border-0">
                    <FaMapMarkerAlt className="me-2 text-warning" />
                    <strong>Venue:</strong> {sampleEvent.venue}
                  </ListGroup.Item>
                  <ListGroup.Item className="bg-dark text-light border-0">
                    <FaBuilding className="me-2 text-secondary" />
                    <strong>Address:</strong> <br />
                    {`${sampleEvent.address.street}, ${sampleEvent.address.city}, ${sampleEvent.address.state}`} <br />
                    {`${sampleEvent.address.postalCode}, ${sampleEvent.address.country}`}
                  </ListGroup.Item>
                  <ListGroup.Item className="bg-dark text-light border-0">
                    <FaUsers className="me-2 text-info" />
                    <strong>Max Attendees:</strong> {sampleEvent.maxAttendees}
                  </ListGroup.Item>
                  <ListGroup.Item className="bg-dark text-light border-0">
                    <FaUsers className="me-2 text-info" />
                    <strong>Current Attendees:</strong> {sampleEvent.currentAttendees}
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>

            {/* Speaker and Services */}
            <Card className="bg-dark text-light border-0 shadow-sm">
              <Card.Body>
                <h4 className="text-info mb-4">Additional Information</h4>
                <Row>
                  <Col md={6}>
                    <h5 className="text-primary"><FaMicrophone className="me-2" />Speakers</h5>
                    <ul className="ms-3">
                      {sampleEvent.speakers.map((speaker, index) => (
                        <li key={index}>{speaker}</li>
                      ))}
                    </ul>
                  </Col>
                  <Col md={6}>
                    <h5 className="text-primary"><FaConciergeBell className="me-2" />Services</h5>
                    <ul className="ms-3">
                      {sampleEvent.services.map((service, index) => (
                        <li key={index}>{service}</li>
                      ))}
                    </ul>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          {/* Right Column */}
          <Col md={4}>
            {/* Ticket Information */}
            <Card className="bg-dark text-light border-0 shadow-sm mb-4">
              <Card.Body>
                <h4 className="text-info">Ticket Information</h4>
                <ListGroup variant="flush" className="bg-dark">
                  <ListGroup.Item className="bg-dark text-light border-0">
                    <strong>Tickets Required:</strong>{" "}
                    {sampleEvent.ticketsRequired ? (
                      <span className="text-success">Yes</span>
                    ) : (
                      <span className="text-danger">No</span>
                    )}
                  </ListGroup.Item>
                  {sampleEvent.ticketsRequired && (
                    <ListGroup.Item className="bg-dark text-light border-0">
                      <FaDollarSign className="me-2 text-success" />
                      <strong>Price:</strong> ${sampleEvent.price}
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Card.Body>
            </Card>

            {/* Sponsors */}
            <Card className="bg-dark text-light border-0 shadow-sm">
              <Card.Body>
                <h4 className="text-info"><FaBuilding className="me-2" />Sponsors</h4>
                <ul className="ms-3">
                  {sampleEvent.sponsors.map((sponsor, index) => (
                    <li key={index}>{sponsor}</li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default EventDetails;
