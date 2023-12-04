import React, { useState } from "react";
import { useEffect } from "react";
import { useStateWithCallbackLazy } from "use-state-with-callback";
import { Container, FloatingLabel } from "react-bootstrap";
import { Form } from "react-bootstrap";
import moment from "moment/moment";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { NavDropdown } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { Bar } from 'react-chartjs-2';
import axios from "axios";
import paths from "../paths";
import { useParams } from "react-router-dom";
import requests from "../requests";
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


const Project = () => {
    const id = localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE_ID)
    const token = localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE_TOKEN)
    const params = useParams()
    const [showProjectInfo, setShowProjectInfo] = useState(true)
    const [showUpdates, setShowUpdates] = useState(true)
    const [showModalCreateUpdate, setShowModalCreateUpdate] = useState(false)
    const [showGroups, setShowGroups] = useState(true)
    const [showStats, setShowStats] = useState(true)
    const [projectInfo, setProjectInfo] = useStateWithCallbackLazy()
    const [version, setVersion] = useState({ versionNumber: null, error: null })
    const [changeNotes, setChangeNotes] = useState([{ note: null, error: null }])
    const [modalAction, setModalAction] = useState()
    const [labels, setLabels] = useStateWithCallbackLazy([])

    const data = {
        labels,
        datasets: [
            {
                label: 'Development days',
                data: labels.map(() => labels.development_days),
                backgroundColor: '#61892f',
            }
        ],
    };

    useEffect(() => {
        getOneProject()
    }, [])

    const startUpdate = (updateID) => {
        axios.patch(requests.updates.start(params.projectID, updateID), null, { headers: { "token": token, "id": id } }).then(() => {
            getOneProject()
        })
    }

    const markAsDone = (updateID, noteID) => {
        axios.patch(requests.updates.markChangeNoteAsDone(params.projectID, updateID, noteID), null, { headers: { "token": token, "id": id } }).then(() => {
            getOneProject()
        })
    }

    const markAsToDo = (updateID, noteID) => {
        axios.patch(requests.updates.markChangeNoteAsToDo(params.projectID, updateID, noteID), null, { headers: { "token": token, "id": id } }).then(() => {
            getOneProject()
        })
    }

    const publishUpdate = (updateID) => {
        axios.patch(requests.updates.publish(params.projectID, updateID), null, { headers: { "token": token, "id": id } }).then(() => {
            getOneProject()
        })
    }

    const deleteUpdate = (updateID) => {
        axios.delete(requests.updates.delete(params.projectID, updateID), { headers: { "token": token, "id": id } }).then(() => {
            getOneProject()
        })
    }

    const getOneProject = () => {
        axios.get(requests.projects.getOne(params.projectID), { headers: { "token": token, "id": id } }).then(res => {
            setProjectInfo(res.data, (projectInfo) => {
                if (!projectInfo.updates.length > 0)
                    setShowUpdates(false)
                else
                    setShowUpdates(true)
                if (!projectInfo.groups.length > 0)
                    setShowGroups(false)
                else
                    setShowGroups(true)
                setLabels(projectInfo.updates.filter(update => update.status === "PUBLISHED"))
            })
        })
    }

    const deleteChangeNote = (noteID, updateID) => {
        axios.delete(requests.updates.deleteChangeNote(params.projectID, updateID, noteID), { headers: { "token": token, "id": id } }).then(() => {
            getOneProject()
        })
    }

    const addChangeNotes = (event) => {
        event.preventDefault()
        event.stopPropagation()
        if (checkChangeNotesUpdate) {
            axios.put(requests.updates.addChangeNote(params.projectID, modalAction), changeNotes[0].note, { headers: { "token": token, "id": id, "Content-Type": "text/plain" } })
            closeCreateUpdateModal()
            getOneProject()
        }
    }

    const checkChangeNotesUpdate = () => {
        var check = true
        if (version.versionNumber === "" || version.versionNumber === null) {
            check = false
            setVersion({
                ...version,
                error: "this field cannot be empty"
            })
        } else {
            setVersion({
                ...version,
                error: null
            })
        }
        if (changeNotes.filter(changeNote => changeNote.note === "" || changeNote.note === null).length > 0) {
            check = false
            setChangeNotes(changeNotes.map(changeNote => {
                if (changeNote.note === "" || changeNote.note === null) return {
                    ...changeNote,
                    error: "This field cannot be empty"
                }
                else return {
                    ...changeNote,
                    error: null
                }
            }))
        }
        return check
    }

    const scheduleUpdate = (event) => {
        event.preventDefault()
        event.stopPropagation()
        if (checkChangeNotesUpdate()) {
            const data = {
                target_version: version.versionNumber,
                update_change_notes: changeNotes.map(changeNote => { return changeNote.note })
            }
            axios.post(requests.updates.schedule(params.projectID), data, { headers: { "token": token, "id": id } }).then(res => {
                closeCreateUpdateModal()
                getOneProject()
            })
        }
    }

    const closeCreateUpdateModal = () => {
        setShowModalCreateUpdate(false)
        setVersion({ versionNumber: null, error: null })
        setChangeNotes([{ note: null, error: null }])
    }

    return (
        <Container>
            <Button variant="dark" className="position-fixed speed-dial" size="lg" onClick={() => {
                setShowModalCreateUpdate(true)
                setModalAction("POST")
            }}><i className="bi bi-plus-lg"></i></Button>
            <Row className="mt-2 mt-md-5">
                <Col className="p-2 d-flex justify-content-between">
                    <h1 className="me-2">{projectInfo ? projectInfo.name : null}</h1>
                    <h1><i className={showProjectInfo ? "bi bi-eye-slash-fill" : "bi bi-eye-fill"} onClick={() => { setShowProjectInfo(!showProjectInfo) }}></i></h1>
                </Col>
            </Row>
            <Row className={showProjectInfo ? null : "visually-hidden"}>
                <Col className="p-2">
                    <Card className="border-0">
                        <Card.Body>
                            <Card.Text>
                                {projectInfo ? projectInfo.project_description : null}
                            </Card.Text>
                            <Card.Footer className="d-flex bd-highlight">
                                <h2><i className="bi bi-github bd-highlight"></i></h2>
                                <span className="p-2 bd-highlight">v. {projectInfo ? projectInfo.project_version : null}</span>
                                <span className="ms-auto p-2 bd-highlight">{projectInfo ? projectInfo.author.name + " " + projectInfo.author.surname : null} </span>
                            </Card.Footer>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col className="p-2 d-flex justify-content-between" data-bs-toggle="tooltip" title=" Updates number: 6&#013;Last update: 6">
                    <h1 className="me-2">Updates</h1>
                    {projectInfo && projectInfo.updates.length > 0 ? <h1><i className={showUpdates ? "bi bi-eye-slash-fill" : "bi bi-eye-fill"} onClick={() => { setShowUpdates(!showUpdates) }}></i></h1> : null}
                </Col>
            </Row>
            <Row className={showUpdates ? "updatesTail" : "visually-hidden"}>
                {
                    projectInfo ? projectInfo.updates.map(update => {
                        return (
                            <Col className="p-2" xs={12} md={6} key={update.id}>
                                <Card className={`border-top-0 border-start-0 border-bottom-0 border-5 ${update.status === "SCHEDULED" ? "border-danger" : update.status === "PUBLISHED" ? "border-success" : "border-yellow"}`}  >
                                    <Card.Body>
                                        <div>
                                            <div className="d-flex justify-content-between w-100">
                                                <Card.Title>{update.target_version}</Card.Title>
                                                <div>
                                                    {
                                                        update.status !== "PUBLISHED" ?
                                                            <NavDropdown menuVariant="dark" title={<h5><i className="bi bi-three-dots-vertical"></i></h5>}>
                                                                {
                                                                    update.status === "SCHEDULED" ?
                                                                        <NavDropdown.Item ><div className="d-flex" onClick={() => { startUpdate(update.id) }}><span>Start Update</span><i className="bi bi-caret-right-fill ms-auto"></i></div></NavDropdown.Item> :
                                                                        <NavDropdown.Item ><div className="d-flex" onClick={() => { publishUpdate(update.id) }}><span>Publish Update</span><i className="bi bi-upload ms-auto"></i></div></NavDropdown.Item>
                                                                }
                                                                <NavDropdown.Item ><div className="d-flex" onClick={() => { deleteUpdate(update.id) }}><span>Delete</span><i className="bi bi-trash-fill ms-auto"></i></div></NavDropdown.Item>
                                                                <NavDropdown.Item ><div className="d-flex" onClick={() => {
                                                                    setShowModalCreateUpdate(true)
                                                                    setModalAction(update.id)
                                                                    setVersion({
                                                                        ...version,
                                                                        versionNumber: update.target_version
                                                                    })
                                                                }}><span>Add note</span><i className="bi bi-plus-lg ms-auto"></i></div></NavDropdown.Item>
                                                            </NavDropdown> :
                                                            <Button variant="danger" className="btn-sm border-0" onClick={() => { deleteUpdate(update.id) }}><i className="bi bi-trash-fill"></i></Button>
                                                    }

                                                </div>
                                            </div>
                                            <div>
                                                <div id="updateId" className="border-bottom p-2">
                                                    <span>Update ID: {update.id}</span>
                                                </div>
                                                <div id="updateInfo" className="d-flex flex-column p-2 border-bottom p-2">
                                                    <span>Author: {update.author.name + " " + update.author.surname}</span>
                                                    <span>Creation date: {moment(update.create_date).format("DD-MM-YYYY h:mm:ss")}</span>
                                                </div>
                                                {update.started_by ? <div id="updateInfoStarted" className="d-flex flex-column p-2 border-bottom p-2">
                                                    <span>Stared by: {update.started_by.name + " " + update.started_by.surname}</span>
                                                    <span>Start date: {moment(update.start_date).format("DD-MM-YYYY h:mm:ss")}</span>
                                                </div> : null}
                                                {update.published_by ? <div id="updateInfoPublished" className="d-flex flex-column p-2 border-bottom p-2">
                                                    <span>Published by: {update.published_by.name + " " + update.published_by.surname}</span>
                                                    <span>Publish date: {moment(update.publish_date).format("DD-MM-YYYY h:mm:ss")}</span>
                                                </div> : null}

                                                <div id="changeNotes" className="d-flex flex-column">
                                                    <div className="d-flex p-2">
                                                        <div className="d-flex">
                                                            <h5 className="me-2">Change notes</h5>
                                                        </div>
                                                    </div>
                                                    <ul>
                                                        {update.notes.map(note => {
                                                            return (
                                                                <li key={note.id}>
                                                                    <div className="d-flex justify-content-between mb-2">
                                                                        {update.status === "IN_DEVELOPMENT" ? <span className={note.marked_as_done ? "text-decoration-line-through" : null} onClick={() => {
                                                                            note.marked_as_done ? markAsToDo(update.id, note.id) : markAsDone(update.id, note.id)
                                                                        }}>{note.content_note}</span> : <span>{note.content_note}</span>}

                                                                        {
                                                                            update.status !== "PUBLISHED" ?
                                                                                <div className="align-self-center">
                                                                                    <Button variant="danger" className="btn-sm border-0" onClick={() => deleteChangeNote(note.id, update.id)}><i className="bi bi-trash-fill"></i></Button>
                                                                                </div> : null
                                                                        }
                                                                    </div>
                                                                </li>
                                                            )
                                                        })
                                                        }
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    }) : null
                }
            </Row >
            <Row>
                <Col className="p-2 d-flex justify-content-between">
                    <h1 className="me-2">Groups</h1>
                    {projectInfo && projectInfo.groups.length > 0 ? <h1><i className={showGroups ? "bi bi-eye-slash-fill" : "bi bi-eye-fill"} onClick={() => { setShowGroups(!showGroups) }}></i></h1> : null}
                </Col>
            </Row>
            <Row className={showGroups ? null : "visually-hidden"}>
                {
                    projectInfo && projectInfo.groups.length > 0 ? projectInfo.groups.map(group => {
                        return (
                            <Col className="p-2" xs={6} md={4} lg={3} key={group.id}>
                                <Card className="border-top-0 border-start-0 border-bottom-0 border-dark border-5">
                                    <Card.Body>
                                        <Card.Text>
                                            <span className="fw-bold fs-5">{group.name}</span>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    }) : null
                }

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
            <Modal centered show={showModalCreateUpdate} fullscreen={false} onHide={() => {
                closeCreateUpdateModal()
            }} size="lg">
                <Form noValidate onSubmit={(event) => { modalAction === "POST" ? scheduleUpdate(event) : addChangeNotes(event) }}>
                    <Modal.Header closeButton>
                        <Modal.Title>{modalAction === "POST" ? "Schedule update" : "Add change note"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="modalScrollableScheduleUpdate">
                        <FloatingLabel
                            controlId="Version"
                            label="Update version"
                            className="mb-3"

                        >
                            {modalAction !== "POST" ?
                                <Form.Control type="text" placeholder="Update version" value={version.versionNumber ? version.versionNumber : ""} onChange={(event) => { setVersion({ ...version, versionNumber: event.target.value }) }} isInvalid={!!version.error} disabled /> :
                                <Form.Control type="text" placeholder="Update version" value={version.versionNumber ? version.versionNumber : ""} onChange={(event) => { setVersion({ ...version, versionNumber: event.target.value }) }} isInvalid={!!version.error} />}
                            <Form.Control.Feedback type="invalid">{version.error}</Form.Control.Feedback>
                        </FloatingLabel>
                        {
                            changeNotes.map((changeNote, index) => {
                                return (
                                    <div className="d-flex justify-content-between mb-3" key={index}>
                                        <FloatingLabel
                                            controlId="Change note"
                                            label="Change note"
                                            className="w-100 me-2"
                                        >
                                            <Form.Control type="text" placeholder="Change note" isInvalid={!!changeNote.error} value={changeNote.note ? changeNote.note : ""}
                                                onChange={(event) => {
                                                    setChangeNotes(changeNotes.map((changeNote, i) => {
                                                        if (i === index)
                                                            return {
                                                                ...changeNote,
                                                                note: event.target.value
                                                            }
                                                        else return changeNote
                                                    }))
                                                }} />
                                            <Form.Control.Feedback type="invalid">{changeNote.error}</Form.Control.Feedback>
                                        </FloatingLabel>
                                        <Button variant="dark" className="h-50 align-self-center" onClick={() => { if (changeNotes.length > 1) setChangeNotes(changeNotes.filter((changeNote, i) => index !== i)) }}><i className="bi bi-dash"></i></Button>
                                    </div>
                                )
                            })
                        }
                        {modalAction === "POST" ? <div className="w-100 d-flex justify-content-end">
                            <Button variant="dark" onClick={() => { setChangeNotes([...changeNotes, { note: null, error: null }]) }}><i className="bi bi-plus"></i></Button>
                        </div> : null}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="dark" className="modalBtn" type="submit">{modalAction === "POST" ? "Schedule" : "Add note"}</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </Container >
    );
}

export default Project;