// OrganizerProfile.js
import React from "react";
import { Container, Row, Col, Card, Image, Badge } from "react-bootstrap";

const OrganizerProfile = () => {
  // Sample data (replace with actual data when integrated with backend)
  const organizer = {
    username: "JohnDoe",
    email: "johndoe@example.com",
    mobileNumber: "9876543210",
    address: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      postalCode: "10001",
      country: "USA",
    },
    profileImg: "", // Replace with actual URL
    coverImage: "https://via.placeholder.com/800x200", // Replace with actual URL
    experience: [
      { organization: "Tech Corp", duration: { years: 2, months: 6 } },
      { organization: "EventPro", duration: { years: 1, months: 4 } },
    ],
    eventCount: 25,
    acheivments: ["Best Event Planner 2023", "100+ Successful Events"],
    about:
      "Passionate and experienced event organizer specializing in creating unforgettable experiences for clients.",
    rating: 4.8,
  };

  return (
    <div style={{ backgroundColor: "#121212", minHeight: "100vh", color: "#e0e0e0" ,top:"20px"}}>
      {/* Cover Image */}
      <div
        style={{
        backgroundImage: `url('/images/banner.webp')`, // Replace with the correct path
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "250px",
        width: "80%", // Adjust the width to make it smaller
        margin: "0 auto", // Center the cover image horizontally
        position: "relative",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.7)",
        borderRadius: "10px", // Optional: Add rounded corners for a professional touch
        top:"20px"
        }}
       >
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        ></div>
      </div>

      <Container>
        <Row className="justify-content-center">
          {/* Profile Image */}
          <Col md={4} className="text-center" style={{ marginTop: "-80px" ,zIndex:100}}>
            <Image
              src={organizer.profileImg || "/images/sampleProfile.webp"}
              roundedCircle
              style={{
                width: "150px",
                height: "150px",
                border: "5px solid #121212",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.8)",
              }}
            />
            <h3 className="mt-3" style={{ fontWeight: "bold", color: "#ffffff" }}>
              {organizer.username}
            </h3>
            <Badge bg="info" className="mb-2" style={{ fontSize: "14px" }}>
              Event Organizer
            </Badge>
            <p style={{ color: "#b0b0b0", fontStyle: "italic" }}>{organizer.about}</p>
          </Col>
        </Row>

        <Row>
          <Col md={8} className="mx-auto">
            {/* Contact Info */}
            <Card
              className="mb-4"
              style={{
                backgroundColor: "#1f1f1f",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.6)",
                color: "#e0e0e0",
              }}
            >
              <Card.Body>
                <h4 className="text-info">Contact Information</h4>
                <p>
                  <strong>Email: </strong> {organizer.email}
                </p>
                <p>
                  <strong>Mobile: </strong> {organizer.mobileNumber}
                </p>
                <p>
                  <strong>Address: </strong>{" "}
                  {`${organizer.address.street}, ${organizer.address.city}, ${organizer.address.state}, ${organizer.address.postalCode}, ${organizer.address.country}`}
                </p>
              </Card.Body>
            </Card>

            {/* Experience */}
            <Card
              className="mb-4"
              style={{
                backgroundColor: "#292929",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.7)",
                color: "#e0e0e0",
              }}
            >
              <Card.Body>
                <h4 className="text-info">Experience</h4>
                {organizer.experience.map((exp, index) => (
                  <p key={index}>
                    <strong>{exp.organization}</strong> -{" "}
                    {`${exp.duration.years} years ${exp.duration.months} months`}
                  </p>
                ))}
              </Card.Body>
            </Card>

            {/* Achievements */}
            <Card
              className="mb-4"
              style={{
                backgroundColor: "#1f1f1f",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.6)",
                color: "#e0e0e0",
              }}
            >
              <Card.Body>
                <h4 className="text-info">Achievements</h4>
                <ul>
                  {organizer.acheivments.map((ach, index) => (
                    <li key={index}>{ach}</li>
                  ))}
                </ul>
              </Card.Body>
            </Card>

            {/* Event Statistics */}
            <Card
              className="mb-4"
              style={{
                backgroundColor: "#292929",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.7)",
                color: "#e0e0e0",
              }}
            >
              <Card.Body>
                <h4 className="text-info">Event Statistics</h4>
                <p>
                  <strong>Total Events Organized: </strong>
                  {organizer.eventCount}
                </p>
                <p>
                  <strong>Rating: </strong> {organizer.rating} / 5
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default OrganizerProfile;
