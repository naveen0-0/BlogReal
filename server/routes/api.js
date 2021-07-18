const router = require('express').Router();
const Blog = require('../models/Blog');
const { filterAUser } = require('../utils/utils');
const jwt = require('jsonwebtoken')

//@ New Blog Created
router.post('/newblog', async (req, res) => {
    const { title, description, keywordOne, keywordTwo, keywordThree, username } = req.body;

    if (keywordOne.trim().length >= 15 || keywordTwo.trim().length >= 15 || keywordThree.trim().length >= 15) {
        return res.send({ msg: "Keywords should be less than 15 characters", title, description, keywordOne, keywordTwo, keywordThree, created: false })
    }

    await Blog.create({
        title,
        description,
        keywordOne: keywordOne.trim(),
        keywordTwo: keywordTwo.trim(),
        keywordThree: keywordThree.trim(),
        username: username
    });
    res.send({ msg: "", title: "", description: "", keywordOne: "", keywordTwo: "", keywordThree: "", created: true })
})



//@ Getting all the blogs
router.get('/allblogs', async (req, res) => {
    let blogs = await Blog.find()
    res.send(blogs)
})


//@ Get a single Blog
router.get("/blog/:id", async (req, res) => {

    const { id } = req.params;

    let blog = await Blog.findOne({ _id: id });
    if (!blog) res.send("No Such Blog Exists")

    const token = req.cookies.logintoken;
    if (!token) return res.send({ blog: blog, username: "" });

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) return res.send("You have to login for this")
        res.send({ blog: blog, username: user.username })
    })


})

//@ Getting individual Blogs
router.get("/userblogs/:username", async (req, res) => {
    const { username } = req.params;
    let userblogs = await Blog.find({ username });
    res.json(userblogs);
})


//@ Delete a single blog
router.delete('/blog/delete/:id', async (req, res) => {
    const { id } = req.params;
    await Blog.findOneAndDelete({ _id: id });
    res.send({ deleted: true })
})


//@ Editing Blog
router.post('/edit/:id', async (req, res) => {
    const { title, description, keywordOne, keywordTwo, keywordThree, username } = req.body;
    const { id } = req.params;

    if (keywordOne.trim().length >= 15 || keywordTwo.trim().length >= 15 || keywordThree.trim().length >= 15) {
        return res.send({ msg: "Keywords should be less than 15 characters", title, description, keywordOne, keywordTwo, keywordThree, edited: false })
    }

    await Blog.findByIdAndUpdate({ _id: id }, { title, description, keywordOne, keywordTwo, keywordThree })
    res.send({ msg: "", title: "", description: "", keywordOne: "", keywordTwo: "", keywordThree: "", edited: true })
})




//@ Adding Comments
router.post('/comment', (req, res) => {
    const { username, comment, id } = req.body;
    Blog.findOne({ _id: id }).then(blog => {
        blog.comments.unshift({ user: username, comment: comment })
        blog.save();
        res.json({ user: username, comment, commentedOn: Date.now() })
    })
})


//@ Liking a Blog
router.post('/like', async (req, res) => {
    const { id, username } = req.body;
    let blog = await Blog.findOne({ _id: id })
    if (!blog) return res.send({ msg: "There is no such blog" });

    Blog.findOne({ "likedOrDislikedUsers.username": username }).then(userFound => {
        if (userFound) {
            Blog.findOne({ _id: id }).then(async blogFound => {
                let user = filterAUser(blogFound.likedOrDislikedUsers, username)
                if (user.didYouLikeThis) {
                    blogFound.likedOrDislikedUsers = blogFound.likedOrDislikedUsers.filter(eachuser => eachuser.username !== username)
                    blogFound.likes = blogFound.likes - 1;
                    blogFound.save();
                } else {
                    try {
                        await Blog.updateOne({ "likedOrDislikedUsers.username": username }, {
                            "$set": {
                                "likedOrDislikedUsers.$.didYouLikeThis": true,
                                "likedOrDislikedUsers.$.didYouDisLikeThis": false
                            }
                        })
                    } catch (e) {
                        res.send("There is an error")
                    }
                    blogFound.likes = blogFound.likes + 1;
                    blogFound.dislikes = blogFound.dislikes - 1;
                    blogFound.save();
                }
            })
        } else {
            Blog.findOneAndUpdate({ _id: id }, { $inc: { likes: 1 } }).then(blogToBeUpdated => {
                blogToBeUpdated.likedOrDislikedUsers.push({
                    username: username,
                    didYouLikeThis: true,
                    didYouDisLikeThis: false
                })
                blogToBeUpdated.save();
            })
        }
    })

    res.send("You liked this post");

})


//@ Disliking a Blog
router.post('/dislike', async (req, res) => {
    const { id, username } = req.body;
    let blog = await Blog.findOne({ _id: id })
    if (!blog) return res.send({ msg: "There is no such blog" });

    Blog.findOne({ "likedOrDislikedUsers.username": username }).then(userFound => {
        if (userFound) {
            Blog.findOne({ _id: id }).then(async blogFound => {
                let user = filterAUser(blogFound.likedOrDislikedUsers, username)
                if (user.didYouDisLikeThis) {
                    blogFound.likedOrDislikedUsers = blogFound.likedOrDislikedUsers.filter(eachuser => eachuser.username !== username)
                    blogFound.dislikes = blogFound.dislikes - 1;
                    blogFound.save();
                } else {
                    await Blog.updateOne({ "likedOrDislikedUsers.username": username }, {
                        "$set": {
                            "likedOrDislikedUsers.$.didYouLikeThis": false,
                            "likedOrDislikedUsers.$.didYouDisLikeThis": true
                        }
                    })
                    blogFound.likes = blogFound.likes - 1;
                    blogFound.dislikes = blogFound.dislikes + 1;
                    await blogFound.save();
                }
            })
        } else {
            Blog.findOneAndUpdate({ _id: id }, { $inc: { dislikes: 1 } }).then(blogToBeUpdated => {
                blogToBeUpdated.likedOrDislikedUsers.push({
                    username: username,
                    didYouLikeThis: false,
                    didYouDisLikeThis: true
                })
                blogToBeUpdated.save();
            })
        }
    })

    res.send("You disliked this post");

})





module.exports = router;
