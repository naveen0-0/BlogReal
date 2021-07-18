import React, { useState } from 'react';
import styles from './CommentsContainer.module.css';
import Comment from '../Comment/Comment';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios'

export default function CommentsContainer({ id }) {

    const { loggedIn, username } = useSelector(state => state.user);
    const comments = useSelector(state => state.comments)
    const [comment, setComment] = useState("");
    const dispatch = useDispatch();

    const CommentSubmit = async e => {
        e.preventDefault();
        let { data } = await axios.post('/comment', { username, comment, id })
        dispatch({ type: "ADDCOMMENT", payload: data })
        setComment("")
    }

    return (
        <div className={styles.containerrew}>
            <div className={styles.commentstitle}>Comments</div>
            <form onSubmit={CommentSubmit}>
                <textarea
                    className={styles.commentSection}
                    cols="30"
                    rows="5"
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    placeholder="Write a Comment" required>
                </textarea>

                <input
                    type="submit"
                    value={loggedIn ? "Comment" : "You need to login for this"}
                    className={styles.commentsubmit}
                    disabled={!loggedIn}
                    title={loggedIn ? "Comment" : "You need to login for this"}
                />
            </form>


            {comments.map((comment, i) => <Comment comment={comment} key={i} />)}
        </div>
    )
}
