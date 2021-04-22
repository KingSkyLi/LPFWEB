
/** Content-Start **/
const db = require('../mongoose/db')
/**  Content-End  **/
class userRouter {
    async regist(ctx, next) {
        let _validation = ctx._validation
        console.log(_validation.errors.all())
        ctx.body = ctx.request.body
        await next();
    }
    async login(ctx, next) {
        ctx.body = 'login'
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
