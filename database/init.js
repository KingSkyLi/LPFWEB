const { MongoClient } = require('mongodb')
const url = 'mongodb://localhost:27017'
const { EventEmitter } = require('events')
let event = new EventEmitter()

class Db {
    constructor(dbName) {
        let client = new MongoClient(url, {
            useNewUrlParser: true
        })
        this.dbName = dbName || 'LPFWEB'
        this.client = client

    }
    connect(callback) {
        event.on('connect', async (args) => {

            let [err, ctx] = args

            if (!err) {
                ctx
            }
            callback([err, result])
            return
        })
        this.client.connect((err) => {
            if (err) {
                event.emit('conect', [err, null])
                return
            }
            event.emit('connect', [null, this])
        })
        return
    }
    close() {
        this.client.close()
    }
}

var a = new Db(null, (result) => {
    let [err, ctx] = result
    if (err) {
        throw err;
    }
    console.log('connect successfully')
}).connect()


