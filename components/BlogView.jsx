import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ViewBoard from "../pages/api/ViewBoard";
import { BlogContext } from './BlogContext';

const BlogView = (props) => {
    const { blogs, setBlogs } = useContext(BlogContext);
    let history = useHistory();
    //grabs current data listed in postgres database
    useEffect(() => {
        const fetchData = async () => {
            try {
                //adds '/' to the end of the url in the api
                const response = await ViewBoard.get("/");
                setBlogs(response.data.data.blogs);
            } catch(err) {
                console.log(err);
            }           
        };
        fetchData();
    }, []);

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
                            <td></td>
                        </tr>
                    </tbody>
                ))}
            </table>
        </div>
    );
};

export default BlogView;