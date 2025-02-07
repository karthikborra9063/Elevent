import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import { Card, Row, Col } from "react-bootstrap";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaTag, FaTicketAlt, FaKey } from "react-icons/fa";
import axios from "axios";

const generateRandomAlphanumeric = (length) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join("");
};

const generateRandomNumber = (length) => {
    return Array.from({ length }, () => Math.floor(Math.random() * 10)).join("");
};

const storeTicket = async (ticketData) => {
    try {
        await axios.post("http://localhost:5000/api/tickets", ticketData);
        console.log("Ticket stored successfully");
    } catch (error) {
        console.error("Error storing ticket:", error);
    }
};

const Ticket = () => {
    const location = useLocation();
    const event = location.state?.event;
    const secretCode = generateRandomAlphanumeric(8);
    const bookingId = generateRandomNumber(15);
    
    useEffect(() => {
        const ticketData = {
            eventId: event.id,
            bookingId,
            secretCode,
            qrCodeValue: ${event.id}_${secretCode},
            attendeeId: "attendee_id_placeholder", // Replace with actual attendee ID
        };
        storeTicket(ticketData);
    }, [event]);

    return (
        <div style={{ 
            maxWidth: "600px", 
            margin: "20px auto", 
            backgroundColor: "#F2F9FF", 
            color: "#333", 
            padding: "20px", 
            borderRadius: "12px", 
            boxShadow: "0 6px 15px rgba(0,0,0,0.1)", 
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}>
            <Card.Img
                variant="top"
                src={event.banner}
                alt={event.eventname}
                style={{ 
                    width: "100%", 
                    maxHeight: "220px", 
                    objectFit: "cover", 
                    borderRadius: "12px 12px 0 0", 
                    filter: "brightness(0.8)"
                }}
            />

            <Row className="g-3 p-3 w-100">
                <Col md={7} className="d-flex flex-column justify-content-center">
                    <h3 className="mb-3" style={{ fontWeight: "bold", textAlign: "left" }}>{event.eventname}</h3>
                    <p style={{ textAlign: "left" }}><FaTag /> <strong>Category:</strong> {event.category}</p>
                    <p style={{ textAlign: "left" }}><FaMapMarkerAlt /> <strong>Venue:</strong> {event.venue}</p>
                    <p style={{ textAlign: "left" }}><FaCalendarAlt /> <strong>Date:</strong> {event.startDate}</p>
                    <p style={{ textAlign: "left" }}> <FaClock /> <strong>Time:</strong> 10:00 AM </p>
                </Col>
                <Col md={5} className="text-center d-flex flex-column align-items-center justify-content-center">
                    <QRCodeCanvas value={${event.id}_${secretCode}} size={128} bgColor="#fff" fgColor="#333" />
                    <p className="mt-2"><strong>Scan QR Code</strong></p>
                </Col>
            </Row>

            <div className="d-flex justify-content-between align-items-center mt-4 px-3 py-2 w-100" 
                style={{ 
                    borderTop: "2px dashed #ddd", 
                    paddingTop: "15px", 
                    backgroundColor: "#f9f9f9", 
                    borderRadius: "0 0 12px 12px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}>
                <div>
                    <p className="text-muted mb-1" style={{ fontSize: "14px", textAlign: "left" }}>
                        <FaTicketAlt /> <strong style={{ fontWeight: "bold",color:"black" }}>Booking ID:</strong> <span style={{ fontSize: "18px", fontWeight: "bold" }}>{bookingId}</span>
                    </p>
                    <p className="text-muted mb-1" style={{ fontSize: "14px", textAlign: "left" }}>
                        <FaKey /> <strong style={{ fontWeight: "bold",color:"black" }}>Secret Code:</strong> <span style={{ fontSize: "18px", fontWeight: "bold" }}>{secretCode}</span>
                    </p>
                </div>
                <div>
                    <img
                        src="/images/logo.png"
                        alt="Elevent Logo"
                        style={{ width: "80px"}}
                    />
                </div>
            </div>
        </div>
    );
};

export default Ticket;