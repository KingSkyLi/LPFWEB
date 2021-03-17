const Koa = require('koa');
const app = new Koa();
const { run } = require('../routers/index');
const bodyParser = require('koa-bodyparser');
const { uncheckToken } = require('../utils/jwt')
const HttpStatusCodeConfig = require('../config/http-status-code-config')
const path = require('path')
const static = require('koa-static')

async function main() {
    app.use(static(path.resolve(__dirname, '../static')))
    app.use(
        bodyParser({
            extendTypes: {
                json: ['application/json', 'application/x-www-form-urlencoded'],
            },
        })
    );
    app.use(function (ctx, next) {
        return next().catch((err) => {
            if (401 == err.status) {
                ctx.body = {
                    ...HttpStatusCodeConfig[401],
                    errorMsg: err.message
                }
            } else {
                throw err;
            }
        });
    });
    // 定义不需要进行token校验的接口
    // uncheckToken(app, { unless: [/\/api\/login[A_Z|a_Z]*/, /\/api\/regist/, /\/api\/static/, /\/api\/auth[\s\S]*/] })
    // 自动生成路由文件及函数，并注册路由
    let router = await run()
    app.use(router.routes());
    app.use(router.allowedMethods());
    app.listen(8090, () => {
        console.log('LPFWEB平台启动成功');
    });
}

main()

