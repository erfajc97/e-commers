import React, { useState } from 'react';
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import "../styles/nav-bar.css";
import Cart from './Cart';


const AppNavBar = () => {

    const navigate =useNavigate();
  

    const logout = () =>{
      localStorage.setItem("token", "");
      navigate("/login/")
    }

      const [show, setShow] = useState(false);

      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);

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
                <Nav.Link
                  onClick={handleShow}
                  className="title_links_nav"
                  as={Link}>
                  Cart
                </Nav.Link>
                
                  <Nav.Link className="title_links_nav" onClick={logout}>
                    Logout
                  </Nav.Link>
              
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Cart show={show} handleClose={handleClose} />
      </div>
    );
};

export default AppNavBar;