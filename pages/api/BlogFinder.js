import axios from "axios";

//links the client to server
const BlogFinder = axios.create({
    baseURL: "http://localhost:3000/api/v1/dashboard"
});

export default BlogFinder;