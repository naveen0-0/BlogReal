import React from 'react';
import { Link } from 'react-router-dom'

export default function Blog({ blog }) {

    return (
        <Link className="blog" to={`/blog/${blog._id}`}>
            <div className="blogtitle">{blog.title}</div>
            <div className="blogdescription">{blog.description}</div>
            <div className="keywords">
                <div className="keyword">#{blog.keywordOne}</div>
                <div className="keyword">#{blog.keywordTwo}</div>
                <div className="keyword">#{blog.keywordThree}</div>
            </div>
        </Link>
    )
}
