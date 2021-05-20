import axios from "axios";

//links the client to server
const ViewBoard = axios.create({
    baseURL: "http://localhost:3000/api/v1/viewboard"
});

export default ViewBoard;