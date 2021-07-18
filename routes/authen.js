const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

//* SignUp Route
router.post('/signup', async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;
    let userName = await User.findOne({ username });
    if (userName) return res.send({ msg: "UserName Taken" });
    let userEmail = await User.findOne({ email });
    if (userEmail) return res.send({ msg: "Email Already Exists" });
    if (password !== confirmPassword) return res.send({ msg: "Password didn't match" })

    await User.create({ username: username.trim(), email: email.trim(), password });
    res.send({ msg: "Account Created, Please Login" })
})


//* Login Route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    let fetchedUser = await User.findOne({ username });
    if (!fetchedUser) return res.send({ loggedIn: false, msg: "Username doesn't exist", username: "", email: "" });
    if (fetchedUser.password !== password) return res.send({ loggedIn: false, msg: "Incorrect Password", username: "", email: "" });

    jwt.sign({ username: fetchedUser.username, email: fetchedUser.email }, process.env.ACCESS_TOKEN, (err, token) => {
        if (err) {
            res.send("There is an Error")
        }
        res.cookie("logintoken", token, { httpOnly: true });
        res.send({ loggedIn: true, username: fetchedUser.username, email: fetchedUser.email })
    })
})


//* Get User
router.route('/getuser').get(async (req, res) => {
    const token = req.cookies.logintoken;
    if (!token) return res.send({ username: "", email: "", loggedIn: false });
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) return res.send({ username: "", email: "", loggedIn: false })
        res.send({ username: user.username, email: user.email, loggedIn: true })
    })
})


//* Logout
router.post('/logout', (req, res) => {
    res.clearCookie('logintoken')
    res.send({ username: "", email: "", loggedIn: false })
})


module.exports = router;