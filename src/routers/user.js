
/** Content-Start **/
var a = 1
/**  Content-End  **/
/** Content-Start **/
/**  Content-End  **/
class userRouter {
    async regist(ctx, next) {
        ctx.body = 'regist'
        await next();
    }
    async login1(ctx, next) {
        ctx.body = 'login1'
        await next();
    }
}

module.exports = {
    userRouter: new userRouter()
}
