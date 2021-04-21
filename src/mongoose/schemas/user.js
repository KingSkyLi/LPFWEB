const { Schema } = require('mongoose')

const UserSchema = new Schema({
    userName: String,
    password: String,
    createTime: { type: Date, default: Date.now }
})

module.exports = UserSchema
