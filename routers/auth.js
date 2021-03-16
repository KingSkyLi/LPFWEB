
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
    let res = await axiso.post('https://github.com/login/oauth/access_token', params)
    let { access_token } = querystring.parse(res.data)
    let [err, userInfo] = await axiso.get('https://api.github.com/user', {
        headers: {
            accept: 'application/json',
            Authorization: `token ${access_token}`
        }
    }).then(res => [null, res.data], err => [err, null])
    if (err) {
        ctx.body = err
        await next()
        return
    }
    ctx.body = {
        userInfo
    }
}

