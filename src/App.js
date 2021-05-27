import React, {useEffect} from 'react';
import {ToastContainer} from 'react-toastify';
import Navbar from './components/routing/Navbar';
import {AuthContext} from './components/authentication/AuthContext';
import {useState} from 'react';
import Routes from './components/routing/Routes';
import Cookies from './../node_modules/js-cookie';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';


function App() {

    const user = Cookies.get('name');
    const [auth, setAuth] = useState(false);
    const [username, setUsername] = useState(user);

    useEffect(() => {
        if (Cookies.get('token')) {
            setAuth(true);
        }
    }, [auth]);

    return (
        <React.Fragment>
            <ToastContainer/>
            <AuthContext.Provider value={{auth, setAuth, username, setUsername}}>
                <Navbar/>
                <main>
                    <Routes/>
                </main>
            </AuthContext.Provider>
        </React.Fragment>
    );
}

export default App;


