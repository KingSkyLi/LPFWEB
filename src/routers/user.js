
/** Content-Start **/
var a = 0
/**  Content-End  **/
class userRouter {
    async regist(ctx, next) {
        ctx.body = 'regist'
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
