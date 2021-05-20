import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import BlogFinder from "../pages/api/BlogFinder";
import { BlogContext } from './BlogContext';

const BlogList = (props) => {
    const { blogs, setBlogs } = useContext(BlogContext);
    let history = useHistory();
    //grabs current data listed in postgres database
    useEffect(() => {
        const fetchData = async () => {
            try {
                //adds '/' to the end of the url in the api
                const response = await BlogFinder.get("/");
                setBlogs(response.data.data.blogs);
            } catch(err) {
                console.log(err);
            }           
        };
        fetchData();
    }, []);

    //deletes a row with that particular id by using filter to filter out all rows with that id (creating a new array with all elements not with that id).
    const handleDelete = async (e, id) => {
        e.stopPropagation();
        try {
            const response = await BlogFinder.delete(`/${id}`);
            setBlogs(blogs.filter(blog => {
                return blog.id !== id
            }));
        } catch(err) {
            console.log(err);
        }
    }
    return (
        <div>
            <table className="table">
                {blogs && blogs.map((blog) => (
                    <tbody key={blog.id} className="mt-4">
                        <tr>
                            <th className="text-center bg-dark text-white">{blog.title}</th>
                        </tr>
                        <tr>
                            <td className="bg-dark text-white">{blog.blog_body}</td>
                        </tr>
                        <tr>
                            <td className="bg-dark text-white">{blog.time_stamp}</td>
                        </tr>
                        <tr>
                            <td><button onClick={(e) => handleDelete(e, blog.id)} className="btn btn-danger">Delete</button></td>
                        </tr>
                    </tbody>
                ))}
            </table>
        </div>
    );
};

export default BlogList;