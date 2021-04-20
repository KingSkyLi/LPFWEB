const routerTemplate = `
class {{routerClassName}} {
    {{#each functionList}}
    {{#if this.isExist}}
    {{{this.text}}}
    {{/if}}
    {{#if this.functionBody}}
    {{{this.functionBody}}}
    {{else}}
    async {{this.functionName}}(ctx, next) {
        ctx.body = '{{this.functionName}}'
        await next();
    }
    {{/if}}
    {{/each}}
}

module.exports = {
    {{routerClassName}}: new {{routerClassName}}()
}
`

module.exports = {
    routerTemplate
}