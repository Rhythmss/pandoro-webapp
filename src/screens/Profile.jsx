import React, { useEffect } from "react";
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
import changelogsText from "../changelogsText";

const Profile = () => {
    const id = localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE_ID)
    const token = localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE_TOKEN)
    const name = localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE_NAME)
    const surname = localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE_SURNAME)
    const [imageUrl, setImageUrl] = useState(localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE_IMAGE_URL))
    const [email, setEmail] = useState(localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE_EMAIL))
    const [editModal, setEditModal] = useState({ show: false, editValue: null, target: null, errorMessage: null })
    const [toast, setToast] = useState({ message: null, show: false })
    const [changelogs, setChangelogs] = useState([]);
    const [groups, setGroups] = useState([]);
    const [showModalCreateGroup, setShowModalCreateGroup] = useState(false)
    const [memberEmails, setMemberEmails] = useState([{ email: "", errorMessage: null }])
    const [groupInfo, setGroupInfo] = useState({ name: "", group_description: "", nameError: null, group_descriptionError: null })

    useEffect(() => {
        getChangeLogs()
        getGroups()
    }, [])

    const acceptGroupInvitation = (groupID) => {
        axios.patch(requests.groups.acceptGroupInvitation(groupID), null, { headers: { "token": token, "id": id } }).then(res => {
            getChangeLogs()
            getGroups()
        })
    }

    const declineGroupInvitation = (groupID) => {
        axios.delete(requests.groups.declineGroupInvitation(groupID), { headers: { "token": token, "id": id } }).then(res => {
            getChangeLogs()
            getGroups()
        })
    }

    const closeCreateGroupModal = () => {
        setMemberEmails([{ email: "", errorMessage: null }])
        setGroupInfo({ name: "", group_description: "", nameError: null, group_descriptionError: null })
        setShowModalCreateGroup(false)
    }

    const createGroup = (event) => {
        event.preventDefault()
        event.stopPropagation()
        if (checkErrorGroupCreation()) {
            const data = { name: groupInfo.name, group_description: groupInfo.group_description, members: memberEmails.map((member) => { return member.email }) }
            axios.post(requests.groups.createGroup, data, { headers: { "token": token, "id": id } }).then(res => {
                if (res.data.success) {
                    closeCreateGroupModal()
                    getGroups()
                    setToast({ show: true, message: "The group has been created" })
                } else {
                    closeCreateGroupModal()
                    setToast({ show: true, message: res.data.error })
                }
            })
        }
    }

    const checkErrorGroupCreation = () => {
        var check = true
        var nameError = null
        var group_descriptionError = null
        if (groupInfo.name === "" || !groupInfo.name) {
            nameError = "Group name field cannot be empty"
            check = false
        }
        if (groupInfo.group_description === "" || !groupInfo.group_description) {
            group_descriptionError = "Group name field cannot be empty"
            check = false
        }
        setGroupInfo({ ...groupInfo, group_descriptionError: group_descriptionError, nameError: nameError })
        if (memberEmails.filter(member => member.email === "" || !member.email || !member.email.includes("@")).length !== 0) {
            setMemberEmails(
                memberEmails.map((member) => {
                    if (member.email === "" || !member.email || !member.email.includes("@"))
                        return {
                            ...member,
                            errorMessage: "Email field is wrong"
                        }
                    return {
                        ...member,
                        errorMessage: null
                    }
                })
            )
            check = false
        }
        return check
    }

    const getGroups = () => {
        axios.get(requests.groups.list, { headers: { "token": token, "id": id } }).then(res => {
            setGroups(res.data)
        })
    }

    const getChangeLogs = () => {
        axios.get(requests.changelogs.list, { headers: { "token": token, "id": id } }).then(res => {
            setChangelogs(res.data)
        })
    }

    const deleteChangelog = (changelogID) => {
        axios.delete(requests.changelogs.deleteChangelog(changelogID), { headers: { "token": token, "id": id } }).then(res => {
            getChangeLogs();
        })
    }

    const handleChangeSubmit = (event) => {
        event.preventDefault()
        event.stopPropagation()
        setEditModal({ ...editModal, errorMessage: null })
        if (checkError()) {
            if (editModal.target === "Email")
                var url = requests.users.changeEmail
            else
                var url = requests.users.changePassword
            axios.patch(url, editModal.editValue, { headers: { "token": token, 'Content-Type': 'text/plain' } }).then(res => {
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
            <Button variant="dark" className="position-fixed speed-dial" size="lg" onClick={() => { setShowModalCreateGroup(true) }}><i className="bi bi-plus-lg"></i></Button>
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
                            <div className="overflow-scroll boxNotification">
                                {
                                    changelogs ? changelogs.map((changelog) => {
                                        console.log(changelog)
                                        return (
                                            <div className="border-0 border-bottom d-flex justify-content-between p-2" key={changelog.id}>
                                                <div className="w-75">
                                                    <h6>{changelog.title}</h6>
                                                    <span>{changelogsText(changelog)}</span><br />
                                                    {changelog.changelog_event === "INVITED_GROUP" ? <div className="mt-2"><Button onClick={() => { acceptGroupInvitation(changelog.group.id) }} variant="success border-0" className="me-2"><i className="bi bi-check"></i>Accept</Button><Button onClick={() => { declineGroupInvitation(changelog.group.id) }} variant="danger" className="border-0"><i className="bi bi-x"></i>Decline</Button></div> : null}
                                                </div>
                                                <div className="d-flex">
                                                    <Button variant="danger" className="btn-sm border-0 align-self-center" onClick={() => {
                                                        deleteChangelog(changelog.id)
                                                    }}><i className="bi bi-trash-fill"></i></Button>
                                                </div>
                                            </div>
                                        )
                                    }) : null
                                }
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className='mt-2 mt-md-5'>
                <Col><h1>Groups</h1></Col>
            </Row>
            <Row className='mt-2 mt-md-3 mb-5'>
                {
                    groups ? groups.map((group) => {
                        console.log(group)
                        const role = group.group_members.find(member => member.id === id).role
                        return (
                            <Col className="p-2" xs={12} md={4} lg={3} key={group.id}>
                                <Card className="border-top-0 border-start-0 border-bottom-0 border-dark border-5">
                                    <Card.Body>
                                        <div className="d-flex justify-content-between">
                                            <span className="fw-bold fs-5 w-50">{group.name}</span>
                                            {
                                                role === "ADMIN" ? <span className="fs-6 text-danger w-50 align-self-center d-flex justify-content-end">{role}</span> : <span className="fs-6 w-50 align-self-center d-flex justify-content-end">{role}</span>
                                            }

                                        </div>
                                        <a href={"/group/" + group.id} className="stretched-link groupLink">Go somewhere</a>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    }) : null
                }
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
            <Modal centered show={showModalCreateGroup} fullscreen={false} onHide={() => {
                closeCreateGroupModal()
            }} size="lg">
                <Form noValidate onSubmit={(event) => createGroup(event)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create group</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="modalScrollable">
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Group Name"
                            className="mb-3"
                        >
                            <Form.Control type="text" placeholder="text" value={groupInfo.name} onChange={(e) => { setGroupInfo({ ...groupInfo, name: e.currentTarget.value }) }} isInvalid={!!groupInfo.nameError} />
                            <Form.Control.Feedback type="invalid">{groupInfo.nameError}</Form.Control.Feedback>
                        </FloatingLabel>
                        <FloatingLabel className="mb-3" controlId="floatingTextarea" label="Description">
                            <Form.Control
                                as="textarea"
                                style={{ height: '200px' }}
                                placeholder="Description"
                                value={groupInfo.group_description}
                                onChange={(e) => { setGroupInfo({ ...groupInfo, group_description: e.currentTarget.value }) }}
                                isInvalid={!!groupInfo.group_descriptionError}
                            />
                            <Form.Control.Feedback type="invalid">{groupInfo.group_descriptionError}</Form.Control.Feedback>
                        </FloatingLabel>
                        {
                            memberEmails.map((member, index) => {
                                return (
                                    <div key={index} className="d-flex justify-content-between mb-2">
                                        <FloatingLabel controlId="floatingTextarea2" label="Member email" className="w-100 me-2">
                                            <Form.Control
                                                placeholder="Member email"
                                                value={member.email}
                                                onChange={(e) => {
                                                    const newMemberEmails = memberEmails.map((member, i) => {
                                                        if (i === index) {
                                                            return {
                                                                ...member,
                                                                email: e.currentTarget.value
                                                            };
                                                        } else {
                                                            return {
                                                                ...member
                                                            };
                                                        }
                                                    });
                                                    setMemberEmails(newMemberEmails)
                                                }}
                                                isInvalid={!!member.errorMessage}
                                            />
                                            <Form.Control.Feedback type="invalid">{member.errorMessage}</Form.Control.Feedback>
                                        </FloatingLabel>
                                        <Button variant="dark" onClick={() => { setMemberEmails(memberEmails.filter((memberEmail, i) => { return index !== i })) }}><i className="bi bi-person-x-fill"></i></Button>
                                    </div>
                                )
                            })
                        }
                        <Button variant="dark" className="w-25" onClick={(e) => {
                            setMemberEmails([...memberEmails, { email: "", errorMessage: null }])
                        }}><i className="bi bi-person-fill-add"></i></Button>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="dark" className="modalBtn" type="submit">Create</Button>
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