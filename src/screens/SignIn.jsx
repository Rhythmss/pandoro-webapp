import React from "react";
import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { FloatingLabel } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import paths from "../paths";
import requests from "../requests";
import axios from "axios";

const SignIn = () => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
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
                email: email,
                password: password
            }
            axios.post(requests.users.signIn, data).then(res => {
                const response = res.data;
                if (!response.success) {
                    setAlertMessage(response.error);
                } else {
                    setAlertMessage(null);
                    localStorage.setItem(process.env.REACT_APP_LOCALSTORAGE_TOKEN, response.data.token);
                    localStorage.setItem(process.env.REACT_APP_LOCALSTORAGE_ID, response.data.id);
                    localStorage.setItem(process.env.REACT_APP_LOCALSTORAGE_IMAGE_URL, requests.url + response.data.profile_pic);
                    localStorage.setItem(process.env.REACT_APP_LOCALSTORAGE_EMAIL, email);
                    localStorage.setItem(process.env.REACT_APP_LOCALSTORAGE_NAME, response.data.name);
                    localStorage.setItem(process.env.REACT_APP_LOCALSTORAGE_SURNAME, response.data.surname);
                    window.location.href = paths.projects;
                }
            }).catch(() => {
                setAlertMessage(process.env.REACT_APP_WRONG_PROCEDURE);
            })
        }
    }

    const checkError = () => {
        const newErrors = {};
        if (!email.includes("@")) {
            newErrors.email = "Wrong email field";
        }
        if (!email) {
            newErrors.email = "Field email " + process.env.REACT_APP_FIELD_EMPTY;
        }
        if (!password) {
            newErrors.password = "Field password " + process.env.REACT_APP_FIELD_EMPTY;
        }
        return newErrors;
    }

    if (userId) {
        return <Navigate to={paths.projects} />
    }
    return (
        <Container fluid className="vh-100 d-flex justify-content-center bg-dark">
            <div className="align-self-center bg-light p-5 rounded-3 shadow-none w-sm-100 w-md-75 w-lg-75 w-xl-25">
                <h5 className="d-flex justify-content-center mb-4">Sign in to Pandoro</h5>
                <Alert variant="danger" show={!!alertMessage}>
                    {alertMessage}
                </Alert>
                <Form className="mb-4" onSubmit={handleSubmit} noValidate>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Email"
                        className="mb-3"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                    >
                        <Form.Control type="email" placeholder="Email" isInvalid={!!errors.email} />
                        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Password"
                        className="mb-3"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                    >
                        <Form.Control type="password" placeholder="password" isInvalid={!!errors.password} />
                        <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                    </FloatingLabel>
                    <Button variant="dark" size="lg" className="w-100" type="submit">Sign in</Button>
                </Form>
                <span className="d-flex justify-content-center">New to Pandoro?&nbsp;<a href={paths.signUp}>Create an account</a></span>
            </div>
        </Container >

    );
}

export default SignIn;
