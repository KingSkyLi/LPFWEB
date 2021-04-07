const { MongoClient } = require('mongodb')
const url = 'mongodb://localhost:27017'
const { EventEmitter } = require('events')
let event = new EventEmitter()

class Db {
    constructor(default_url = '', cb) {
        default_url && (url = default_url)
        let client = new MongoClient(url, {
            useNewUrlParser: true
        })
        this.client = client
        this.cb = cb
    }
    connect() {
        event.on('connect', this.cb.bind(this, [null, this.client]))
        this.client.connect((err) => {
            if (err) {
                event.emit([err, null])
                return
            }
            event.emit('connect')
        })
        return
    }
    close() {
        this.client.close()
    }
}

var a = new Db(null, (result) => {
    let [err, client] = result
    if (err) {
        throw err;
    }
    console.log('connect successfully')
}).connect()


