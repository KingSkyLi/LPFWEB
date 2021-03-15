
const HttpCodeConfig = require('../config/http-status-code-config')
const jwt = require('../utils/jwt')
exports.regist = async (ctx, next) => {
	const test = {
		userName: 'lipengfei',
		passWord: '123456',
		userId: 'lpf'
	};
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
		let token = jwt.getToken(userName, test.userId)
		ctx.body = {
			...HttpCodeConfig[200],
			token: token
		}
	}
};

exports.logout = async (ctx, next) => {
	ctx.body = {
		a: 1,
	};
};
