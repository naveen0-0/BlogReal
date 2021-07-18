import React from 'react';
import styles from './Comment.module.css';


export default function Comment({ comment }) {

    return (
        <div className={styles.comment}>
            <div className={styles.commentusername}>{comment.user}</div>
            <div className={styles.commenttext}>{comment.comment}</div>
            <div
                className={styles.commentCreatedOn}>
                {new Date(comment.commentedOn).toLocaleDateString()}  {new Date(comment.commentedOn).toLocaleTimeString()}
            </div>
        </div>
    )
}
