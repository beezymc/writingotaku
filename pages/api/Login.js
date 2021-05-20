import axios from "axios";

//links the client to server
const Login = axios.create({
    baseURL: "http://localhost:3000/api/v1/users/login"
});

export default Login;