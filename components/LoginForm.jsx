import React, { useState } from 'react';
import Login from '../pages/api/Login';
import { useRouter } from 'next/router';

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let history = useRouter();
    // tries to log user in
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await Login.post("/", {
                email: email,
                password: password,
            });
            if (response.data.status == "success") {
                history.push("/dashboard");
            }
        } catch(err) {
            console.log(err);
        }
    };
    return (
        <div className="mb-4">
            <h3 className="text-center">Log In</h3>
            <form action="">
                <div className="form-row">
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className="form-control m-2" placeholder="Email" />
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control m-2" placeholder="Password"/>
                    <button type="submit" onClick={handleSubmit} className="btn btn-primary m-2">Login</button>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;