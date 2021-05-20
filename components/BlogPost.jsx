import React, { useState, useContext } from 'react';
import BlogFinder from '../pages/api/BlogFinder';
import { BlogContext } from './BlogContext';

const BlogPost = () => {
    const {addBlog} = useContext(BlogContext);
    const [title, setTitle] = useState("");
    const [blogText, setBlogText] = useState("");
    //posts new restaurant to the postgres server
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await BlogFinder.post("/", {
                title: title,
                blog_body: blogText,
            });
            addBlog(response.data.data.blog);
        } catch(err) {
            console.log(err);
        }
    };
    return (
        <div className="mb-4">
            <h3 className="text-center">Create New Post</h3>
            <form action="">
                <div className="form-row">
                    <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" className="form-control m-2" placeholder="Post Title" />
                    <textarea value={blogText} onChange={(e) => setBlogText(e.target.value)} rows="5" type="text" className="form-control m-2" placeholder="Your Content Here..."/>
                    <button type="submit" onClick={handleSubmit} className="btn btn-primary m-2">Submit Post</button>
                </div>
            </form>
        </div>
    );
};

export default BlogPost;