import React from "react";
import { Button, Card, Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { FloatingLabel } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";

const Profile = () => {
    return (
        <Container>
            <Button variant="dark" className="position-fixed speed-dial" size="lg" /* onClick={() => { setShowModal(true) }} */><i class="bi bi-plus-lg"></i></Button>
            <Row className='mt-2 mt-md-5'>
                <Col><h1>Profile</h1></Col>
            </Row>
            <Row className='mt-2 mt-md-3'>
                <Col xs={12} md={6} className="p-2">
                    <Card className="border-0">
                        <Card.Body>
                            <Card.Title className="d-flex justify-content-center mt-3">
                                <div class="d-inline-flex position-relative">
                                    <span class="position-absolute top-0 start-100 translate-middle">
                                        <Button className="rounded" variant="light" size="md"><i class="bi bi-pencil-square"></i></Button>
                                    </span>
                                    <img class="rounded-4 shadow-4" src="https://mdbootstrap.com/img/Photos/Avatars/man2.jpg" alt="Avatar" style={{ width: 100 }} />
                                </div>
                            </Card.Title>
                            <Card.Text className="mt-3">
                                <div>
                                    <FloatingLabel label="Name">
                                        <Form.Control type="text" placeholder="Name" value={"Gabriele"} disabled />
                                    </FloatingLabel>
                                    <FloatingLabel label="Surname">
                                        <Form.Control type="text" placeholder="Surname" value={"Marengo"} disabled />
                                    </FloatingLabel>
                                    <FloatingLabel label="Email">
                                        <Form.Control type="email" placeholder="Email" value={"gabrielewinfo@gmail.com"} disabled />
                                    </FloatingLabel>
                                    <FloatingLabel label="Password">
                                        <Form.Control type="password" placeholder="Password" value={"prova"} disabled />
                                    </FloatingLabel>
                                </div>
                                <Button variant="dark" className="w-100 mt-3" size="lg">Edit profile</Button>
                                <Button variant="danger" className="w-100 mt-2" size="lg">Delete</Button>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={6} className="p-2">
                    <Card className="border-0 h-100">
                        <Card.Body>
                            <ListGroup defaultActiveKey="#link2" className="overflow-scroll boxNotification">
                                <ListGroup.Item href="#link1" className="border-0 border-bottom d-flex justify-content-between" disabled>
                                    <div className="w-75">
                                        <h6>Prova</h6>
                                        <span>Prova</span>
                                    </div>
                                    <div>
                                        <Button variant="danger" className="btn-sm"><i class="bi bi-trash-fill"></i></Button>
                                    </div>
                                </ListGroup.Item>
                                <ListGroup.Item href="#link1" className="border-0 border-bottom" disabled>
                                    <h6>Prova</h6>
                                    <span>Prova</span>
                                </ListGroup.Item>
                                <ListGroup.Item href="#link1" className="border-0 border-bottom" disabled>
                                    <h6>Prova</h6>
                                    <span>Prova</span>
                                </ListGroup.Item>
                                <ListGroup.Item href="#link1" className="border-0 border-bottom" disabled>
                                    <h6>Prova</h6>
                                    <span>Prova</span>
                                </ListGroup.Item>
                                <ListGroup.Item href="#link1" className="border-0 border-bottom" disabled>
                                    <h6>Prova</h6>
                                    <span>Prova</span>
                                </ListGroup.Item>
                                <ListGroup.Item href="#link1" className="border-0 border-bottom" disabled>
                                    <h6>Prova</h6>
                                    <span>Prova</span>
                                </ListGroup.Item>
                                <ListGroup.Item href="#link1" className="border-0 border-bottom" disabled>
                                    <h6>Prova</h6>
                                    <span>Prova</span>
                                </ListGroup.Item>
                                <ListGroup.Item href="#link1" className="border-0 border-bottom" disabled>
                                    <h6>Prova</h6>
                                    <span>Prova</span>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className='mt-2 mt-md-5'>
                <Col><h1>Groups</h1></Col>
            </Row>
            <Row className='mt-2 mt-md-3'>
                <Col className="p-2" xs={12} md={4} lg={3}>
                    <Card className="border-top-0 border-start-0 border-bottom-0 border-dark border-5">
                        <Card.Body>
                            <Card.Text className="d-flex justify-content-between">
                                <span className="fw-bold fs-5 w-50">Tecknobit</span>
                                <span className="fs-5 text-danger">Admin</span>
                            </Card.Text>
                            <a href="/Group" class="stretched-link groupLink">Go somewhere</a>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="p-2" xs={12} md={4} lg={3}>
                    <Card className="border-top-0 border-start-0 border-bottom-0 border-dark border-5 h-100">
                        <Card.Body>
                            <Card.Text className="d-flex justify-content-between">
                                <span className="fw-bold fs-5 w-50">Tecknobit</span>
                                <span className="fs-5">Admin</span>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="p-2" xs={12} md={4} lg={3}>
                    <Card className="border-top-0 border-start-0 border-bottom-0 border-dark border-5 h-100">
                        <Card.Body>
                            <Card.Text className="d-flex justify-content-between">
                                <span className="fw-bold fs-5 w-50">Tecknobit</span>
                                <span className="fs-5">Admin</span>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="p-2" xs={12} md={4} lg={3}>
                    <Card className="border-top-0 border-start-0 border-bottom-0 border-dark border-5 h-100">
                        <Card.Body>
                            <Card.Text className="d-flex justify-content-between">
                                <span className="fw-bold fs-5 w-50">Tecknobit</span>
                                <span className="fs-5">Admin</span>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="p-2" xs={12} md={4} lg={3}>
                    <Card className="border-top-0 border-start-0 border-bottom-0 border-dark border-5 h-100">
                        <Card.Body>
                            <Card.Text className="d-flex justify-content-between">
                                <span className="fw-bold fs-5 w-50">Tecknobit</span>
                                <span className="fs-5">Admin</span>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="p-2" xs={12} md={4} lg={3}>
                    <Card className="border-top-0 border-start-0 border-bottom-0 border-dark border-5 h-100">
                        <Card.Body>
                            <Card.Text className="d-flex justify-content-between">
                                <span className="fw-bold fs-5 w-50">Tecknobit</span>
                                <span className="fs-5 ">Admin</span>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="p-2" xs={12} md={4} lg={3}>
                    <Card className="border-top-0 border-start-0 border-bottom-0 border-dark border-5 h-100">
                        <Card.Body>
                            <Card.Text className="d-flex justify-content-between">
                                <span className="fw-bold fs-5 w-50">safdddddddddddddddddddddddddd</span>
                                <span className="fs-5">Admin</span>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>

    );
}

export default Profile;