import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { FloatingLabel } from "react-bootstrap";

const Notes = () => {
    const [showModal, setShowModal] = useState(false);
    const [showCheck, setShowCheck] = useState(false);

    return (
        <Container>
            <Button variant="dark" className="position-fixed speed-dial" size="lg" onClick={() => { setShowModal(true) }}><i class="bi bi-plus-lg"></i></Button>
            <Row className="mt-2 mt-md-5">
                <Col className="d-flex justify-content-between">
                    <div className="align-self-center">
                        <h1>Notes</h1>
                    </div>
                    <div className="align-self-center">
                        <Button variant="dark" size="lg" onClick={() => { setShowCheck(!showCheck) }}><i class="bi bi-pencil-square"></i></Button>
                    </div>
                </Col>
            </Row>
            <Row xs={1} className="mt-2 mt-md-3">
                <Col className="p-2">
                    <Card className="border border-0">
                        <Card.Body className="d-flex align-items-start">
                            <Card.Text className="d-flex justify-content-between w-100">
                                <div className="d-flex justify-content-start w-75">
                                    <div className={showCheck ? "align-self-center" : "visually-hidden"}>
                                        <Form.Check
                                            inline
                                            name="group1"
                                            type="checkbox"
                                            className="checkbox-xl"
                                        />
                                    </div>
                                    <div className="fs-5 w-75" > Notaddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd</div>
                                </div>
                                <div>
                                    <Button variant="danger" className="btn-sm"><i class="bi bi-trash-fill"></i></Button>
                                </div>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row >
            <Modal centered show={showModal} fullscreen={false} onHide={() => setShowModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Create Notes</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <FloatingLabel controlId="floatingTextarea2" label="Content">
                            <Form.Control
                                as="textarea"
                                placeholder="Leave a comment here"
                                style={{ height: '300px' }}
                            />
                        </FloatingLabel>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" className="modalBtn" onClick={() => { setShowModal(false) }}>Add notes</Button>
                </Modal.Footer>
            </Modal>
        </Container >
    );
}

export default Notes;