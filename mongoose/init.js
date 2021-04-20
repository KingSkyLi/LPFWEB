const mongoose = require('mongoose');
const { User } = require('./models/index.js')
mongoose.connect('mongodb://localhost:27017/lpfweb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

mongoose.connection.on('error', () => {
    console.log('连接数据库失败')
})

mongoose.connection.on('open', () => {
    console.log('连接数据库成功')
})

let Tom = new User({
    userID: 'xxx',
    userName: 'Tom',
    password: '123456',
}).save((err, tom) => {
    console.log(tom)
})

User.find()
