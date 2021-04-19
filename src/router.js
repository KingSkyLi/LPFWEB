const KoaRouter = require('koa-router')
const path = require('path')
const fs = require('fs')
const { promisify } = require('util')
const { RouterList } = require('./config/router-config')
const fsExists = promisify(fs.exists)
const Handlebars = require("handlebars");
const { routerTemplate } = require('./templates/router-template')
const template = Handlebars.compile(routerTemplate);

class Router {
    constructor(prefix = '/api') {
        this.router = new KoaRouter({ prefix })
        this.routerList = JSON.parse(JSON.stringify(RouterList))
    }
    writeRouterFile() {
        let files = Object.keys(this.routerList)
        files.forEach(async fileName => {
            let file = path.resolve(__dirname, './routers/' + fileName + '.js')
            let content;
            if (!await fsExists(file)) {
                content = this.createFileContent(fileName, false)
            } else {
                content = this.createFileContent(fileName, true)
            }
            fs.writeFileSync(file, content)
        })
        let content = fs.readFileSync(path.resolve(__dirname, './config/router-config.js'))
        fs.writeFileSync(path.resolve(__dirname, './bakfiles/.router-config.bak'), content)

    }
    createFileContent(fileName, isExist) {
        let file = path.resolve(__dirname, './routers/' + fileName + '.js')
        let data = {
            routerClassName: fileName + 'Router',
            functionList: []
        }
        // 文件存在
        if (isExist) {
            let routerClass = require(file)
            this.routerList[fileName].forEach(item => {
                let a = routerClass[fileName + 'Router'][item.functionName]
                // 判断是不是新增的路由
                if (typeof a === 'function' && item.functionName) {
                    data.functionList.push({
                        functionName: item.functionName,
                        functionBody: a.toString()
                    })
                } else {
                    data.functionList.push({
                        functionName: item.functionName,
                        functionBody: ''
                    })
                }
            })
            return template(data)
        } else {
            this.routerList[fileName].forEach(item => {
                data.functionList.push({
                    functionName: item.functionName
                })
            })
            return template(data)
        }

    }
    checkRouterInConfig() {

    }
}

const route = new Router()

route.writeRouterFile()