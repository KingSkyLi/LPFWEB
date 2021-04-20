const { server } = require('../src/service')

let Server = new server(8090)

Server.open()
