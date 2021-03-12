const Koa = require('koa');
const app = new Koa();
const { run } = require('../routers/index');

// const Router = require('koa-router');
// const router = new Router();

// router.get('/api/test', (ctx) => {
// 	// ctx.router 可以访问
// 	// 做一些当前路由的处理
// 	ctx.body = {
// 		a: 1,
// 	};
// });
run().then((router) => {
	app.use(router.routes());
	app.use(router.allowedMethods());
	app.listen(8090, () => {
		console.log('LPFWEB平台启动成功');
	});
});
// app.use(router.routes());
// app.use(router.allowedMethods());
// console.log(router);
// app.listen(8090, () => {
// 	console.log('LPFWEB平台启动成功');
// });
