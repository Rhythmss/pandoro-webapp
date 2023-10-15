import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";
import { NavDropdown } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { ToggleButton } from "react-bootstrap";
import { ToggleButtonGroup } from "react-bootstrap";



const Projects = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <Container>
            <Button variant="dark" className="position-fixed speed-dial" size="lg" onClick={() => { setShowModal(true) }}><i class="bi bi-plus-lg"></i></Button>
            <Row className="mt-2 mt-md-5">
                <Col className="p-2" lg={12}>
                    <h1>Frequent Projects</h1>
                </Col>
                <Col className="p-2" lg={12}>
                    <InputGroup size="lg">
                        <Form.Control
                            placeholder="Search bar"
                            aria-label="Search bar"
                            aria-describedby="basic-addon2"
                        />
                        <InputGroup.Text id="basic-addon2"><i class="bi bi-search"></i></InputGroup.Text>
                    </InputGroup>
                </Col>
            </Row>
            <Row className="mt-2 mt-md-3" xs={1} lg={4}>
                <Col className="p-2">
                    <Card className="border border-0 h-100">
                        <Card.Body>
                            <Card.Title className="d-flex justify-content-between">
                                <div className="w-75">Project's name</div>
                                <div>
                                    <NavDropdown menuVariant="dark" title={<i class="bi bi-three-dots-vertical text-left"></i>}>
                                        <NavDropdown.Item href="#Modify/3.1" onClick={() => { setShowModal(true) }}>Modify</NavDropdown.Item>
                                        <NavDropdown.Item href="#Delete/3.2">Delete</NavDropdown.Item>
                                    </NavDropdown>
                                </div>
                            </Card.Title>
                            <Card.Text>
                                description sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
                                <a href="/Project" class="stretched-link projectLink">Go somewhere</a>
                            </Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item>V 1.2.3 <i class="bi bi-person-fill"></i></ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
                <Col className="p-2">
                    <Card className="border border-0 h-100">
                        <Card.Body>
                            <Card.Title className="d-flex justify-content-between">
                                <div className="w-75">Project's name</div>
                                <div>
                                    <NavDropdown menuVariant="dark" title={<i class="bi bi-three-dots-vertical text-left"></i>}>
                                        <NavDropdown.Item href="#Modify/3.1" onClick={() => { setShowModal(true) }}>Modify</NavDropdown.Item>
                                        <NavDropdown.Item href="#Delete/3.2">Delete</NavDropdown.Item>
                                    </NavDropdown>
                                </div>
                            </Card.Title>
                            <Card.Text>
                                description
                            </Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item>V 1.2.3 <i class="bi bi-person-fill"></i></ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-2 mt-md-5">
                <Col className="p-2" lg={12}>
                    <h1>Current Projects</h1>
                </Col>
                <Col className="p-2" lg={12}>
                    <InputGroup size="lg">
                        <Form.Control
                            placeholder="Search bar"
                            aria-label="Search bar"
                            aria-describedby="basic-addon2"
                        />
                        <InputGroup.Text id="basic-addon2"><i class="bi bi-search"></i></InputGroup.Text>
                    </InputGroup>
                </Col>
            </Row>
            <Row className="mt-2 mt-md-3" xs={1} lg={4}>
                <Col className="p-2">
                    <Card className="border border-0 h-100">
                        <Card.Body>
                            <Card.Title className="d-flex justify-content-between">
                                <div className="w-75">Project's name</div>
                                <div>
                                    <NavDropdown menuVariant="dark" title={<i class="bi bi-three-dots-vertical text-left"></i>}>
                                        <NavDropdown.Item href="#Modify/3.1">Modify</NavDropdown.Item>
                                        <NavDropdown.Item href="#Delete/3.2">Delete</NavDropdown.Item>
                                    </NavDropdown>
                                </div>
                            </Card.Title>
                            <Card.Text>
                                description
                            </Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item>V 1.2.3 <i class="bi bi-person-fill"></i></ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            <Modal centered show={showModal} fullscreen={false} onHide={() => setShowModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Create Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Settings</h4>
                    <Form.Floating className="mb-3">
                        <Form.Control
                            id="floatingInputCustom"
                            type="text"
                            placeholder="Name"
                        />
                        <label htmlFor="floatingInputCustom">Name</label>
                    </Form.Floating>
                    <Form.Floating className="mb-3">
                        <Form.Control
                            id="floatingInputCustom"
                            type="text"
                            placeholder="Description"
                        />
                        <label htmlFor="floatingInputCustom">Description</label>
                    </Form.Floating>
                    <Form.Floating className="mb-3">
                        <Form.Control
                            id="floatingInputCustom"
                            type="text"
                            placeholder="Short description"
                        />
                        <label htmlFor="floatingInputCustom">Short description</label>
                    </Form.Floating>
                    <Form.Floating className="mb-3">
                        <Form.Control
                            id="floatingInputCustom"
                            type="text"
                            placeholder="Version"
                        />
                        <label htmlFor="floatingInputCustom">Version</label>
                    </Form.Floating>
                    <h4>Select Group</h4>
                    <ToggleButtonGroup type="checkbox" className="mb-2">
                        <ToggleButton id="tbg-check-1" value={1} className="btn-dark">
                            Unito
                        </ToggleButton>
                        <ToggleButton id="tbg-check-2" value={2} className="btn-dark">
                            Tecknobit
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" className="modalBtn" onClick={() => { setShowModal(false) }}>Save changes</Button>
                </Modal.Footer>
            </Modal>
        </Container >
    );
}

export default Projects;