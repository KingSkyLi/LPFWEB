
/** Content-Start **/
const db = require('../mongoose/db')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const { SECRET_KEY } = require('../../sys-config/server-config')
function md5(content) {
    let md5 = crypto.createHash('md5')
    return md5.update(content).digest('hex')
}
/**  Content-End  **/
class userRouter {
    async regist(ctx, next) {
        const { user } = db
        let { username, password } = ctx.request.body
        let _validation = ctx._validation
        if (_validation) {
            ctx.body = {
                status: 400,
                message: 'Bad Request',
                error: _validation.errors.all()
            }
            return
        }
        let res = await user.findOne({ username: username })
        if (!res) {
            let User = new user({ username: username, password: md5(password) })
            let res = await User.save()
            ctx.body = {
                status: 200,
                message: 'OK',
                error: null,
                data: {
                    _id: res._id,
                    username: res.username,
                    password: res.password
                }
            }
            return
        }
        ctx.body = {
            status: 403,
            message: 'Forbidden',
            error: {
                username: [` username ${username} already exists`]
            }
        }
        await next();
    }
    async login(ctx, next) {
        const { user } = db
        let { username, password } = ctx.request.body
        let _validation = ctx._validation
        if (_validation) {
            ctx.body = {
                status: 400,
                message: 'Bad Request',
                error: _validation.errors.all()
            }
            return
        }
        let res = await user.findOne({ username: username, password: md5(password) })
        if (res) {
            ctx.body = {
                status: 200,
                _id: res._id,
                token: 'Bearer ' + jwt.sign({ username: username, _id: res._id }, SECRET_KEY, { expiresIn: '1h' })
            }
            return
        }
        ctx.body = {
            status: 403,
            message: 'Forbidden',
            error: {
                username: ['Incorrect account or password ']
            }
        }

        await next();
    }
    async test(ctx, next) {
        ctx.body = 'test'
        await next();
    }
}

module.exports = {
    userRouter: new userRouter()
}
