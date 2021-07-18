import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Fragment } from 'react';
import UserBlog from './UserBlog'
import Spinner from './Spinner';


export default function IndividualUserBlogs({ username }) {

    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        let source = axios.CancelToken.source();
        const GetUserBlogs = async () => {
            try {
                const { data } = await axios.get(`/userblogs/${username}`, { cancelToken: source.token })
                setBlogs(data);
                setLoading(false);

            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log("Caught Cancel");
                } else {
                    throw error;
                }
            }
        }
        GetUserBlogs();
        return () => {
            source.cancel();
        }
    }, [username]);


    return (
        <Fragment>
            {loading ? <Spinner /> : (
                <div className="individualuserblogs">
                    {blogs.map((blog, index) => <UserBlog blog={blog} key={index} />)}
                </div>
            )}
        </Fragment>
    )
}
