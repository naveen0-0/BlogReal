const { Schema, model } = require('mongoose');

const CommentSchema = new Schema({
    comment: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    commentedOn: {
        type: Date,
        default: Date.now
    }
})

const likedOrDislikedUsersSchema = new Schema({
    username: { type: String, required: true },
    didYouLikeThis: { type: Boolean, default: false, required: true },
    didYouDisLikeThis: { type: Boolean, default: false, required: true },
})



const BlogSchema = new Schema({
    likedOrDislikedUsers: [likedOrDislikedUsersSchema],
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    title: { type: String, required: true },
    description: { type: String, required: true },
    keywordOne: { type: String, required: true },
    keywordTwo: { type: String, required: true },
    keywordThree: { type: String, required: true },
    username: { type: String, required: true },
    createdOn: { type: Date, default: Date.now },
    comments: [CommentSchema]
})


const Blog = model('blog', BlogSchema);
module.exports = Blog;
