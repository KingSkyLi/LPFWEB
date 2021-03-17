const RouterConfig = {
	user: [
		{ method: 'POST', path: '/regist', functionName: 'regist' },
		{ method: 'POST', path: '/login', functionName: 'login' },
		{ method: 'POST', path: '/logout', functionName: 'logout' },
		{ method: 'GET', path: '/loginByGithub', functionName: 'loginByGithub' },
	],
	auth: [
		{
			method: 'GET', path: '/auth/github', functionName: 'authGithub'
		}
	],
	project: [
		{
			method: 'POST', path: '/addProject', functionName: 'addProject'
		}
	],
	application: [{ method: 'POST', path: '/createApplication', functionName: 'createApplication' }],
};

module.exports = {
	RouterConfig,
};
