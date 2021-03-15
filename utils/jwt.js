const jsonwebtoken = require('jsonwebtoken');
const koajwt = require('koa-jwt');
const secret = 'LPFWEB'

module.exports = async function getToken(userName, userId) {
    let token = jsonwebtoken.sign(
        { userName, userId },  // 加密userToken
        SECRET,
        { expiresIn: '1h' }
    )
}

