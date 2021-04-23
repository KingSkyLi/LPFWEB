/*
1. 暴露出一个server类
2. 完成中间件（jwt、router、bodyparser等等）的注册
*/
const path = require('path')
const koa = require('koa')
const bodyPaser = require('koa-bodyparser')
const static = require('koa-static')
let staticContainer = static(path.resolve(__dirname, './static'))
const { router } = require('./router')
const { EventEmitter } = require('events')
const chalk = require('chalk')
class Service {
    constructor(port = 8090) {
        this.app = new koa()
        this.port = port
        this.Router = new router()
        // 创建 eventEmitter 对象
        this.eventEmitter = new EventEmitter();
        this.eventEmitter.on('ok', () => {
            this.listen()
        })
    }
    // 打开服务
    async open() {
        await this.Router.init()
        this.registMiddleware()
    }
    // 注册中间件
    registMiddleware() {
        this.app.use(staticContainer)
        this.app.use(bodyPaser({
            extendTypes: {
                json: ['application/json', 'application/x-www-form-urlencoded']
            }
        }))
        this.Router.regisRouter()
        this.app.use(this.Router.router.routes());
        this.app.use(this.Router.router.allowedMethods());
        this.eventEmitter.emit('ok')
    }
    // 监听端口
    listen() {
        this.app.listen(this.port, () => {
            console.log(chalk.black.bgGreen('>>>>>>LPFWEB服务器启动成功\n'))
        })
    }
}

module.exports = {
    server: Service
}