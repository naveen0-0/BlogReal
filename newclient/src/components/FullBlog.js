import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import Spinner from './Spinner';
import { ConvertDayNumbertoDayName } from '../utils/utils';
import CommentsContainer from './CommentsContainer/CommentsContainer';
import LikeAndDisLike from './LikeAndDislike/LikeAndDislike';
import { didIDislikeThisBlog, didILikeThisBlog } from '../utils/utils';



export default function FullBlog({ match }) {

    const { username } = useSelector(state => state.user);
    const [blog, setBlog] = useState({});
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();


    useEffect(() => {
        let source = axios.CancelToken.source();
        const GetFullBlog = async () => {
            try {
                const { data } = await axios.get(`/blog/${match.params.id}`, { cancelToken: source.token })
                setBlog(data.blog);
                dispatch({ type: "UPDATECOMMENTS", payload: data.blog.comments })
                dispatch({
                    type: "UPDATELIKESANDDISLIKES", payload: {
                        likes: data.blog.likes,
                        dislikes: data.blog.dislikes,
                        didILikeThis: didILikeThisBlog(data),
                        didIDislikeThis: didIDislikeThisBlog(data)
                    }
                })
                setLoading(false);

            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log("Caught Cancel");
                } else {
                    throw error;
                }
            }
        }

        GetFullBlog();
        return () => {
            source.cancel();
        }

    }, [match.params.id]);

    if (loading) {
        return <Spinner />
    }

    return (
        <div>
            <div className="fullblog">
                <div className="fullblogtitle">{blog.title}</div>
                <div className="fullblogkeywords">
                    <div className="fullblogkeyword">#{blog.keywordOne}</div>
                    <div className="fullblogkeyword">#{blog.keywordTwo}</div>
                    <div className="fullblogkeyword">#{blog.keywordThree}</div>
                </div>
                <div className="fullblogdescription">{blog.description}</div>
                <div className="writtenby"><i>--- {blog.username}</i></div>
                <div className="fullblogcreatedon">WrittenOn - {new Date(blog.createdOn).toLocaleDateString()}, {ConvertDayNumbertoDayName(new Date(blog.createdOn).getDay())}</div>
            </div>
            <LikeAndDisLike id={match.params.id} />
            <CommentsContainer id={match.params.id} username={username} />

        </div>
    )
}
