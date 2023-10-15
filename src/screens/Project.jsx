import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { NavDropdown } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
        },
    },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Development days',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            backgroundColor: '#61892f',
        }
    ],
};

const Project = () => {
    const [showProjectInfo, setShowProjectInfo] = useState(true);
    const [showUpdates, setShowUpdates] = useState(true);
    const [showGroups, setShowGroups] = useState(true);
    const [showStats, setShowStats] = useState(true);

    return (
        <Container>
            <Row className="mt-2 mt-md-5">
                <Col className="p-2 d-flex justify-content-between">
                    <h1 className="me-2">Project Name</h1>
                    <h1><i className={showProjectInfo ? "bi bi-eye-slash-fill" : "bi bi-eye-fill"} onClick={() => { setShowProjectInfo(!showProjectInfo) }}></i></h1>
                </Col>
            </Row>
            <Row className={showProjectInfo ? null : "visually-hidden"}>
                <Col className="p-2">
                    <Card className="border-0">
                        <Card.Body>
                            <Card.Text>
                                Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo tipografo prese una cassetta di caratteri e li assemblò per preparare un testo campione. È sopravvissuto non solo a più di cinque secoli, ma anche al passaggio alla videoimpaginazione, pervenendoci sostanzialmente inalterato. Fu reso popolare, negli anni ’60, con la diffusione dei fogli di caratteri trasferibili “Letraset”, che contenevano passaggi del Lorem Ipsum, e più recentemente da software di impaginazione come Aldus PageMaker, che includeva versioni del Lorem Ipsum.
                            </Card.Text>
                            <Card.Footer className="d-flex bd-highlight">
                                <h2><i class="bi bi-github bd-highlight"></i></h2>
                                <span className="p-2 bd-highlight">v. 1.0.0</span>
                                <span class="ms-auto p-2 bd-highlight">Gabriele Marengo</span>
                            </Card.Footer>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col className="p-2 d-flex justify-content-between" data-bs-toggle="tooltip" title=" Updates number: 6&#013;Last update: 6">
                    <h1 className="me-2">Updates</h1>
                    <h1><i className={showUpdates ? "bi bi-eye-slash-fill" : "bi bi-eye-fill"} onClick={() => { setShowUpdates(!showUpdates) }}></i></h1>
                </Col>
            </Row>
            <Row className={showUpdates ? "updatesTail" : "visually-hidden"}>
                <Col className="p-2" xs={12} md={6}>
                    <Card className="border-top-0 border-start-0 border-bottom-0 border-danger border-5">
                        <Card.Body className="d-flex justify-content-between">
                            <div className="w-100">
                                <Card.Title>
                                    v. 1.0.0
                                </Card.Title>
                                <Card.Text>
                                    <div id="updateId" className="border-bottom p-2">
                                        <span>Update ID: ggaagagag</span>
                                    </div>
                                    <div id="updateInfo" className="d-flex flex-column p-2 border-bottom p-2">
                                        <span>Author: Manuel Maurizio</span>
                                        <span>Creation date: ggaagagag</span>
                                    </div>
                                    <div id="changeNotes" className="d-flex flex-column p-2">
                                        <div className="d-flex justify-content-start p-2">
                                            <h5 className="me-2">Change notes</h5>
                                            <Button variant="success btn-sm"><i class="bi bi-plus"></i></Button>
                                        </div>
                                        <ul>
                                            <li>
                                                <div className="d-flex justify-content-between">
                                                    <span>Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo tipografo prese una cassetta di caratteri e li assemblò per preparare un testo campione.</span>
                                                    <div className="align-self-center">
                                                        <Button variant="danger" className="btn-sm"><i class="bi bi-trash-fill"></i></Button>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="d-flex justify-content-between">
                                                    <span>d</span>
                                                    <div className="align-self-center">
                                                        <Button variant="danger" className="btn-sm"><i class="bi bi-trash-fill"></i></Button>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="d-flex justify-content-between">
                                                    <span>Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo tipografo prese una cassetta di caratteri e li assemblò per preparare un testo campione.</span>
                                                    <div className="align-self-center">
                                                        <Button variant="danger" className="btn-sm"><i class="bi bi-trash-fill"></i></Button>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </Card.Text>
                            </div>
                            <div>
                                <NavDropdown menuVariant="dark" title={<h5><i class="bi bi-three-dots-vertical"></i></h5>}>
                                    <NavDropdown.Item href="#Modify/3.1"><div className="d-flex"><span>Start Update</span><i class="bi bi-caret-right-fill ms-auto"></i></div></NavDropdown.Item>
                                    <NavDropdown.Item href="#Delete/3.2"><div className="d-flex"><span>Delete</span><i class="bi bi-trash-fill ms-auto"></i></div></NavDropdown.Item>
                                </NavDropdown>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="p-2" xs={12} md={6}>
                    <Card className="border-top-0 border-start-0 border-bottom-0 border-yellow border-5">
                        <Card.Body className="d-flex justify-content-between">
                            <div className="w-100">
                                <Card.Title>
                                    v. 1.0.0
                                </Card.Title>
                                <Card.Text>
                                    <div id="updateId" className="border-bottom p-2">
                                        <span>Update ID: ggaagagag</span>
                                    </div>
                                    <div id="updateInfo" className="d-flex flex-column p-2 border-bottom p-2">
                                        <span>Author: Manuel Maurizio</span>
                                        <span>Creation date: ggaagagag</span>
                                    </div>
                                    <div id="startInfo" className="d-flex flex-column p-2 border-bottom p-2">
                                        <span>Started by: Manuel Maurizio</span>
                                        <span>Start date: ggaagagag</span>
                                    </div>
                                    <div id="changeNotes" className="d-flex flex-column p-2">
                                        <div className="d-flex justify-content-start p-2">
                                            <h5 className="me-2">Change notes</h5>
                                            <Button variant="success btn-sm"><i class="bi bi-plus"></i></Button>
                                        </div>
                                        <div>
                                            <div class="d-flex mb-3">
                                                <div class="p-2 align-self-center">
                                                    <Form.Check
                                                        inline
                                                        name="group1"
                                                        type="checkbox"
                                                        className="checkbox-sm"
                                                    />
                                                </div>
                                                <div class="p-2"><span>Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo tipografo prese una cassetta di caratteri e li assemblò per preparare un testo campione.</span></div>
                                                <div class="ms-auto p-2 align-self-center"><Button variant="danger" className="btn-sm"><i class="bi bi-trash-fill"></i></Button></div>
                                            </div>
                                        </div>
                                    </div>
                                </Card.Text>
                            </div>
                            <div>
                                <NavDropdown menuVariant="dark" title={<h5><i class="bi bi-three-dots-vertical"></i></h5>}>
                                    <NavDropdown.Item href="#Modify/3.1"><div className="d-flex"><span>Publish Update</span><i class="bi bi-upload ms-auto"></i></div></NavDropdown.Item>
                                    <NavDropdown.Item href="#Delete/3.2"><div className="d-flex"><span>Delete</span><i class="bi bi-trash-fill ms-auto"></i></div></NavDropdown.Item>
                                </NavDropdown>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="p-2" xs={12} md={6}>
                    <Card className="border-top-0 border-start-0 border-bottom-0 border-success border-5">
                        <Card.Body className="d-flex justify-content-between">
                            <div className="w-100">
                                <Card.Title>
                                    v. 1.0.0
                                </Card.Title>
                                <Card.Text>
                                    <div id="updateId" className="border-bottom p-2">
                                        <span>Update ID: ggaagagag</span>
                                    </div>
                                    <div id="updateInfo" className="d-flex flex-column p-2 border-bottom p-2">
                                        <span>Author: Manuel Maurizio</span>
                                        <span>Creation date: ggaagagag</span>
                                    </div>
                                    <div id="startInfo" className="d-flex flex-column p-2 border-bottom p-2">
                                        <span>Started by: Manuel Maurizio</span>
                                        <span>Start date: ggaagagag</span>
                                    </div>
                                    <div id="changeNotes" className="d-flex flex-column p-2">
                                        <div className="d-flex justify-content-start p-2">
                                            <h5 className="me-2">Change notes</h5>
                                        </div>
                                        <div>
                                            <ul>
                                                <li>
                                                    <span>Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo tipografo prese una cassetta di caratteri e li assemblò per preparare un testo campione.</span>
                                                </li>
                                                <li>
                                                    <span>Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo tipografo prese una cassetta di caratteri e li assemblò per preparare un testo campione.</span>
                                                </li>
                                                <li>
                                                    <span>Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo tipografo prese una cassetta di caratteri e li assemblò per preparare un testo campione.</span>
                                                </li>
                                                <li>
                                                    <span>Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo tipografo prese una cassetta di caratteri e li assemblò per preparare un testo campione.</span>
                                                </li>
                                                <li>
                                                    <span>Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo tipografo prese una cassetta di caratteri e li assemblò per preparare un testo campione.</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </Card.Text>
                            </div>
                            <div>
                                <Button variant="danger" className="btn-sm"><i class="bi bi-trash-fill"></i></Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row >
            <Row>
                <Col className="p-2 d-flex justify-content-between" data-bs-toggle="tooltip" title=" Groups number: 6">
                    <h1 className="me-2">Groups</h1>
                    <h1><i className={showGroups ? "bi bi-eye-slash-fill" : "bi bi-eye-fill"} onClick={() => { setShowGroups(!showGroups) }}></i></h1>
                </Col>
            </Row>
            <Row className={showGroups ? null : "visually-hidden"}>
                <Col className="p-2" xs={6} md={4} lg={3}>
                    <Card className="border-top-0 border-start-0 border-bottom-0 border-dark border-5">
                        <Card.Body>
                            <Card.Text>
                                <span className="fw-bold fs-5">Tecknobit</span>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col className="p-2 d-flex justify-content-between" data-bs-toggle="tooltip" title=" Total development days: 6&#013;Average development time: 3 days">
                    <h1 className="me-2">Stats</h1>
                    <h1><i className={showStats ? "bi bi-eye-slash-fill" : "bi bi-eye-fill"} onClick={() => { setShowStats(!showStats) }}></i></h1>
                </Col>
            </Row>
            <Row className={showStats ? "mb-2" : "visually-hidden"}>
                <Col>
                    <Card className="border-0">
                        <Card.Body className="d-flex justify-content-center chartContainer">
                            <Bar options={options} data={data} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container >
    );
}

export default Project;