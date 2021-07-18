import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Blog from './Blog';
import Spinner from './Spinner';

export default function HomePage() {

    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const GetAllBlogs = async () => {
            let { data } = await axios.get('/allblogs');
            setBlogs(data);
            setLoading(false);
        }
        GetAllBlogs();
    }, [])


    if (loading) {
        return <Spinner />
    }


    return (
        <div className="blogscontainer">
            {blogs.map((blog, index) => <Blog blog={blog} key={index} />)}
        </div>
    )
}
