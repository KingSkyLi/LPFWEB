const HttpCodeConfig = require('../config/http-status-code-config');
const jwt = require('../utils/jwt');
const test = {
	userName: 'lipengfei',
	passWord: '123456',
	userId: 'lpf',
};
exports.regist = async (ctx, next) => {
	let { userName, passWord } = ctx.request.body;
	if (userName === test.userName && passWord === test.passWord) {
		ctx.body = {
			userName,
		};
	}

	await next();
};

exports.login = async (ctx, next) => {
	let { userName, passWord } = ctx.request.body;
	if (userName === test.userName && passWord === test.passWord) {
		let token = await jwt.getToken(userName, test.userId);
		ctx.body = {
			...HttpCodeConfig[200],
			token: token,
		};
	} else {
		ctx.body = {
			...HttpCodeConfig[401],
			errorMsg: '账号或密码不正确',
		};
	}
	await next();
};

exports.logout = async (ctx, next) => {
	ctx.body = {
		a: 1,
	};
};
