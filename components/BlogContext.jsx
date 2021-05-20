import React, { useState, createContext } from "react";

//context is used to share data between components. In this case, blogs, setBlogs, and addBlogs are shared.
export const BlogContext = createContext();

export const BlogContextProvider = (props) => {
    const [blogs, setBlogs] = useState([]);
    const addBlog = (blog) => {
        setBlogs([...blogs, blog]);
    };
    const [users, setUsers] = useState([]);
    const addUser = (user) => {
        setUsers([...users, user]);
    };
    return (
        <BlogContext.Provider value={{ blogs, setBlogs, addBlog, users, setUsers, addUser }}>
            {props.children}
        </BlogContext.Provider>
    );
};