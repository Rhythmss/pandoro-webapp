import React, { useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useState } from "react";
import { useLocation } from "react-router-dom";
import paths from "../paths";

const Menu = () => {
    const location = useLocation();
    const imageUrl = localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE_IMAGE_URL);
    const [url, setUrl] = useState(null);

    useEffect(() => {
        setUrl(location.pathname);
    }, [location])

    return (
        <Navbar sticky="top" collapseOnSelect expand="lg" bg="dark" data-bs-theme="dark" className="bg-body-tertiary text-center">
            <Container>
                <Navbar.Brand href={paths.projects}>Pandoro</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href={paths.projects} className={url === "/" ? "active" : null}>Projects</Nav.Link>
                        <Nav.Link href={paths.notes} className={url === paths.notes ? "active" : null}>Notes</Nav.Link>
                        <Nav.Link href={paths.overview} className={url === paths.overview ? "active" : null}>Overview</Nav.Link>
                    </Nav>
                    <Nav>
                        <NavDropdown title={
                            <div className="d-flex justify-content-center">
                                <div className="avatar-box d-flex position-relative">
                                    <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
                                        <span className="visually-hidden">New alerts</span>
                                    </span>
                                    <img className="rounded avatar" src={imageUrl} alt="Avatar" style={{ width: 45, height: 45 }} />
                                </div>
                            </div>
                        } id="profileDropDown">
                            <NavDropdown.Item href={paths.profile} className="text-lg-start text-center">Profile</NavDropdown.Item>
                            <NavDropdown.Item href={paths.logout} className="text-lg-start text-center">
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