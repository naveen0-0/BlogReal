import React from 'react';
import styles from './LikeAndDislike.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { ThumbDown, ThumbUp, ThumbDownOutlined, ThumbUpOutlined } from '@material-ui/icons';
import axios from 'axios';



export default function LikeAndDislike({ id }) {
   const dispatch = useDispatch();
   const { likes, dislikes, didILikeThis, didIDislikeThis } = useSelector(state => state.likesanddislikes);
   const { username, loggedIn } = useSelector(state => state.user);

   const Like = async () => {
      if (!didILikeThis && !didIDislikeThis) {
         let { data } = await axios.post('/like', { id, username });
         console.log(data);
         dispatch({
            type: "UPDATELIKESANDDISLIKES", payload: {
               likes: likes + 1,
               dislikes: 0,
               didILikeThis: true,
               didIDislikeThis: false
            }
         })
      } else if (!didILikeThis && didIDislikeThis) {
         let { data } = await axios.post('/like', { id, username });
         console.log(data);
         dispatch({
            type: "UPDATELIKESANDDISLIKES", payload: {
               likes: likes + 1,
               dislikes: dislikes - 1,
               didILikeThis: true,
               didIDislikeThis: false
            }
         })

      } else if (didILikeThis && !didIDislikeThis) {
         let { data } = await axios.post('/like', { id, username });
         console.log(data);
         dispatch({
            type: "UPDATELIKESANDDISLIKES", payload: {
               likes: likes - 1,
               dislikes: dislikes,
               didILikeThis: false,
               didIDislikeThis: false
            }
         })
      }
   }


   const DisLike = async () => {
      if (!didILikeThis && !didIDislikeThis) {
         let { data } = await axios.post('/dislike', { id, username });
         console.log(data);
         dispatch({
            type: "UPDATELIKESANDDISLIKES", payload: {
               likes: 0,
               dislikes: dislikes + 1,
               didILikeThis: false,
               didIDislikeThis: true
            }
         })
      } else if (didILikeThis && !didIDislikeThis) {
         let { data } = await axios.post('/dislike', { id, username });
         console.log(data);
         dispatch({
            type: "UPDATELIKESANDDISLIKES", payload: {
               likes: likes - 1,
               dislikes: dislikes + 1,
               didILikeThis: false,
               didIDislikeThis: true
            }
         })

      } else if (!didILikeThis && didIDislikeThis) {
         let { data } = await axios.post('/dislike', { id, username });
         console.log(data);
         dispatch({
            type: "UPDATELIKESANDDISLIKES", payload: {
               likes: likes,
               dislikes: dislikes - 1,
               didILikeThis: false,
               didIDislikeThis: false
            }
         })
      }
   }



   return (
      <div className={styles.likesanddislikesContainer}>


         <div className={styles.likeC}>
            <div className={styles.likeimg} onClick={loggedIn ? Like : null} title={loggedIn ? null : "You have to login for this"}>
               {didILikeThis ? <ThumbUp fontSize="small" color="secondary" /> : <ThumbUpOutlined fontSize="small" color="secondary" />}
            </div>
            <div className={styles.likes}>{likes}</div>
         </div>



         <div className={styles.dislikeC}>
            <div className={styles.dislikeimg} onClick={loggedIn ? DisLike : null} title={loggedIn ? null : "You have to login for this"}>
               {didIDislikeThis ? <ThumbDown fontSize="small" color="secondary" /> : <ThumbDownOutlined fontSize="small" color="secondary" />}
            </div>
            <div className={styles.dislikes}>{dislikes}</div>
         </div>


      </div>
   )
}
