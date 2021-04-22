const { server } = require('../src/service')
require('../utils/re-write')
let Server = new server(8090)

Server.open()
