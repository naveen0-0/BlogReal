import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { CommentsReducer } from './commentsReducer';
import { likeReducer } from './likeReducer'


export const allReducers = combineReducers({
    user: userReducer,
    comments: CommentsReducer,
    likesanddislikes: likeReducer
})