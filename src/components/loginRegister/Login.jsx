import React, {containerRef, useContext, useRef} from 'react';
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
        await axiosSpring.post('/login', object).then(({data}) => {
                toast.success('Hi, ' + data.name + ' !');
                Cookies.set('name', data.name);
                Cookies.set('token', data.token);
                setAuth(true);
                Cookies.set('id_user_DB', data.id);
                history.push('/');
        }).catch(error=> {
            console.log("data",error.response.data.message);
            toast.error(error.response.data.message.toLowerCase());
        });
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
