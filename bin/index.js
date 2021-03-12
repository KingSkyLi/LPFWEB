const Koa = require('koa');
const app = new Koa();
const { run } = require('../routers/index');
const bodyParser = require('koa-bodyparser');
app.use(
	bodyParser({
		extendTypes: {
			json: ['application/json', 'application/x-www-form-urlencoded'],
		},
	})
);

run().then((router) => {
	app.use(router.routes());
	app.use(router.allowedMethods());
});
app.listen(8090, () => {
	console.log('LPFWEB平台启动成功');
});
