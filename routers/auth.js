
const { gitConfig, giteeConfig } = require('../config/auth-config')
const axiso = require('axios')
const querystring = require('querystring')
// 目前github获取token有bug，定位中
exports.authGithub = async (ctx, next) => {
    const { code } = ctx.query
    let params = {
        client_id: gitConfig.clientID,
        client_secret: gitConfig.ciientSecret,
        code: code
    }
    let [error, result] = await axiso.post(`https://github.com/login/oauth/access_token`, params).then(res => [null, res], err => [err, null])
    if (error) {
        ctx.body = {
            errorMsg: error.response || error
        }
        return
    }
    let { access_token } = querystring.parse(result.data)
    if (access_token) {
        ctx.body = {
            access_token
        }
    }
    await next()
}

exports.authGitee = async (ctx, next) => {
    const { code } = ctx.query
    const params = {
        "grant_type": "authorization_code",
        code: code,
        client_id: giteeConfig.clientID,
        redirect_uri: giteeConfig.redirect_uri,
        client_secret: giteeConfig.clientSecret
    }

    let [err, result] = await axiso.post('https://gitee.com/oauth/token', params).then(res => [null, res], err => [err, null])
    if (err) {
        ctx.body = {
            errorMsg: err.response.data
        }
        console.log(err.response.data)
        return
    }
    let { access_token } = result.data
    if (access_token) {
        ctx.body = {
            access_token
        }
    }
    await next()
}
