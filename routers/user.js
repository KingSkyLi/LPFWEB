const HttpCodeConfig = require('../config/http-status-code-config');
const jwt = require('../utils/jwt');

const { gitConfig, giteeConfig } = require('../config/auth-config')
const test = {
	userName: 'lipengfei',
	passWord: '123456',
	userId: 'lpf',
};
exports.regist = async (ctx, next) => {
	let { userName, passWord } = ctx.request.body;
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
		a: 1
	}
}

exports.loginByGithub = async (ctx, next) => {
	let path = `https://github.com/login/oauth/authorize?client_id=${gitConfig.clientID}`
	ctx.redirect(path)
}

exports.loginByGitee = async (ctx, next) => {
	let path = `https://gitee.com/oauth/authorize?client_id=${giteeConfig.clientID}&redirect_uri=${giteeConfig.redirect_uri}&response_type=code&scope=user_info`
	ctx.redirect(path)
}
