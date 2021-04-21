
/** Content-Start **/
let db = require('../mongoose/db')
/**  Content-End  **/
class userRouter {
    async regist(ctx, next) {
        ctx.body = 'regist'
        console.log(db.user)
        await next();
    }
    async login(ctx, next) {
        ctx.body = 'login'
        await next();
    }
}

module.exports = {
    userRouter: new userRouter()
}
