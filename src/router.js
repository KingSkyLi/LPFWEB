const KoaRouter = require('koa-router')
const path = require('path')
const fs = require('fs')
const { promisify } = require('util')
const { RouterList } = require('./config/router-config')
const fsExists = promisify(fs.exists)
const Handlebars = require("handlebars");
const { routerTemplate } = require('./templates/router-template')
const template = Handlebars.compile(routerTemplate);
const inquirer = require('inquirer');

class Router {
    constructor(prefix = '/api') {
        this.router = new KoaRouter({ prefix })
        this.routerList = JSON.parse(JSON.stringify(RouterList))
        let file = path.resolve(__dirname, './bakfiles/.router-config.bak.js')
        if (!fs.existsSync(file)) {
            let content = fs.readFileSync(path.resolve(__dirname, './config/router-config.js'))
            fs.writeFileSync(path.resolve(__dirname, './bakfiles/.router-config.bak.js'), content)
            this.writeRouterFile()
        } else {
            this.checkRouterConfigChanged()
        }
    }
    checkRouterConfigChanged() {
        let content = fs.readFileSync(path.resolve(__dirname, './config/router-config.js'))
        let contentBak = fs.readFileSync(path.resolve(__dirname, './bakfiles/.router-config.bak.js'))
        if (contentBak.toString() !== content.toString()) {
            inquirer.prompt([{
                type: 'confirm',
                name: 'RouterConfigChanged',
                message: `文件${path.resolve(__dirname, './config/router-config.js')}发生变换，是否更新routers目录下的路由文件？`
            }]).then(ans => {
                if (ans.RouterConfigChanged) {
                    this.writeRouterFile()
                    fs.writeFileSync(path.resolve(__dirname, './bakfiles/.router-config.bak.js'), content)
                }
            }).catch(err => { console.log(err) })
        } else {
            this.initRouter()
        }
    }
    writeRouterFile() {
        let files = Object.keys(this.routerList)
        files.forEach(async fileName => {
            let file = path.resolve(__dirname, './routers/' + fileName + '.js')
            let content;
            if (!fs.existsSync(file)) {
                content = this.createFileContent(fileName, false)
            } else {
                content = this.createFileContent(fileName, true)
            }
            fs.writeFileSync(file, content)
        })
        this.initRouter()
    }
    createFileContent(fileName, isExist) {
        let file = path.resolve(__dirname, './routers/' + fileName + '.js')
        let data = {
            routerClassName: fileName + 'Router',
            functionList: []
        }
        // 文件存在
        let temp = null
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
            temp = template(data)
        } else {
            this.routerList[fileName].forEach(item => {
                data.functionList.push({
                    functionName: item.functionName
                })

            })
            temp = template(data)
        }
        return temp

    }
    initRouter() {
        let files = Object.keys(this.routerList)
        files.forEach(async fileName => {
            let file = path.resolve(__dirname, './routers/' + fileName + '.js')
            let routerClass = require(file)
            this.routerList[fileName].forEach(item => {
                let a = routerClass[fileName + 'Router'][item.functionName]
                // 判断是不是新增的路由
                if (typeof a === 'function' && item.functionName) {
                    this.router[item.method.toLowerCase()](item.path, a)
                }
            })
        })
    }
}

module.exports = {
    router: Router
}
