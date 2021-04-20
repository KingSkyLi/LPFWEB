
class userRouter {
    async regist(ctx, next) {
        ctx.body = 'regist'
        await next();
    }
    async login(ctx, next) {
        ctx.body = 'login'
        await next();
    }
    async logout(ctx, next) {
        ctx.body = 'logout'
        await next();
    }
    async loginByGithub(ctx, next) {
        ctx.body = 'loginByGithub'
        await next();
    }
    async loginByGitee(ctx, next) {
        ctx.body = 'loginByGitee'
        await next();
    }
}

module.exports = {
    userRouter: new userRouter()
}
