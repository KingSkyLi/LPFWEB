
const { gitConfig } = require('../config/auth-config')
const axiso = require('axios')
const querystring = require('querystring')
exports.authGithub = async (ctx, next) => {
    const { code } = ctx.query
    let params = {
        client_id: gitConfig.clientID,
        client_secret: gitConfig.ciientSecret,
        code: code
    }
    let [error, result] = await axiso.post('https://github.com/login/oauth/access_token', params).then(res => [null, res], err => [err, null])
    if (error) {
        ctx.body = error
        return
    }
    let { access_token } = querystring.parse(result.data)
    if (access_token) {
        let [err, userInfo] = await axiso.get('https://api.github.com/user', {
            headers: {
                accept: 'application/json',
                Authorization: `token ${access_token}`
            }
        }).then(res => [null, res.data], err => [err, null])
        if (err) {
            ctx.body = err
            return
        }
        ctx.body = {
            userInfo
        }
        return
    }

    ctx.body = 123
    return

    await next()

}

