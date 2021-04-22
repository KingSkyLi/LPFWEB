const { Schema } = require('mongoose')

const UserSchema = new Schema({
    username: String,
    password: String,
    createTime: { type: Date, default: Date.now }
})

module.exports = UserSchema
