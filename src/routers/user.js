
/** Content-Start **/
var m;
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
}

module.exports = {
    userRouter: new userRouter()
}
