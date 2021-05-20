import React, { useState } from 'react';
import Register from '../pages/api/Register';
import { useRouter } from 'next/router';

const RegisterForm = () => {
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    let history = useRouter();
    // posts new user to the postgres server
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await Register.post("/", {
                username: username,
                password: password,
                password2: password2,
                email: email
            });
            if (response.data.status == "success") {
                history.push("/login");
            }
        } catch(err) {
            console.log(err);
        }
    };
    return (
        <div className="mb-4">
            <h3 className="text-center">Register</h3>
            <form action="">
                <div className="form-row">
                    <input value={username} onChange={(e) => setUserName(e.target.value)} type="text" className="form-control m-2" placeholder="Username" />
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className="form-control m-2" placeholder="Email" />
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control m-2" placeholder="Password"/>
                    <input value={password2} onChange={(e) => setPassword2(e.target.value)} type="password" className="form-control m-2" placeholder="Confirm Password"/>
                    <button type="submit" onClick={handleSubmit} className="btn btn-primary m-2">Register</button>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;