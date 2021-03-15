const Koa = require('koa');
const app = new Koa();
const { run } = require('../routers/index');
const bodyParser = require('koa-bodyparser');

async function main() {
    app.use(
        bodyParser({
            extendTypes: {
                json: ['application/json', 'application/x-www-form-urlencoded'],
            },
        })
    );

    let router = await run()
    app.use(router.routes());
    app.use(router.allowedMethods());
    app.listen(8090, () => {
        console.log('LPFWEB平台启动成功');
    });
}

main()

