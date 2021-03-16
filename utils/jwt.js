const jsonwebtoken = require('jsonwebtoken');
const koajwt = require('koa-jwt');
const SECRET = 'LPFWEB';

async function getToken(userName, userId) {
	let token = jsonwebtoken.sign(
		{ userName, userId }, // 加密userToken
		SECRET,
		{ expiresIn: 15 }
	);
	return token;
}

async function uncheckToken(app, unlessPath) {
	app.use(koajwt({
		secret: SECRET
	}).unless({
		path: unlessPath.unless
	}))
}

module.exports = {
	getToken,
	uncheckToken
};
