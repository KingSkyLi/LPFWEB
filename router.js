const KoaRouter = require('koa-router')
const path = require('path')
const fs = require('fs')
const { RouterList } = require('./src/config/router-config')
const Handlebars = require("handlebars");
const { routerTemplate } = require('./templates/router-template')
const template = Handlebars.compile(routerTemplate);
const inquirer = require('inquirer');
const Validator = require('validatorjs');
class Router {
    constructor(prefix = '/api') {
        this.router = new KoaRouter({ prefix })
        this.routerList = RouterList

    }
    init() {
        return new Promise(async (resolve) => {
            let file = path.resolve(__dirname, './bakfiles/.router-config.bak.js')
            if (!fs.existsSync(file)) {
                let content = fs.readFileSync(path.resolve(__dirname, './src/config/router-config.js'))
                fs.writeFileSync(path.resolve(__dirname, './bakfiles/.router-config.bak.js'), content)
                this.writeRouterFile()
                resolve()
            } else {
                let res = await this.checkRouterConfigChanged()
                if (res === 'ok') {
                    resolve()
                }
            }
        })

    }
    // 校验router-config是否发生变化
    async checkRouterConfigChanged() {
        return new Promise((resolve, reject) => {
            let content = fs.readFileSync(path.resolve(__dirname, './src/config/router-config.js'))
            let contentBak = fs.readFileSync(path.resolve(__dirname, './bakfiles/.router-config.bak.js'))
            if (contentBak.toString() !== content.toString()) {
                inquirer.prompt([{
                    type: 'confirm',
                    name: 'RouterConfigChanged',
                    message: `文件${path.resolve(__dirname, './src/config/router-config.js')}发生变换，是否更新routers目录下的路由文件?`
                }]).then(ans => {
                    if (ans.RouterConfigChanged) {
                        fs.writeFileSync(path.resolve(__dirname, './bakfiles/.router-config.bak.js'), content)
                        this.writeRouterFile()
                    }
                    resolve('ok')
                }).catch(err => { console.log(err) })
            } else {
                resolve('ok')
            }
        })
    }
    // 写入routers/*.js
    writeRouterFile() {
        let files = Object.keys(this.routerList)
        files.forEach(fileName => {
            let file = path.resolve(__dirname, './src/routers/' + fileName + '.js')
            let content;
            if (!fs.existsSync(file)) {
                content = this.createFileContent(fileName, false)
            } else {
                content = this.createFileContent(fileName, true)
            }
            fs.writeFileSync(file, content)
        })

    }
    // 生routers/*.js的内容
    createFileContent(fileName, isExist) {
        let file = path.resolve(__dirname, './src/routers/' + fileName + '.js')
        let data = {
            routerClassName: fileName + 'Router',
            content: '',
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
            let re = /(\/\*\* Content-Start \*\*\/)([\s\S]*)(\/\*\*  Content-End  \*\*\/)/
            let importModuleContent = fs.readFileSync(file).toString()
            let contents = importModuleContent.match(re)
            if (contents.length === 4) {
                data.content = contents[2].trim('\n')
            }
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
    // 自动注册接口函数，如果有validator就校验，有middleware函数就执行。
    regisRouter() {
        let files = Object.keys(this.routerList)
        files.forEach(async fileName => {
            let file = path.resolve(__dirname, './src/routers/' + fileName + '.js')
            delete require.cache[require.resolve(file)]
            let routerClass = require(file)
            this.routerList[fileName].forEach(item => {
                let a = routerClass[fileName + 'Router'][item.functionName]
                if (typeof a === 'function' && item.functionName) {
                    if (item.middleware || item.validatorRules) {
                        this.router[item.method.toLowerCase()](item.path, async (ctx, next) => {
                            if (item.validatorRules) {
                                let data = {}
                                if (ctx.method === 'POST') {
                                    data = ctx.request.body
                                    let validation = new Validator(data, item.validatorRules)
                                    if (!validation.passes()) {
                                        ctx._validation = validation
                                    }
                                    await next()
                                }
                            }
                            typeof item.middleware === 'function' && item.middleware.apply(this, ctx, next)
                        }, a)
                    } else {
                        this.router[item.method.toLowerCase()](item.path, a)
                    }

                }
            })
        })
    }
}

module.exports = {
    router: Router
}
