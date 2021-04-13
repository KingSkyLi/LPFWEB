/*
1. 暴露出一个server类
2. 完成中间件（jwt、router、bodyparser等等）的注册
*/
const path = require('path')
const koa = require('koa')
const bodyPaser = require('koa-bodyparser')
const static = require('koa-static')

class Service {
    constructor() {
        this.app = new koa()
    }
    registMiddleware() {
        this.app.use(static(path.resolve(__dirname, '../static')))
        this.app.use(bodyPaser({
            extendTypes: {
                json: ['application/json', 'application/x-www-form-urlencoded']
            }
        }))
    }
}

exports.server = new Service()