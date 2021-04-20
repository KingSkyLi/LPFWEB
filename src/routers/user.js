
class userRouter {
    async regist(ctx, next) {
        ctx.body = 'regist'
        await next();
    }
    async login123(ctx, next) {
        ctx.body = 'login123'
        await next();
    }
}

module.exports = {
    userRouter: new userRouter()
}
