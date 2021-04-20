
class authRouter {
    async authGithub(ctx, next) {
        ctx.body = 'authGithub'
        await next();
    }
    async authGitee(ctx, next) {
        ctx.body = 'authGitee'
        await next();
    }
}

module.exports = {
    authRouter: new authRouter()
}
