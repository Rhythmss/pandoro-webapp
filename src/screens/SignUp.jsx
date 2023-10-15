import React from "react";
import { Button, Container } from "react-bootstrap";
import { FloatingLabel } from "react-bootstrap";
import { Form } from "react-bootstrap";

const SignUp = () => {
    return (
        <Container fluid className="vh-100 d-flex justify-content-center bg-dark">
            <div className="align-self-center bg-light p-5 rounded-3 shadow-none w-sm-100 w-md-75 w-lg-75 w-xl-25">
                <h5 className="d-flex justify-content-center mb-4">Sign up to Pandoro</h5>
                <Form className="mb-4">
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Username"
                        className="mb-3"
                    >
                        <Form.Control type="text" placeholder="Username" />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Email address"
                        className="mb-3"
                    >
                        <Form.Control type="email" placeholder="email" />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Password"
                        className="mb-3"
                    >
                        <Form.Control type="password" placeholder="password" />
                    </FloatingLabel>
                    <Button variant="dark" size="lg" className="w-100">Sign in</Button>
                </Form>
                <span className="d-flex justify-content-center">Have an account?&nbsp;<a href="prova">Sign in</a></span>
            </div>
        </Container>
    );
}

export default SignUp;