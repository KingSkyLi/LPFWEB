const mongoose = require('mongoose');
const fs = require('fs')
const path = require('path')

let url = 'mongodb://localhost:27017/lpfweb'
const DbModels = {}
mongoose.connect(`${url}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

let schemaFiles = fs.readdirSync(path.resolve(__dirname, './schemas'))
schemaFiles.forEach(fileName => {
    let file = path.resolve(__dirname, './schemas/' + fileName)
    let modelName = fileName.replace('.js', '')
    let schema = require(file)
    let model = mongoose.model(modelName, schema)
    DbModels[modelName] = model
})

console.log(DbModels)

module.exports = DbModels

