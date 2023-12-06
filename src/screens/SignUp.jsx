import React from "react";
import { useState } from "react";
import { Alert, Button, Container } from "react-bootstrap";
import { FloatingLabel } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import axios from "axios";
import requests from "../requests";
import paths from "../paths";

const SignUp = () => {
    const [name, setName] = useState(null);
    const [surname, setSurname] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [serverSecret, setServerSecret] = useState(null);
    const [errors, setErrors] = useState({});
    const [alertMessage, setAlertMessage] = useState(false);
    const userId = localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE_ID);

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setErrors({});
        const newErrors = checkError();
        if (Object.keys(newErrors).length > 0) {
            setErrors({
                ...newErrors
            })
        } else {
            const data = {
                name: name,
                surname: surname,
                email: email,
                password: password,
                server_secret: serverSecret
            }
            axios.post(requests.users.signUp, data).then(res => {
                const response = res.data;
                if (!response.success) {
                    setAlertMessage(response.error);
                } else {
                    setAlertMessage(null);
                    localStorage.setItem(process.env.REACT_APP_LOCALSTORAGE_TOKEN, response.data.token);
                    localStorage.setItem(process.env.REACT_APP_LOCALSTORAGE_ID, response.data.id);
                    localStorage.setItem(process.env.REACT_APP_LOCALSTORAGE_IMAGE_URL, requests.url + response.data.profile_pic);
                    localStorage.setItem(process.env.REACT_APP_LOCALSTORAGE_EMAIL, email);
                    localStorage.setItem(process.env.REACT_APP_LOCALSTORAGE_NAME, name);
                    localStorage.setItem(process.env.REACT_APP_LOCALSTORAGE_SURNAME, surname);
                    window.location.href = paths.projects;
                }
            }).catch(() => {
                setAlertMessage(process.env.REACT_APP_WRONG_PROCEDURE);
            })
        }
    }

    const checkError = () => {
        const newErrors = {};
        if (!name) {
            newErrors.name = "Field name " + process.env.REACT_APP_FIELD_EMPTY;
        }
        if (!surname) {
            newErrors.surname = "Field surname " + process.env.REACT_APP_FIELD_EMPTY;
        }
        if (!email) {
            newErrors.email = "Field email " + process.env.REACT_APP_FIELD_EMPTY;
        }
        if (email)
            if (!email.includes("@")) {
                newErrors.email = "Wrong email field";
            }
        if (!password) {
            newErrors.password = "Field password " + process.env.REACT_APP_FIELD_EMPTY;
        }
        if (!serverSecret) {
            newErrors.serverSecret = "Field server secret " + process.env.REACT_APP_FIELD_EMPTY;
        }
        return newErrors;
    }

    if (userId) {
        return <Navigate to={paths.projects} />
    } else {
        return (
            <Container fluid className="vh-100 d-flex justify-content-center bg-dark">
                <div className="align-self-center bg-light p-5 rounded-3 shadow-none w-sm-100 w-md-75 w-lg-75 w-xl-25">
                    <h5 className="d-flex justify-content-center mb-4">Sign up to Pandoro</h5>
                    <Alert variant="danger" show={!!alertMessage}>
                        {alertMessage}
                    </Alert>
                    <Form className="mb-4" onSubmit={handleSubmit} noValidate>
                        <InputGroup hasValidation>
                            <FloatingLabel
                                controlId="floatingInputName"
                                label="Name"
                                className="mb-3"
                                value={name}
                                onChange={(e) => { setName(e.target.value) }}
                            >
                                <Form.Control type="text" placeholder="Name" isInvalid={!!errors.name} />
                                <Form.Control.Feedback type="invalid">
                                    {errors.name}
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </InputGroup>


                        <FloatingLabel
                            controlId="floatingInputSurname"
                            label="Surname"
                            className="mb-3"
                            value={surname}
                            onChange={(e) => { setSurname(e.target.value) }}
                        >
                            <Form.Control type="text" placeholder="Surname" isInvalid={!!errors.surname} />
                            <Form.Control.Feedback type="invalid">
                                {errors.surname}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="floatingInputEmail"
                            label="Email address"
                            className="mb-3"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                        >
                            <Form.Control type="email" placeholder="email" isInvalid={!!errors.email} />
                            <Form.Control.Feedback type="invalid">
                                {errors.email}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="floatingInputPassword"
                            label="Password"
                            className="mb-3"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                        >
                            <Form.Control type="password" placeholder="password" isInvalid={!!errors.password} />
                            <Form.Control.Feedback type="invalid">
                                {errors.password}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="floatingInputPassword"
                            label="Server secret"
                            className="mb-3"
                            value={password}
                            onChange={(e) => { setServerSecret(e.target.value) }}
                        >
                            <Form.Control type="password" placeholder="Server secret" isInvalid={!!errors.serverSecret} />
                            <Form.Control.Feedback type="invalid">
                                {errors.serverSecret}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                        <Button variant="dark" size="lg" className="w-100" type="submit">Sign up</Button>
                    </Form>
                    <span className="d-flex justify-content-center">Have an account?&nbsp;<a href={paths.signIn}>Sign in</a></span>
                </div>
            </Container>
        );
    }
}

export default SignUp;