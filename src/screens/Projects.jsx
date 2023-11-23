import React, { useState } from "react";
import { useEffect } from "react";
import { useStateWithCallbackLazy } from "use-state-with-callback";
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
import { Toast } from "react-bootstrap";
import axios from "axios";
import requests from "../requests";
import paths from "../paths";

const Projects = () => {
    const id = localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE_ID)
    const token = localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE_TOKEN)
    const [toast, setToast] = useState({ message: null, show: false })
    const [showModal, setShowModal] = useState({ show: false, projectID: null });
    const [projects, setProjects] = useState([])
    const [projectInfo, setProjectInfo] = useStateWithCallbackLazy({ name: null, project_description: null, project_version: null, project_short_description: null, groups: [], project_repository: "", all_groups: [] })
    const [currentProject, setCurrentProject] = useState("")

    useEffect(() => {
        getGroups()
        getProject()
    }, [])

    const getProject = () => {
        axios.get(requests.projects.list, { headers: { "token": token, "id": id } }).then(res => {
            setProjects(res.data)
        })
    }

    const getGroups = () => {
        axios.get(requests.groups.list, { headers: { "token": token, "id": id } }).then(res => {
            setProjectInfo({
                name: null, project_description: null, project_version: null, project_short_description: null, groups: [], project_repository: "",
                all_groups: res.data.map((group) => {
                    return {
                        name: group.name,
                        id: group.id
                    }
                })
            })
        })
    }

    const projectAction = (event) => {
        event.preventDefault()
        event.stopPropagation()
        console.log(projectInfo)
        const { all_groups, ...data } = projectInfo
        if (showModal.projectID)
            editProject(data)
        else
            createProject(data)
    }

    const createProject = (data) => {
        axios.post(requests.projects.addProject, data, { headers: { "token": token, "id": id } }).then(res => {
            if (res.data.success) {
                setToast({ message: "Project has been created", show: true })
            } else {
                setToast({ message: res.data.error, show: true })
            }
            setShowModal({ show: false, projectID: null })
            getGroups()
            getProject()
        })
    }

    const editProject = (data) => {
        axios.patch(requests.projects.editProject(showModal.projectID), data, { headers: { "token": token, "id": id } }).then(res => {
            if (res.data.success) {
                setToast({ message: "Project has been edited", show: true })
            } else {
                setToast({ message: res.data.error, show: true })
            }
            setShowModal({ show: false, projectID: null })
            getGroups()
            getProject()
        })
    }

    return (
        <Container>
            <Button variant="dark" className="position-fixed speed-dial" size="lg" onClick={() => { setShowModal({ show: true, projectID: null }) }}><i className="bi bi-plus-lg"></i></Button>
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
                        <InputGroup.Text id="basic-addon2"><i className="bi bi-search"></i></InputGroup.Text>
                    </InputGroup>
                </Col>
            </Row>
            <Row className="mt-2 mt-md-3" xs={1} lg={4}>
                <Col className="p-2">
                    <Card className="border border-0 h-100">
                        <Card.Body>
                            <Card.Title className="d-flex justify-content-between">
                                <div className="w-75 projectCard"><a href="/Project" className="stretched-link projectLink">Go somewhere</a>Project's name</div>
                                <div>
                                    <NavDropdown menuVariant="dark" title={<i className="bi bi-three-dots-vertical text-left"></i>}>
                                        <NavDropdown.Item onClick={() => { setShowModal({ show: true, projectID: null }) }}>Modify</NavDropdown.Item>
                                        <NavDropdown.Item>Delete</NavDropdown.Item>
                                    </NavDropdown>
                                </div>
                            </Card.Title>
                            <Card.Text className="projectCard">
                                description sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
                                <a href="/Project" className="stretched-link projectLink">Go somewhere</a>
                            </Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item>V 1.2.3 <i className="bi bi-person-fill"></i></ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row >
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
                            value={currentProject}
                            onChange={(event) => { setCurrentProject(event.currentTarget.value) }}
                        />
                        <InputGroup.Text id="basic-addon2"><i className="bi bi-search"></i></InputGroup.Text>
                    </InputGroup>
                </Col>
            </Row>
            <Row className="mt-2 mt-md-3" xs={1} lg={4}>
                {
                    projects.map((project => {
                        if (currentProject === "" || project.name.includes(currentProject)) {
                            return (
                                <Col className="p-2" key={project.id}>
                                    <Card className="border border-0 h-100">
                                        <Card.Body>
                                            <Card.Title className="d-flex justify-content-between">
                                                <div className="w-75 projectCard"><a href="/Project" className="stretched-link projectLink">Go somewhere</a>{project.name}</div>
                                                <div>
                                                    <NavDropdown menuVariant="dark" title={<i className="bi bi-three-dots-vertical text-left"></i>}>
                                                        <NavDropdown.Item onClick={
                                                            () => {
                                                                setProjectInfo({
                                                                    ...projectInfo,
                                                                    name: project.name,
                                                                    project_description: project.project_description,
                                                                    project_repository: project.project_repository,
                                                                    project_short_description: project.project_short_description,
                                                                    project_version: project.project_version,
                                                                    groups: project.groups.length > 0 ? project.groups.map(group => { return group.id }) : []
                                                                }, (projectInfo) => {
                                                                    console.log(projectInfo)

                                                                    setShowModal({ show: true, projectID: project.id })
                                                                })


                                                            }
                                                        }>Modify</NavDropdown.Item>
                                                        <NavDropdown.Item>Delete</NavDropdown.Item>
                                                    </NavDropdown>
                                                </div>
                                            </Card.Title>
                                            <Card.Text className="projectCard">
                                                {project.project_description}
                                                <a href="/Project" className="stretched-link projectLink">Go somewhere</a>
                                            </Card.Text>
                                        </Card.Body>
                                        <ListGroup className="list-group-flush">
                                            <ListGroup.Item>V {project.project_version} {project.groups.length > 0 ? <i className="bi bi-people-fill"></i> : <i className="bi bi-person-fill"></i>}</ListGroup.Item>
                                        </ListGroup>
                                    </Card>
                                </Col>
                            )
                        } else return null
                    }))}
            </Row>
            <Modal centered show={showModal.show} fullscreen={false} onHide={() => {
                setShowModal({ show: false, projectID: null })
                getGroups()
            }} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Create Project</Modal.Title>
                </Modal.Header>
                <Form noValidate onSubmit={(event) => projectAction(event)}>
                    <Modal.Body>
                        <Form.Floating className="mb-3">
                            <Form.Control
                                id="floatingInputCustom"
                                type="text"
                                placeholder="Name"
                                onChange={(event) => {
                                    setProjectInfo({ ...projectInfo, name: event.target.value })
                                }}
                                value={projectInfo.name}
                            />
                            <label htmlFor="floatingInputCustom">Name</label>
                        </Form.Floating>
                        <Form.Floating className="mb-3">
                            <Form.Control
                                id="floatingInputCustom"
                                type="text"
                                as="textarea"
                                style={{ height: '300px' }}
                                placeholder="Description"
                                onChange={(event) => {
                                    setProjectInfo({ ...projectInfo, project_description: event.target.value })
                                }}
                                value={projectInfo.project_description}
                            />
                            <label htmlFor="floatingInputCustom">Description</label>
                        </Form.Floating>
                        <Form.Floating className="mb-3">
                            <Form.Control
                                id="floatingInputCustom"
                                type="text"
                                placeholder="Short description"
                                onChange={(event) => {
                                    setProjectInfo({ ...projectInfo, project_short_description: event.target.value })
                                }}
                                value={projectInfo.project_short_description}
                            />
                            <label htmlFor="floatingInputCustom">Short description</label>
                        </Form.Floating>
                        <Form.Floating className="mb-3">
                            <Form.Control
                                id="floatingInputCustom"
                                type="text"
                                placeholder="Version"
                                onChange={(event) => {
                                    setProjectInfo({ ...projectInfo, project_version: event.target.value })
                                }}
                                value={projectInfo.project_version}
                            />
                            <label htmlFor="floatingInputCustom">Version</label>
                        </Form.Floating>
                        <Form.Floating className="mb-3">
                            <Form.Control
                                id="floatingInputCustom"
                                type="text"
                                placeholder="Repository"
                                onChange={(event) => {
                                    setProjectInfo({ ...projectInfo, project_repository: event.target.value })
                                }}
                                value={projectInfo.project_repository}
                            />
                            <label htmlFor="floatingInputCustom">Repository</label>
                        </Form.Floating>
                        <ToggleButtonGroup type="checkbox" className="mb-2">
                            {
                                projectInfo.all_groups.map((g) => {
                                    return (
                                        <ToggleButton id="tbg-check-1" key={g.id} onChange={() => {
                                            projectInfo.groups.filter(group => group === g.id).length === 1 ? setProjectInfo({
                                                ...projectInfo,
                                                groups: projectInfo.groups.filter(group => group !== g.id)
                                            }) : setProjectInfo({
                                                ...projectInfo,
                                                groups: [...projectInfo.groups, g.id]
                                            })
                                        }} checked={projectInfo.groups.filter(group => group === g.id).length === 1} className="btn-dark" >
                                            {g.name}
                                        </ToggleButton>
                                    )
                                })
                            }
                        </ToggleButtonGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="dark" className="modalBtn" type="submit">{showModal.projectID ? "Change" : "Create"} project</Button>
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

export default Projects;