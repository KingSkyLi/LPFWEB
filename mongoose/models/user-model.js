const mongoose = require('mongoose');
const Schema = mongoose.Schema

const UserSchema = new Schema({
    userID: String,
    userName: String,
    passWord: String,
    registTime: { type: Date, default: Date.now },
})


const User = mongoose.model('User', UserSchema)

module.exports = {
    User
}

