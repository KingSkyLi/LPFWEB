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
    createRouterFile() {
        let files = Object.keys(this.routerList)
        files.forEach(async fileName => {
            let file = path.resolve(__dirname, '../routers' + fileName + '.js')
            if (!fsExists(file)) {

            } else {
                this.createFileContent(fileName)
            }




        })

    }
    createFileContent(fileName) {
        let file = path.resolve(__dirname, '../routers' + fileName + '.js')
        let data = {
            routerClassName: fileName + 'Router',
            functionList: []
        }
        this.routerList[fileName].forEach(item => {
            let content = fs.readFileSync(file)
            data.functionList.push({
                functionName: item.functionName
            })
        })
        console.log(template(data));
    }
}

const route = new Router()

route.createRouterFile()