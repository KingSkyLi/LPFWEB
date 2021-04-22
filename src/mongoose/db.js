const mongoose = require('mongoose');
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
let url = 'mongodb://localhost:27017/lpfweb'
const DbModels = {}
mongoose.connect(`${url}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});
mongoose.connection.on('open', () => {
    console.log(chalk.black.bgGreen(`>>>>>>连接数据库${url}成功\n`))
})
mongoose.connection.on('error', () => {
    console.log(chalk.black.bgRed(`>>>>>>连接数据库${url}失败\n`))
})
let schemaFiles = fs.readdirSync(path.resolve(__dirname, './schemas'))
schemaFiles.forEach(fileName => {
    let file = path.resolve(__dirname, './schemas/' + fileName)
    let modelName = fileName.replace('.js', '')
    let schema = require(file)
    let model = mongoose.model(modelName, schema)
    DbModels[modelName] = model
})
module.exports = DbModels

