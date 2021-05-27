import React, {containerRef, useRef} from 'react';
import {toast} from 'react-toastify';
import {Form, Button, Card} from 'react-bootstrap';
import {axiosSpring} from '../../common/axios';
import './Style.scss';

export default function Register() {
    // const [error, setError] = useState('');
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        register();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            toast.error('Passwords do not match');
        }
    };

    const register = async () => {
        const object = {
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        let res = await axiosSpring.post('/register', object);

        if (res.status === 200 && res.data) {
            toast.success('Registration successful!');
        } else {
            toast.error('Register not successful! Please check input data');
        }
    };

    return (
        <Card className="base-container" ref={containerRef}>
            <Card.Body>
                <div className="header">Register</div>
                <Form className="form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <Form.Group id="firstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" ref={firstNameRef} required/>
                        </Form.Group>
                    </div>
                    <div className="form-group">
                        <Form.Group id="lastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" ref={lastNameRef} required/>
                        </Form.Group>
                    </div>
                    <div className="form-group"></div>
                    <div className="form-group">
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" ref={emailRef} required/>
                        </Form.Group>
                    </div>
                    <div className="form-group">
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required/>
                        </Form.Group>
                    </div>
                    <div className="form-group">
                        <Form.Group id="password-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required/>
                        </Form.Group>
                    </div>
                    <Button className="btn" type="submit">
                        Register
                    </Button>
                </Form>
            </Card.Body>

        </Card>
    );
}
