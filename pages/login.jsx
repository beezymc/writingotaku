import React from 'react';
import Header from "../components/Header"
import LoginForm from '../components/LoginForm';

//holds the home route, which takes the header, addrestaurant, and list components (delete and update are within list).
const login = () => {
    return (
        <div>
            <Header />
            <LoginForm /> 
        </div>
    );
};

export default login;