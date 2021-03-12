const RouterConfig = {
	user: [
		{ method: 'POST', path: '/regist', functionName: 'regist' },
		{ method: 'POST', path: '/login', functionName: 'login' },
	],
	application: [{ method: 'POST', path: '/createApplication', functionName: 'createApplication' }],
};

module.exports = {
	RouterConfig,
};
