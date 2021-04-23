const { server } = require('../service')
require('../utils/re-write')

const { SECRET_KEY, port } = require('../sys-config/server-config')
const KoaJwt = require('koa-jwt')
let Server = new server(port)
Server.app.use(KoaJwt({
    secret: SECRET_KEY
}).unless({
    path: [/^\/api\/login/, /^\/api\/regist/]
}))
Server.open()
