import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import editimg from '../images/edit.png';
import deleteimg from '../images/delete.png'
import axios from 'axios'

export default function Blog({ blog }) {

    const [deleted, setDeleted] = useState(false);

    const DeleteBlog = async id => {
        let { data } = await axios.delete(`/blog/delete/${id}`);
        setDeleted(data.deleted)
    }


    if (deleted) return <Redirect to="/" />

    return (

        <Fragment>
            <Link className="blog userblog" to={`/blog/${blog._id}`}>
                <div className="blogtitle">{blog.title}</div>
                <div className="blogdescription">{blog.description}</div>
                <div className="keywords">
                    <div className="keyword">#{blog.keywordOne}</div>
                    <div className="keyword">#{blog.keywordTwo}</div>
                    <div className="keyword">#{blog.keywordThree}</div>
                </div>
            </Link>
            <div className="editanddelete">
                <Link to={`/edit/${blog._id}/${blog.username}`} className="editimgcontainer" title="Edit"><img src={editimg} alt="Editimg" className="editimg" /></Link>
                <button className="deleteimgcontainer" onClick={() => DeleteBlog(blog._id)} title="Delete"><img src={deleteimg} alt="DeleteBlog" className="deleteimg" /></button>
            </div>
        </Fragment>
    )
}
