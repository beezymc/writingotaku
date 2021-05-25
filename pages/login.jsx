import React from 'react';
import Header from "../components/Header"
import LoginForm from '../components/LoginForm';

//holds the login route, which takes the header and login components.
const login = () => {
    return (
        <div>
            <Header />
            <LoginForm /> 
        </div>
    );
};

export default login;