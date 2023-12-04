import React, { useEffect } from "react";
import { useStateWithCallbackLazy } from "use-state-with-callback";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { NavDropdown } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { FloatingLabel } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import axios from "axios";
import paths from "../paths";
import requests from "../requests";

const Group = () => {
    const [showMembers, setShowMembers] = useState(true)
    const params = useParams()
    const id = localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE_ID)
    const token = localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE_TOKEN)
    const [groupInfo, setGroupInfo] = useStateWithCallbackLazy()
    const [admin, setAdmin] = useState(false)
    const [mantainer, setMantainer] = useState(false)
    const [showModalEmails, setShowModalEmails] = useState(false)
    const [memberEmails, setMemberEmails] = useState([{ email: "", errorMessage: null }])
    const [showModalAdmin, setShowModalAdmin] = useState(false)
    const [selectedMember, setSelectedMember] = useState()
    const [showErrorAdmin, setShowErrorAdmin] = useState(false)
    const [showDeleteGroup, setShowDeleteGroup] = useState(false)

    useEffect(() => {
        getGroup()
    }, [])

    const deleteGroup = () => {
        axios.delete(requests.groups.deleteGroup(params.groupID), { headers: { "id": id, "token": token } }).then(res => {
            window.location.href = paths.projects;
        })
    }

    const leaveGroup = (event) => {
        event.preventDefault()
        event.stopPropagation()
        if (!selectedMember && groupInfo.group_members.filter(member => member.invitation_status === "JOINED" && member.role !== "ADMIN").length !== 0 && admin)
            setShowErrorAdmin(true)
        else {
            setShowErrorAdmin(false)
            axios.delete(requests.groups.leaveGroup(params.groupID), { headers: { "token": token, "id": id, 'Content-Type': 'text/plain' }, data: selectedMember }).then(res => {
                window.location.href = paths.projects;
            })
        }
    }

    const addMembers = (event) => {
        event.preventDefault()
        event.stopPropagation()
        var error = false
        const newMemberEmails = memberEmails.map((member) => {
            if (member.email === "" || member.email === "") {
                error = true
                return {
                    ...member,
                    errorMessage: "Empty field"
                }
            } else if (!member.email.includes("@")) {
                error = true
                return {
                    ...member,
                    errorMessage: "Incorrect value"
                }
            } else {
                return {
                    ...member,
                    errorMessage: null
                }
            }
        })
        setMemberEmails(newMemberEmails)
        if (!error) {
            const data = memberEmails.map((member) => {
                return member.email
            })
            axios.put(requests.groups.addMembers(params.groupID), data, { headers: { "token": token, "id": id } }).then(res => {
                setMemberEmails([{ email: "", errorMessage: null }])
                setShowModalEmails(false)
                getGroup()
            })
        }

    }

    const removeMember = (memberID) => {
        axios.delete(requests.groups.removeMember(params.groupID), {
            headers: {
                "token": token, "id": id, 'Content-Type': 'text/plain'
            }, data: memberID
        }).then(res => {
            getGroup()
        })
    }

    const changeRole = (newRole, memberID) => {
        const data = {
            id: memberID,
            role: newRole
        }
        axios.patch(requests.groups.changeMemberRole(params.groupID), data, { headers: { "token": token, "id": id } }).then(res => {
            getGroup()
        })
    }

    const getGroup = () => {
        axios.get(requests.groups.getOne(params.groupID), { headers: { "token": token, "id": id } }).then(res => {
            setGroupInfo(res.data, (groupInfo) => {
                isAdmin(groupInfo)
                isMantainer(groupInfo)
            })
        })
    }

    const isAdmin = (groupInfo) => {
        if (groupInfo) {
            var memberObject = groupInfo.group_members.find(member => member.id === id && member.role === "ADMIN")
            memberObject ? setAdmin(true) : setAdmin(false)
        }
    }

    const isMantainer = (groupInfo) => {
        if (groupInfo) {
            var memberObject = groupInfo.group_members.find(member => member.id === id && member.role === "MAINTAINER")
            memberObject ? setMantainer(true) : setMantainer(false)
        }
    }

    return (
        groupInfo != null ? <Container>
            {admin || mantainer ? <Button variant="dark" className="position-fixed speed-dial" size="lg" onClick={() => { setShowModalEmails(true) }}><i className="bi bi-plus-lg"></i></Button> : null}
            <Row className='mt-2 mt-md-5'>
                <Col className="p-2">
                    <div className="d-flex justify-content-between">
                        <div className="d-flex">
                            <h1 className="align-middle">{groupInfo.name}</h1>
                        </div>
                        <div className="d-flex">
                            <h1><i onClick={(event) => admin ? setShowModalAdmin(true) : leaveGroup(event)} className="fa-solid fa-right-from-bracket align-middle fa-rotate-180"></i></h1>
                            {admin ? <h1><i className="bi bi-trash-fill text-danger ms-2 align-middle" onClick={() => setShowDeleteGroup(true)}></i></h1> : null}
                        </div>
                    </div>
                </Col>
            </Row >
            <Row>
                <Col className="p-2">
                    <Card className="border-0">
                        <Card.Body>
                            <Card.Text>
                                {groupInfo.group_description}
                            </Card.Text>
                            <Card.Footer className="d-flex bd-highlight">
                                <span className="ms-auto p-2 bd-highlight">{groupInfo.author.name + " " + groupInfo.author.surname}</span>
                            </Card.Footer>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col className="p-2 d-flex justify-content-between">
                    <h1>Members</h1>
                    <h1><i className={showMembers ? "bi bi-eye-slash-fill align-middle" : "bi bi-eye-fill align-middle"} onClick={() => { setShowMembers(!showMembers) }}></i></h1>
                </Col>
            </Row>
            <Row className={showMembers ? null : "visually-hidden"}>
                {
                    groupInfo.group_members.map((member) => {
                        return <Col className="p-2" xs={12} md={6} lg={6} key={member.id}>
                            <Card className="border-0 h-100">
                                <Card.Body className="">
                                    <div className="d-flex justify-content-between align-self-center">
                                        {member.invitation_status === "PENDING" && admin ? <div className="avatar-box d-flex position-relative align-self-center">
                                            <span className="position-absolute top-0 start-100 translate-middle p-1 bg-warning border border-light rounded-circle">
                                                <span className="visually-hidden">New alerts</span>
                                            </span>
                                            <img className="rounded avatar" src={requests.url + member.profile_pic} alt="Avatar" style={{ width: 45, height: 45 }} />
                                        </div> : <img className="rounded avatar align-self-center" src={requests.url + member.profile_pic} alt="Avatar" style={{ width: 45, height: 45 }} />
                                        }
                                        <span className="fs-5 align-self-center">{member.name + " " + member.surname}</span>
                                        {member.role === "ADMIN" ? <span className="fs-5 align-self-center text-danger">{member.role}</span> : <span className="fs-5 align-self-center">{member.role}</span>}
                                        {admin && member.id !== id && member.invitation_status !== "PENDING" ? <NavDropdown className="align-self-center" menuVariant="dark" title={<i className="bi bi-three-dots-vertical fs-6"></i>}>
                                            <NavDropdown.Item onClick={(event) => { changeRole("ADMIN", member.id) }}>Admin</NavDropdown.Item>
                                            <NavDropdown.Item onClick={(event) => { changeRole("MAINTAINER", member.id) }}>Maintainer</NavDropdown.Item>
                                            <NavDropdown.Item onClick={(event) => { changeRole("DEVELOPER", member.id) }}>Developer</NavDropdown.Item>
                                            <NavDropdown.Divider></NavDropdown.Divider>
                                            <NavDropdown.Item onClick={(event) => { removeMember(member.id) }}>Remove</NavDropdown.Item>
                                        </NavDropdown> : null}
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    })
                }
            </Row>
            <Modal centered show={showModalEmails} fullscreen={false} onHide={() => {
                setMemberEmails([{ email: "", errorMessage: null }])
                setShowModalEmails(false)
            }} size="lg">
                <Form noValidate onSubmit={(event) => addMembers(event)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add members</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
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
                                        <Button variant="dark" onClick={() => { setMemberEmails(memberEmails.filter((memberEmail, i) => { return index !== i })) }} className="h-50 align-self-center"><i className="bi bi-person-x-fill"></i></Button>
                                    </div>
                                )
                            })
                        }
                        <div className="w-100 d-flex justify-content-end">
                            <Button variant="dark" onClick={(e) => {
                                setMemberEmails([...memberEmails, { email: "", errorMessage: null }])
                            }}><i className="bi bi-person-fill-add"></i></Button>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="dark" className="modalBtn" type="submit">Add members</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            <Modal centered show={showModalAdmin} fullscreen={false} onHide={() => {
                setShowModalAdmin(false)
            }} size="lg">
                <Form noValidate onSubmit={(event) => { leaveGroup(event) }}>
                    <Modal.Header closeButton>
                        <Modal.Title>Select new Admin</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Alert show={showErrorAdmin} variant="danger">You must choose a new admin</Alert>
                        {
                            groupInfo.group_members.filter(member => member.invitation_status === "JOINED" && member.role !== "ADMIN").length !== 0 && admin ?
                                groupInfo.group_members.map((member, index) => {
                                    if (member.invitation_status === "JOINED" && member.role !== "ADMIN")
                                        return (
                                            <div className="w-100 d-flex justify-content-start bg-white p-2 rounded-1 mb-2" key={member.id}>
                                                <Form.Check className="checkbox-lg align-self-center me-3" type="radio" value={member.id} name="group1" checked={selectedMember === member.id} onChange={(event) => { setSelectedMember(event.currentTarget.value) }}></Form.Check>
                                                <div className="w-100 d-flex">
                                                    <div className="avatar-box d-flex position-relative align-self-center me-3">
                                                        <img className="rounded avatar" src={member.profile_pic} alt="Avatar" style={{ width: 45, height: 45 }} />
                                                    </div>
                                                    <span className="align-self-center align-self-start w-50">{member.name} {member.surname}</span>
                                                    <span className="align-self-center align-self-start w-50">{member.email}</span>
                                                </div>
                                            </div>
                                        )
                                    return null
                                }) : <p className="text-center">This group doesn't have members, if you leave this it will be removed</p>
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="dark" className="modalBtn" type="submit">Leave group</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            <Modal show={showDeleteGroup} onHide={() => { setShowDeleteGroup(false) }}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm delete Group</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    If you confirm this action, the group and all its information will be deleted and no more recoverable
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" className="modalBtn" onClick={() => { deleteGroup() }} >Confirm</Button>
                </Modal.Footer>
            </Modal>
        </Container > : null
    );
}

export default Group;