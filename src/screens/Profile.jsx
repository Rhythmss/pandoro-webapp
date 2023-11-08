import React from "react";
import { useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { FloatingLabel } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { Toast } from "react-bootstrap";
import axios from "axios";
import paths from "../paths";
import requests from "../requests";

const Profile = () => {
    const token = localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE_TOKEN);
    const [imageUrl, setImageUrl] = useState(localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE_IMAGE_URL));
    const [email, setEmail] = useState(localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE_EMAIL));
    const name = localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE_NAME);
    const surname = localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE_SURNAME);
    const [editModal, setEditModal] = useState({ show: false, editValue: null, target: null, errorMessage: null });
    const [toast, setToast] = useState({ message: null, show: false });

    const handleChangeSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setEditModal({ ...editModal, errorMessage: null });
        if (checkError()) {
            if (editModal.target === "Email")
                var url = requests.users.changeEmail;
            else
                var url = requests.users.changePassword;
            axios.patch(url, editModal.editValue, { headers: { "token": token, 'Content-Type': 'text/plain' } }).then(res => {
                console.log(res)
                if (!res.data.success) {
                    setEditModal({ ...editModal, errorMessage: res.error });
                } else {
                    if (editModal.target === "Email") {

                        localStorage.setItem(process.env.REACT_APP_LOCALSTORAGE_EMAIL, editModal.editValue)
                        setEmail(editModal.editValue)
                        setToast({ message: "The mail has been changing successfull", show: true })
                    } else {
                        setToast({ message: "The password has been changing successfull", show: true })
                    }
                    setEditModal({ show: false, editValue: null, target: null, errorMessage: null });
                }
            }).catch(() => {
                setEditModal({ ...editModal, errorMessage: process.env.REACT_APP_WRONG_PROCEDURE });
            })
        }
    }

    const checkError = () => {
        if (!editModal.editValue || editModal.editValue === "") {
            setEditModal({ ...editModal, errorMessage: editModal.target + " field " + process.env.REACT_APP_FIELD_EMPTY });
            return false;
        }
        if (editModal.target === "Email" && !(editModal.editValue).includes("@")) {
            setEditModal({ ...editModal, errorMessage: "Wrong email field" });
            return false;
        }
        return true;
    }

    return (
        <Container>
            <Button variant="dark" className="position-fixed speed-dial" size="lg" /* onClick={() => { setShowModal(true) }} */><i className="bi bi-plus-lg"></i></Button>
            <Row className='mt-2 mt-md-5'>
                <Col><h1>Profile</h1></Col>
            </Row>
            <Row className='mt-2 mt-md-3'>
                <Col xs={12} md={6} className="p-2">
                    <Card className="border-0">
                        <Card.Body>
                            <Card.Title className="d-flex justify-content-center mt-3">
                                <div className="d-inline-flex position-relative">
                                    <span className="position-absolute top-0 start-100 translate-middle">
                                        <Button className="rounded" variant="light" size="md"><i className="bi bi-pencil-square"></i></Button>
                                    </span>
                                    <img className="rounded-4 shadow-4 avatar" src={imageUrl} alt="Avatar" style={{ width: 100, height: 100 }} />
                                </div>
                            </Card.Title>
                            <div className="mt-3">
                                <div>
                                    <FloatingLabel label="Name">
                                        <Form.Control type="text" placeholder="Name" value={name} disabled />
                                    </FloatingLabel>
                                    <FloatingLabel label="Surname">
                                        <Form.Control type="text" placeholder="Surname" value={surname} disabled />
                                    </FloatingLabel>
                                    <FloatingLabel label="Email">
                                        <Form.Control type="email" placeholder="Email" value={email} disabled />
                                    </FloatingLabel>
                                </div>
                                <Button variant="dark" className="w-100 mt-2" size="lg" onClick={() => { setEditModal({ ...editModal, show: true, target: "Email" }) }}>Change email</Button>
                                <Button variant="dark" className="w-100 mt-2" size="lg" onClick={() => { setEditModal({ ...editModal, show: true, target: "Password" }) }}>Change password</Button>
                                <Button variant="danger" className="w-100 mt-2" size="lg">Delete</Button>
                            </div>
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
                                        <Button variant="danger" className="btn-sm"><i className="bi bi-trash-fill"></i></Button>
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
                            <div className="d-flex justify-content-between">
                                <span className="fw-bold fs-5 w-50">Tecknobit</span>
                                <span className="fs-5 text-danger">Admin</span>
                            </div>
                            <a href="/Group" className="stretched-link groupLink">Go somewhere</a>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="p-2" xs={12} md={4} lg={3}>
                    <Card className="border-top-0 border-start-0 border-bottom-0 border-dark border-5 h-100">
                        <Card.Body>
                            <div className="d-flex justify-content-between">
                                <span className="fw-bold fs-5 w-50">Tecknobit</span>
                                <span className="fs-5">Admin</span>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="p-2" xs={12} md={4} lg={3}>
                    <Card className="border-top-0 border-start-0 border-bottom-0 border-dark border-5 h-100">
                        <Card.Body>
                            <div className="d-flex justify-content-between">
                                <span className="fw-bold fs-5 w-50">Tecknobit</span>
                                <span className="fs-5">Admin</span>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="p-2" xs={12} md={4} lg={3}>
                    <Card className="border-top-0 border-start-0 border-bottom-0 border-dark border-5 h-100">
                        <Card.Body>
                            <div className="d-flex justify-content-between">
                                <span className="fw-bold fs-5 w-50">Tecknobit</span>
                                <span className="fs-5">Admin</span>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="p-2" xs={12} md={4} lg={3}>
                    <Card className="border-top-0 border-start-0 border-bottom-0 border-dark border-5 h-100">
                        <Card.Body>
                            <div className="d-flex justify-content-between">
                                <span className="fw-bold fs-5 w-50">Tecknobit</span>
                                <span className="fs-5">Admin</span>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="p-2" xs={12} md={4} lg={3}>
                    <Card className="border-top-0 border-start-0 border-bottom-0 border-dark border-5 h-100">
                        <Card.Body>
                            <div className="d-flex justify-content-between">
                                <span className="fw-bold fs-5 w-50">Tecknobit</span>
                                <span className="fs-5 ">Admin</span>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="p-2" xs={12} md={4} lg={3}>
                    <Card className="border-top-0 border-start-0 border-bottom-0 border-dark border-5 h-100">
                        <Card.Body>
                            <div className="d-flex justify-content-between">
                                <span className="fw-bold fs-5 w-50">safdddddddddddddddddddddddddd</span>
                                <span className="fs-5">Admin</span>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Modal centered show={editModal.show} fullscreen={false} onHide={() => {
                setEditModal({ show: false, editValue: null, target: null, errorMessage: null });
            }} size="lg">
                <Form noValidate onSubmit={handleChangeSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Change {editModal.target}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Floating className="mb-3">
                            <Form.Control
                                id="floatingInputCustom"
                                type={editModal.target ? editModal.target.toLowerCase() : null
                                }
                                placeholder={editModal.target}
                                value={editModal.editValue}
                                onChange={(e) => { setEditModal({ ...editModal, editValue: e.target.value }) }}
                                isInvalid={!!editModal.errorMessage}
                            />
                            <Form.Control.Feedback type="invalid">{editModal.errorMessage}</Form.Control.Feedback>
                            <label htmlFor="floatingInputCustom">{editModal.target}</label>
                        </Form.Floating>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="dark" className="modalBtn" type="submit">Save changes</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            <Toast className="notificationToast position-fixed " show={toast.show} onClose={() => setToast({ message: null, show: false })} autohide delay={10000}>
                <Toast.Header>
                    <img
                        className="rounded me-2"
                        alt=""
                    />
                    <strong className="me-auto">Pandoro</strong>
                    <small>Now</small>
                    <></>
                </Toast.Header>
                <Toast.Body>{toast.message}</Toast.Body>
            </Toast>
        </Container >

    );
}

export default Profile;