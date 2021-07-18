const { Schema, model } = require('mongoose');


const RequiredString = { type: String, required: true };

const UserSchema = new Schema({
    username: RequiredString,
    email: RequiredString,
    password: RequiredString
})

const User = model('user', UserSchema)

module.exports = User;