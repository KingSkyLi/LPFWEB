
/** Content-Start **/
var a = 0
/**  Content-End  **/
class userRouter {
    async regist(ctx, next) {
        ctx.body = 'regist'
        console.log(db.user)
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
