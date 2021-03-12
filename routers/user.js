exports.regist = async (ctx, next) => {
	const test = {
		userName: 'lipengfei',
		passWord: '123456',
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
	ctx.body = {
		a: 1,
	};
};

exports.logout = async (ctx, next) => {
	ctx.body = {
		a: 1,
	};
};
