import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "../styles/nav-bar.css";


const AppNavBar = () => {
    return (
      <div className="container_navBar">
        <Navbar bg="light" expand="lg" fixed="top">
          <Container>
            <Navbar.Brand className="brand" as={Link} to="/">
              E-Commers
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link className="title_links_nav" as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link className="title_links_nav" as={Link} to="/login/">
                  Login
                </Nav.Link>
                <Nav.Link
                  className="title_links_nav"
                  as={Link}
                  to="/purchases/">
                  Purchases
                </Nav.Link>
                <Nav.Link className="title_links_nav" as={Link} to="/">
                  Cart
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
};

export default AppNavBar;