
/** Content-Start **/
/**  Content-End  **/
class projectRouter {
    async createproject(ctx, next) {
        ctx.body = 'createproject'
        await next();
    }
}

module.exports = {
    projectRouter: new projectRouter()
}
