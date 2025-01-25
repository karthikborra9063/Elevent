import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FaUser } from 'react-icons/fa'; // Profile icon
import { Link } from "react-router-dom";

function BasicExample() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Elevent</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Login" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/attendee/login">Attendee</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/organizer/login">Organizer</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/admin/login">Admin</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          <Nav className="me-auto">
            <NavDropdown title="Location" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Hydrebad</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Goa</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Amaravati</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link href="/profile">
              <FaUser size={24} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
