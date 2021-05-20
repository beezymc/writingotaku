import React from 'react';
import Header from "../components/Header"
import RegisterForm from '../components/RegisterForm';

//holds the home route, which takes the header, addrestaurant, and list components (delete and update are within list).
const register = () => {
    return (
        <div>
            <Header />
            <RegisterForm /> 
        </div>
    );
};

export default register;