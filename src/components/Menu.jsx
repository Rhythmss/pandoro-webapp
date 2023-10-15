import React, { useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useState } from "react";
import { useLocation } from "react-router-dom";

const Menu = () => {
    const location = useLocation();
    const [url, setUrl] = useState(null);

    useEffect(() => {
        setUrl(location.pathname);
    }, [location])

    return (
        <Navbar sticky="top" collapseOnSelect expand="lg" bg="dark" data-bs-theme="dark" className="bg-body-tertiary text-center">
            <Container>
                <Navbar.Brand href="#home">Pandoro</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/" className={url === "/" ? "active" : null}>Projects</Nav.Link>
                        <Nav.Link href="/notes" className={url === "/notes" ? "active" : null}>Notes</Nav.Link>
                        <Nav.Link href="/overview" className={url === "/overview" ? "active" : null}>Overview</Nav.Link>
                    </Nav>
                    <Nav>
                        <NavDropdown title={<div className="d-inline-flex position-relative">
                            <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
                                <span className="visually-hidden">New alerts</span>
                            </span>
                            <img className="rounded" src="https://mdbootstrap.com/img/Photos/Avatars/man2.jpg" alt="Avatar" style={{ width: 45, height: 45 }} />
                        </div>} id="profileDropDown">
                            <NavDropdown.Item href="/profile" className="text-lg-start text-center">Profile</NavDropdown.Item>
                            <NavDropdown.Item href="#action4" className="text-lg-start text-center">
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container >
        </Navbar >
    );
}

export default Menu;