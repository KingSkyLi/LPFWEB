
class applicationRouter {
    async createApplication(ctx, next) {
        ctx.body = 'createApplication'
        await next();
    }
}

module.exports = {
    applicationRouter: new applicationRouter()
}
