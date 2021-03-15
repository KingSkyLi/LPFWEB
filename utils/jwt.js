const jsonwebtoken = require('jsonwebtoken');
const koajwt = require('koa-jwt');
const SECRET = 'LPFWEB';

async function getToken(userName, userId) {
	let token = jsonwebtoken.sign(
		{ userName, userId }, // 加密userToken
		SECRET,
		{ expiresIn: '1h' }
	);
	console.log(token);
	return token;
}

module.exports = {
	getToken,
};
