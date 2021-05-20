import axios from "axios";

//links the client to server
const Register = axios.create({
    baseURL: "http://localhost:3000/api/v1/users/register"
});

export default Register;