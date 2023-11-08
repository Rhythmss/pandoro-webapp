import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Card } from "react-bootstrap";

ChartJS.register(ArcElement, Tooltip, Legend);

const Overview = () => {
    const data = {
        datasets: [
            {
                label: '',
                data: [12, 19],
                backgroundColor: [
                    '#61892f',
                    '#07020d',
                ],
                borderColor: [
                ],
                borderWidth: 0,
            },
        ],
    };

    return (
        <Container>
            <Row className="mt-2 mt-md-5">
                <Col>
                    <h1>Overview</h1>
                </Col>
            </Row>
            <Row className="mt-2 mt-md-3" xs={1} md={2}>
                <Col className="p-2">
                    <Card className="border border-0">
                        <Card.Body>
                            <Card.Title>Projects</Card.Title>
                            <div className="d-flex justify-content-evenly">
                                <div className="w-25">
                                    <Doughnut data={data}
                                        height={200}
                                        options={{ maintainAspectRatio: false }}
                                    />
                                </div>
                                <div className="d-flex align-items-center w-50">
                                    <div className="d-flex flex-column">
                                        <h6>Total - <b>19</b></h6>
                                        <h6>Personal - <b>19<span className="text-primary"> (27%)</span></b></h6>
                                        <h6>Group - <b>19<span className="text-green"> (27%)</span></b></h6>
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="p-2">
                    <Card className="border border-0">
                        <Card.Body>
                            <Card.Title>Updates</Card.Title>
                            <div className="d-flex justify-content-evenly">
                                <div className="w-25">
                                    <Doughnut data={data}
                                        height={200}
                                        options={{ maintainAspectRatio: false }}
                                    />
                                </div>
                                <div className="d-flex align-items-center w-50">
                                    <div className="d-flex flex-column">
                                        <h6>Total - <b>19</b></h6>
                                        <h6>Personal - <b>19<span className="text-primary"> (27%)</span></b></h6>
                                        <h6>Group - <b>19<span className="text-green"> (27%)</span></b></h6>
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-2 mt-md-5">
                <Col>
                    <h2>Updates status</h2>
                </Col>
            </Row>
            <Row className="mt-2 mt-md-3" xs={1} md={3}>
                <Col className="p-2">
                    <Card className="border border-0">
                        <Card.Body>
                            <Card.Title>Scheduled</Card.Title>
                            <div className="d-flex justify-content-evenly">
                                <div className="w-25">
                                    <Doughnut data={data}
                                        height={200}
                                        options={{ maintainAspectRatio: false }}
                                    />
                                </div>
                                <div className="d-flex align-items-center w-50">
                                    <div className="d-flex flex-column">
                                        <h6>Total - <b>19</b></h6>
                                        <h6>Personal - <b>19<span className="text-primary"> (27%)</span></b></h6>
                                        <h6>Group - <b>19<span className="text-green"> (27%)</span></b></h6>
                                        <h6>From me - <b>19<span className="text-yellow"> (27%)</span></b></h6>
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="p-2">
                    <Card className="border border-0">
                        <Card.Body>
                            <Card.Title>In development</Card.Title>
                            <div className="d-flex justify-content-evenly">
                                <div className="w-25">
                                    <Doughnut data={data}
                                        height={200}
                                        options={{ maintainAspectRatio: false }}
                                    />
                                </div>
                                <div className="d-flex align-items-center w-50">
                                    <div className="d-flex flex-column">
                                        <h6>Total - <b>19</b></h6>
                                        <h6>Personal - <b>19<span className="text-primary"> (27%)</span></b></h6>
                                        <h6>Group - <b>19<span className="text-green"> (27%)</span></b></h6>
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="p-2">
                    <Card className="border border-0">
                        <Card.Body>
                            <Card.Title>Published</Card.Title>
                            <div className="d-flex justify-content-evenly">
                                <div className="w-25">
                                    <Doughnut data={data}
                                        height={200}
                                        options={{ maintainAspectRatio: false }}
                                    />
                                </div>
                                <div className="d-flex align-items-center w-50">
                                    <div className="d-flex flex-column">
                                        <h6>Total - <b>19</b></h6>
                                        <h6>Personal - <b>19<span className="text-primary"> (27%)</span></b></h6>
                                        <h6>Group - <b>19<span className="text-green"> (27%)</span></b></h6>
                                        <h6>From me - <b>19<span className="text-yellow"> (27%)</span></b></h6>
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-2 mt-md-5">
                <Col>
                    <h2>Project performance</h2>
                </Col>
            </Row>
            <Row className="mt-2 mt-md-4 mb-3">
                <Col>
                    <Row>
                        <Col xs={12} className="mb-4">
                            <h4>Personal</h4>
                        </Col>
                        <Col xs={12} className="mb-4">
                            <Card className="border-top-0 border-start-0 border-bottom-0 border-success border-5">
                                <Card.Body>
                                    <Card.Title>
                                        Best performance
                                    </Card.Title>
                                    <div>
                                        <div className="d-flex flex-column">
                                            <h6>Name: Fourth</h6>
                                            <h6>Description: Fourth</h6>
                                            <h6>Updates member: 6</h6>
                                            <h6>Development days: 35</h6>
                                            <h6>Average development time: 5 days</h6>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card className="border-top-0 border-start-0 border-bottom-0 border-danger border-5">
                                <Card.Body>
                                    <Card.Title>
                                        Worst performance
                                    </Card.Title>
                                    <div>
                                        <div className="d-flex flex-column">
                                            <h6>Name: Fourth</h6>
                                            <h6>Description: Fourth</h6>
                                            <h6>Updates member: 6</h6>
                                            <h6>Development days: 35</h6>
                                            <h6>Average development time: 5 days</h6>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Col>
                <Col>
                    <Row>
                        <Col className="mb-4">
                            <h4>Group</h4>
                        </Col>
                        <Col xs={12} className="mb-4">
                            <Card className="border-top-0 border-start-0 border-bottom-0 border-success border-5">
                                <Card.Body>
                                    <Card.Title>
                                        Best performance
                                    </Card.Title>
                                    <div>
                                        <div className="d-flex flex-column">
                                            <h6>Name: Fourth</h6>
                                            <h6>Description: Fourth</h6>
                                            <h6>Updates member: 6</h6>
                                            <h6>Development days: 35</h6>
                                            <h6>Average development time: 5 days</h6>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card className="border-top-0 border-start-0 border-bottom-0 border-danger border-5">
                                <Card.Body>
                                    <Card.Title>
                                        Worst performance
                                    </Card.Title>
                                    <div>
                                        <div className="d-flex flex-column">
                                            <h6>Name: Fourth</h6>
                                            <h6>Description: Fourth</h6>
                                            <h6>Updates member: 6</h6>
                                            <h6>Development days: 35</h6>
                                            <h6>Average development time: 5 days</h6>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container >
    );
}

export default Overview;
