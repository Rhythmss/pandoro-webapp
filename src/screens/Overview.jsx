import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import requests from "../requests";

ChartJS.register(ArcElement, Tooltip, Legend);

const Overview = () => {
    const data = {
        datasets: [
            {
                label: '',
                data: [0, 0, 0],
                backgroundColor: [
                    '#61892f',
                    '#bfae19',
                    '#07020d',
                ],
                borderColor: [
                ],
                borderWidth: 0,
            },
        ],
    }
    const id = localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE_ID)
    const token = localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE_TOKEN)
    const [projectsData, setProjectsData] = useState([data, null])
    const [updatesData, setUpdatesData] = useState([data, null])
    const [scheduledUpdateData, setScheduledUpdateData] = useState([data, null, null])
    const [indevelopmentUpdateData, setIndevelopmentUpdateData] = useState([data, null])
    const [publishedUpdateData, setPublishedUpdateDate] = useState([data, null, null])
    const [bestPersonalProject, setBestPersonalProject] = useState()
    const [worstPersonalProject, setWorstPersonalProject] = useState()
    const [bestGroupProject, setBestGroupProject] = useState()
    const [worstGroupProject, setWorstGroupProject] = useState()

    useEffect(() => {
        getProjects()
    }, [])

    const setChart = (projects) => {
        setBestPersonalProject(
            getBestProject(projects.filter(project => project.groups.length === 0))
        )
        setWorstPersonalProject(
            getWorstProject(projects.filter(project => project.groups.length === 0))
        )
        setBestGroupProject(
            getBestProject(projects.filter(project => project.groups.length !== 0))
        )
        setWorstGroupProject(
            getWorstProject(projects.filter(project => project.groups.length !== 0))
        )
        setProjectsData([{
            datasets: [
                {
                    ...data.datasets[0],
                    data: [projects.filter(project => project.groups.length !== 0).length, null, projects.filter(project => project.groups.length === 0).length]
                }
            ]
        }, projects.length])
        setUpdatesData([{
            datasets: [
                {
                    ...data.datasets[0],
                    data: [getAllUpdates(projects.filter(project => project.groups.length !== 0)).length, null, getAllUpdates(projects.filter(project => project.groups.length === 0)).length]
                }
            ]
        }, projects.length])
        setScheduledUpdateData([{
            datasets: [
                {
                    ...data.datasets[0],
                    data: [getUpdateFromType(getAllUpdates(projects.filter(project => project.groups.length !== 0)), "SCHEDULED").length, null, getUpdateFromType(getAllUpdates(projects.filter(project => project.groups.length === 0)), "SCHEDULED").length]
                }
            ]
        }, getUpdateFromType(getAllUpdates(projects), "SCHEDULED").length, getUpdateFromType(getAllUpdates(projects), "PUBLISHED").filter(update => update.started_by.id === id).length])
        setIndevelopmentUpdateData([{
            datasets: [
                {
                    ...data.datasets[0],
                    data: [getUpdateFromType(getAllUpdates(projects.filter(project => project.groups.length !== 0)), "IN_DEVELOPMENT").length, 0, getUpdateFromType(getAllUpdates(projects.filter(project => project.groups.length === 0)), "IN_DEVELOPMENT").length]
                }
            ]
        }, getUpdateFromType(getAllUpdates(projects), "IN_DEVELOPMENT").length])
        setPublishedUpdateDate([{
            datasets: [
                {
                    ...data.datasets[0],
                    data: [getUpdateFromType(getAllUpdates(projects.filter(project => project.groups.length !== 0)), "PUBLISHED").length, 0, getUpdateFromType(getAllUpdates(projects.filter(project => project.groups.length === 0)), "PUBLISHED").length]
                }
            ]
        }, getUpdateFromType(getAllUpdates(projects), "PUBLISHED").length, getUpdateFromType(getAllUpdates(projects), "PUBLISHED").filter(update => update.published_by.id === id).length])
    }

    const getBestProject = (projects) => {
        var bestProject = null
        var updatesNumber = 0
        var developmentDays = 0
        var averageDevelopmentTime = 0
        projects.forEach(project => {
            var pDevelopmentDays = projectDevelopmentTime(project)
            var pAverageDevelopmentTime = pDevelopmentDays / project.updates.filter((update) => update.status === "PUBLISHED").length
            if (pAverageDevelopmentTime > averageDevelopmentTime) {
                averageDevelopmentTime = pAverageDevelopmentTime
                developmentDays = pDevelopmentDays
            }
        }
        )
        projects.forEach(
            project => {
                var pUpdatesNumber = project.updates.length
                if (pUpdatesNumber > 0) {
                    var pDevelopmentDays = projectDevelopmentTime(project)
                    var pAverageDevelopmentTime = pDevelopmentDays / project.updates.filter((update) => update.status === "PUBLISHED").length
                    if (pUpdatesNumber >= updatesNumber && pDevelopmentDays <= developmentDays) {
                        if (pAverageDevelopmentTime < averageDevelopmentTime || bestProject == null) {
                            bestProject = project
                            updatesNumber = pUpdatesNumber
                            developmentDays = pDevelopmentDays
                            averageDevelopmentTime = pAverageDevelopmentTime
                        }
                    }
                }
            }

        )
        return { ...bestProject, updates_number: updatesNumber, development_days: developmentDays, average_development_time: averageDevelopmentTime }
    }

    const getWorstProject = (project) => {
        var worstProject = null
        var updatesNumber = 0
        var developmentDays = 0
        var averageDevelopmentTime = 0
        if (bestPersonalProject != null) {
            project.forEach(
                project => {
                    var pUpdatesNumber = project.updates.length
                    if (pUpdatesNumber > updatesNumber) {
                        updatesNumber = pUpdatesNumber
                        developmentDays = projectDevelopmentTime(project)
                    }
                }
            )
            project.forEach(
                project => {
                    var pUpdatesNumber = project.updates.length
                    if (pUpdatesNumber > 0) {
                        var pDevelopmentDays = projectDevelopmentTime(project)
                        var pAverageDevelopmentTime = projectDevelopmentTime(project) / project.updates.filter((update) => update.status === "PUBLISHED").length
                        if (pUpdatesNumber <= updatesNumber && pDevelopmentDays >= developmentDays) {
                            if (pAverageDevelopmentTime > averageDevelopmentTime || worstProject == null) {
                                worstProject = project
                                updatesNumber = pUpdatesNumber
                                developmentDays = pDevelopmentDays
                                averageDevelopmentTime = pAverageDevelopmentTime
                            }
                        }
                    }
                }

            )
        }
        return { ...worstProject, updates_number: updatesNumber, development_days: developmentDays, average_development_time: averageDevelopmentTime }
    }

    const projectDevelopmentTime = (project) => {
        var totalDevelopmentDays = 0
        project.updates.forEach(update => {
            if (update.status === "PUBLISHED") {
                var startDate = new Date(update.start_date)
                var publishDate = new Date(update.publish_date)
                var diffTime = Math.abs(publishDate - startDate);
                totalDevelopmentDays += Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            }
        })
        return totalDevelopmentDays
    }

    const getUpdateFromType = (updates, type) => {
        var scheduledUpdates = []
        updates.forEach(update => update.status === type ? scheduledUpdates.push(update) : null)
        return scheduledUpdates
    }

    const getAllUpdates = (projects) => {
        var updates = []
        projects.forEach(project => updates.push(...project.updates))
        return updates
    }

    const getProjects = () => {
        axios.get(requests.projects.list, { headers: { "token": token, "id": id } }).then(res => {
            setChart(res.data)
        })
    }

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
                                    <Doughnut data={projectsData[0]}
                                        height={200}
                                        options={{ maintainAspectRatio: false }}
                                    />
                                </div>
                                <div className="d-flex align-items-center w-50">
                                    <div className="d-flex flex-column">
                                        <h6>Total - <b>{projectsData[1]}</b></h6>
                                        <h6>Personal - <b>{projectsData[0].datasets[0].data[2]}<span className="text-primary"> ({projectsData[1] ? projectsData[0].datasets[0].data[2] * 100 / projectsData[1] : null}%)</span></b></h6>
                                        <h6>Group - <b>{projectsData[0].datasets[0].data[0]}<span className="text-green"> ({projectsData[1] ? projectsData[0].datasets[0].data[0] * 100 / projectsData[1] : null}%)</span></b></h6>
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
                                    <Doughnut data={updatesData[0]}
                                        height={200}
                                        options={{ maintainAspectRatio: false }}
                                    />
                                </div>
                                <div className="d-flex align-items-center w-50">
                                    <div className="d-flex flex-column">
                                        <h6>Total - <b>{updatesData[1]}</b></h6>
                                        <h6>Personal - <b>{updatesData[0].datasets[0].data[2]}<span className="text-primary"> ({updatesData[1] ? updatesData[0].datasets[0].data[2] * 100 / updatesData[1] : null}%)</span></b></h6>
                                        <h6>Group - <b>{updatesData[0].datasets[0].data[0]}<span className="text-green"> ({updatesData[1] ? updatesData[0].datasets[0].data[0] * 100 / updatesData[1] : null}%)</span></b></h6>
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
                                    <Doughnut data={scheduledUpdateData[0]}
                                        height={200}
                                        options={{ maintainAspectRatio: false }}
                                    />
                                </div>
                                <div className="d-flex align-items-center w-50">
                                    <div className="d-flex flex-column">
                                        <h6>Total - <b>{scheduledUpdateData[1]}</b></h6>
                                        <h6>Personal - <b>{scheduledUpdateData[0].datasets[0].data[2]}<span className="text-primary"> ({scheduledUpdateData[1] ? scheduledUpdateData[0].datasets[0].data[2] * 100 / scheduledUpdateData[1] : 0}%)</span></b></h6>
                                        <h6>Group - <b>{scheduledUpdateData[0].datasets[0].data[0]}<span className="text-green"> ({scheduledUpdateData[1] ? scheduledUpdateData[0].datasets[0].data[0] * 100 / scheduledUpdateData[1] : null}%)</span></b></h6>
                                        <h6>From me - <b>{scheduledUpdateData[2]}<span className="text-yellow"> ({scheduledUpdateData[1] ? scheduledUpdateData[2] * 100 / scheduledUpdateData[1] : null}%)</span></b></h6>
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
                                        <h6>Total - <b>{indevelopmentUpdateData[1]}</b></h6>
                                        <h6>Personal - <b>{indevelopmentUpdateData[0].datasets[0].data[2]}<span className="text-primary"> ({indevelopmentUpdateData[1] ? indevelopmentUpdateData[0].datasets[0].data[2] * 100 / indevelopmentUpdateData[1] : 0}%)</span></b></h6>
                                        <h6>Group - <b>{indevelopmentUpdateData[0].datasets[0].data[0]}<span className="text-green"> ({indevelopmentUpdateData[1] ? indevelopmentUpdateData[0].datasets[0].data[0] * 100 / indevelopmentUpdateData[1] : 0}%)</span></b></h6>
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
                                    <Doughnut data={publishedUpdateData[0]}
                                        height={200}
                                        options={{ maintainAspectRatio: false }}
                                    />
                                </div>
                                <div className="d-flex align-items-center w-50">
                                    <div className="d-flex flex-column">
                                        <h6>Total - <b>{publishedUpdateData[1]}</b></h6>
                                        <h6>Personal - <b>{publishedUpdateData[0].datasets[0].data[2]}<span className="text-primary"> ({publishedUpdateData[1] ? publishedUpdateData[0].datasets[0].data[2] * 100 / publishedUpdateData[1] : null}%)</span></b></h6>
                                        <h6>Group - <b>{publishedUpdateData[0].datasets[0].data[0]}<span className="text-green"> ({publishedUpdateData[1] ? publishedUpdateData[0].datasets[0].data[0] * 100 / publishedUpdateData[1] : null}%)</span></b></h6>
                                        <h6>From me - <b>{publishedUpdateData[2]}<span className="text-yellow"> ({publishedUpdateData[1] ? publishedUpdateData[2] * 100 / publishedUpdateData[1] : null}%)</span></b></h6>
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
                        {bestPersonalProject.name ? <Col xs={12} className="mb-4">
                            <Card className="border-top-0 border-start-0 border-bottom-0 border-success border-5">
                                <Card.Body>
                                    <Card.Title>
                                        Best performance
                                    </Card.Title>
                                    <div>
                                        <div className="d-flex flex-column">
                                            <h6>Name: {bestPersonalProject.name}</h6>
                                            <h6>Description: {bestPersonalProject.project_description}</h6>
                                            <h6>Updates member: {bestPersonalProject.updates_number}</h6>
                                            <h6>Development days: {bestPersonalProject.development_days} days</h6>
                                            <h6>Average development time: {bestPersonalProject.average_development_time} days</h6>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col> : null}
                        {worstPersonalProject.name ?
                            <Col>
                                <Card className="border-top-0 border-start-0 border-bottom-0 border-danger border-5">
                                    <Card.Body>
                                        <Card.Title>
                                            Worst performance
                                        </Card.Title>
                                        <div>
                                            <div className="d-flex flex-column">
                                                <h6>Name: {worstPersonalProject.name}</h6>
                                                <h6>Description: {worstPersonalProject.project_description}</h6>
                                                <h6>Updates member: {worstPersonalProject.updates_number}</h6>
                                                <h6>Development days: {worstPersonalProject.development_days} days</h6>
                                                <h6>Average development time: {worstPersonalProject.average_development_time} days</h6>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col> : null}
                    </Row>
                </Col>
                <Col>
                    <Row>
                        <Col className="mb-4">
                            <h4>Group</h4>
                        </Col>
                        {bestGroupProject.name ?
                            <Col xs={12} className="mb-4">
                                <Card className="border-top-0 border-start-0 border-bottom-0 border-success border-5">
                                    <Card.Body>
                                        <Card.Title>
                                            Best performance
                                        </Card.Title>
                                        <div>
                                            <div className="d-flex flex-column">
                                                <h6>Name: {bestGroupProject.name}</h6>
                                                <h6>Description: {bestGroupProject.project_description}</h6>
                                                <h6>Updates member: {bestGroupProject.updates_number}</h6>
                                                <h6>Development days: {bestGroupProject.development_days} days</h6>
                                                <h6>Average development time: {bestGroupProject.average_development_time} days</h6>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col> : null}
                        {worstGroupProject.name ?
                            <Col>
                                <Card className="border-top-0 border-start-0 border-bottom-0 border-danger border-5">
                                    <Card.Body>
                                        <Card.Title>
                                            Worst performance
                                        </Card.Title>
                                        <div>
                                            <div className="d-flex flex-column">
                                                <h6>Name: {worstGroupProject.name}</h6>
                                                <h6>Description: {worstGroupProject.project_description}</h6>
                                                <h6>Updates member: {worstGroupProject.updates_number}</h6>
                                                <h6>Development days: {worstGroupProject.development_days} days</h6>
                                                <h6>Average development time: {worstGroupProject.average_development_time} days</h6>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col> : null}
                    </Row>
                </Col>
            </Row>
        </Container >
    );
}

export default Overview;
