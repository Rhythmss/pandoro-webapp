import React from "react";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Card } from "react-bootstrap";

const Group = () => {
    const [showMembers, setShowMembers] = useState(true);

    return (
        <Container>
            <Row className='mt-2 mt-md-5'>
                <Col className="p-2"><h1>Tecknobit</h1></Col>
            </Row>
            <Row>
                <Col className="p-2">
                    <Card className="border-0">
                        <Card.Body>
                            <Card.Text>
                                Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo tipografo prese una cassetta di caratteri e li assemblò per preparare un testo campione. È sopravvissuto non solo a più di cinque secoli, ma anche al passaggio alla videoimpaginazione, pervenendoci sostanzialmente inalterato. Fu reso popolare, negli anni ’60, con la diffusione dei fogli di caratteri trasferibili “Letraset”, che contenevano passaggi del Lorem Ipsum, e più recentemente da software di impaginazione come Aldus PageMaker, che includeva versioni del Lorem Ipsum.
                            </Card.Text>
                            <Card.Footer className="d-flex bd-highlight">
                                <span className="ms-auto p-2 bd-highlight">Gabriele Marengo</span>
                            </Card.Footer>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col className="p-2 d-flex justify-content-between">
                    <h1>Members</h1>
                    <h1><i className={showMembers ? "bi bi-eye-slash-fill" : "bi bi-eye-fill"} onClick={() => { setShowMembers(!showMembers) }}></i></h1>
                </Col>
            </Row>
            <Row className={showMembers ? null : "visually-hidden"}>
                <Col className="p-2" xs={12} md={6} lg={6}>
                    <Card className="border-0 h-100">
                        <Card.Body>
                            <Card.Text className="d-flex justify-content-between">
                                <img className="rounded" src="https://mdbootstrap.com/img/Photos/Avatars/man2.jpg" alt="Avatar" style={{ width: 45, height: 45 }} />
                                <span className="fs-5 align-self-center">Manuel Maurizio</span>
                                <span className="fs-5 align-self-center text-danger">Admin</span>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="p-2" xs={12} md={6} lg={6}>
                    <Card className="border-0 h-100">
                        <Card.Body>
                            <Card.Text className="d-flex justify-content-between">
                                <img className="rounded" src="https://mdbootstrap.com/img/Photos/Avatars/man2.jpg" alt="Avatar" style={{ width: 45, height: 45 }} />
                                <span className="fs-5 align-self-center">Manuel Maurizio</span>
                                <span className="fs-5 align-self-center text-success">Maintainer</span>
                                <span className="fs-4 bi bi-person-dash-fill align-self-center"></span>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Group;