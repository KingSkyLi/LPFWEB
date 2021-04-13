const routerTemplate = `
class {{routerClassName}} {
    {{#each functionList}}
    async {{this.functionName}}(ctx,next){
        ctx.body = {{this.functionName}}
        await next();
    }
    {{/each}}
}
`

module.exports = {
    routerTemplate
}