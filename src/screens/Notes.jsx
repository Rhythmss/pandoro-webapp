import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { FloatingLabel } from "react-bootstrap";
import { Toast } from "react-bootstrap";
import requests from "../requests";
import axios from "axios";

const Notes = () => {
    const [showModal, setShowModal] = useState(false);
    const [showCheck, setShowCheck] = useState(false);
    const [noteText, setNoteText] = useState();
    const id = localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE_ID)
    const token = localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE_TOKEN)
    const [toast, setToast] = useState({ message: null, show: false })
    const [errorMessage, setErrorMessage] = useState()
    const [noteList, setNoteList] = useState();

    useEffect(() => {
        getNotesList()
    }, [])

    const getNotesList = () => {
        axios.get(requests.notes.list, { headers: { "id": id, "token": token } }).then((res) => {
            res.data = res.data.sort(
                (objA, objB) => new Date(objB.creation * 1000) - new Date(objA.creation * 1000),
            );
            setNoteList(res.data)
        })
    }

    const createNote = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (noteText === "" || noteText == null) {
            setErrorMessage("Content field" + process.env.REACT_APP_FIELD_EMPTY)
        }
        else {
            axios.post(requests.notes.create, noteText, { headers: { "id": id, "token": token, 'Content-Type': 'text/plain' } }).then(res => {
                setShowModal(false)
                setNoteText()
                if (!res.data.success) {
                    setToast({ message: res.data.error, show: true });
                } else {
                    setToast({ message: "Note has been created successfull", show: true });
                }
                getNotesList();
            }
            )
        }
    }

    const handleCheckBox = (event) => {
        const checkbox = event.target;
        const noteID = checkbox.name;
        checkbox.checked ? markNoteAsDone(noteID) : markNoteAsToDo(noteID)
    }

    const markNoteAsDone = (noteID) => {
        axios.patch(requests.notes.markAsDone(noteID), null, { headers: { "token": token, "id": id, 'Content-Type': 'text/plain' } })
    }

    const markNoteAsToDo = (noteID) => {
        axios.patch(requests.notes.markAsToDo(noteID), null, { headers: { "token": token, "id": id, 'Content-Type': 'text/plain' } })
    }

    const deleteNote = (event) => {
        axios.delete(requests.notes.deleteNote(event.currentTarget.name), { headers: { "token": token, "id": id, 'Content-Type': 'text/plain' } }).then((res) => {

        })
    }

    return (
        <Container>
            <Button variant="dark" className="position-fixed speed-dial" size="lg" onClick={() => { setShowModal(true) }}><i className="bi bi-plus-lg"></i></Button>
            <Row className="mt-2 mt-md-5">
                <Col className="d-flex justify-content-between">
                    <div className="align-self-center">
                        <h1>Notes</h1>
                    </div>
                    <div className="align-self-center">
                        <Button variant="dark" size="lg" onClick={() => { setShowCheck(!showCheck) }}><i className="bi bi-pencil-square"></i></Button>
                    </div>
                </Col>
            </Row>
            <Row xs={1} className="mt-2 mt-md-3">{
                noteList ? noteList.map((note, index) => {
                    return <Col className="p-2" key={note.id}>
                        <Card className="border border-0">
                            <Card.Body className="d-flex align-items-start">
                                <div className="d-flex justify-content-between w-100">
                                    <div className="d-flex justify-content-start w-75">
                                        <div className={showCheck ? "align-self-center" : "visually-hidden"}>
                                            <Form.Check
                                                inline
                                                name={note.id}
                                                type="checkbox"
                                                className="checkbox-xl"
                                                checked={note.marked_as_done}
                                                onChange={(event) => {
                                                    const newNoteList = noteList.map((note, i) => {
                                                        if (index === i) {
                                                            return {
                                                                ...note,
                                                                marked_as_done: !note.marked_as_done
                                                            }
                                                        } else {
                                                            return note
                                                        }
                                                    })
                                                    setNoteList(newNoteList)
                                                    handleCheckBox(event)
                                                }}
                                            />
                                        </div>
                                        {note.marked_as_done ? <div className="fs-5 w-75 text-decoration-line-through" >{note.content_note}</div> : <div className="fs-5 w-75" >{note.content_note}</div>}
                                    </div>
                                    <div>
                                        <Button variant="danger" className="btn-sm" name={note.id} onClick={(event) => {
                                            setNoteList((noteList) => noteList.filter((n) => n.id !== note.id))
                                            deleteNote(event)
                                        }}><i className="bi bi-trash-fill"></i></Button>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                }) : null
            }
            </Row >
            <Modal centered show={showModal} fullscreen={false} onHide={() => setShowModal(false)} size="lg">
                <Form noValidate onSubmit={createNote}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Notes</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FloatingLabel controlId="floatingTextarea2" label="Content">
                            <Form.Control
                                as="textarea"
                                style={{ height: '300px' }}
                                placeholder="Content"
                                value={noteText}
                                onChange={(e) => { setNoteText(e.target.value) }}
                                isInvalid={!!errorMessage}
                            />
                            <Form.Control.Feedback type="invalid">{errorMessage}</Form.Control.Feedback>
                        </FloatingLabel>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="dark" className="modalBtn" type="submit">Add notes</Button>
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

export default Notes;