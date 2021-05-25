import React from 'react';
import Header from "../components/Header"
import RegisterForm from '../components/RegisterForm';

//holds the register route, which takes the header and registration components.
const register = () => {
    return (
        <div>
            <Header />
            <RegisterForm /> 
        </div>
    );
};

export default register;