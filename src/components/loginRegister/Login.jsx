import React, { containerRef , useContext, useRef} from 'react';
import {useHistory} from 'react-router-dom';
import {Form, Button, Card} from 'react-bootstrap';
import {toast} from 'react-toastify';
import {axiosSpring} from '../../common/axios';
import Cookies from '../../../node_modules/js-cookie';
import {AuthContext} from "../authentication/AuthContext";
import './Style.scss';

const Login = () => {
    const history = useHistory();
    const emailRef = useRef();
    const passwordRef = useRef();
    const {setAuth} = useContext(AuthContext);

    const handleLogin = (e) => {
        e.preventDefault();
        login();
    };

    const login = async () => {
        const object = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };
        let res = await axiosSpring.post('/login', object).catch(() => {
        });

        if (!res) {
            toast.error("Username or Password mismatch");
        } else {
            toast.success('Hi, ' + res.data.name + ' !');
            Cookies.set('name', res.data.name);
            Cookies.set('token', res.data.token);
            setAuth(true);
            Cookies.set('id_user_DB', res.data.id);
            history.push('/');
        }
    };

    return (
        <Card className="base-container" ref={containerRef}>
            <Card.Body>
                <div className="header">Login</div>
                <Form onSubmit={handleLogin}>
                    <Form.Group id="text">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required/>
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required/>
                    </Form.Group>
                    <Button className="btn" type="submit">
                        Login
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default Login;
