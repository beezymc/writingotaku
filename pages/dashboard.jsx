import React from 'react';
import Header from "../components/Header"
import Post from '../components/BlogPost';
import List from '../components/BlogList';

//holds the home route, which takes the header, blogpost, and list components (delete and update are within list).
const dashboard = () => {
    return (
        <div>
            <Header />
            <List />
            <Post /> 
        </div>
    );
};

export default dashboard;