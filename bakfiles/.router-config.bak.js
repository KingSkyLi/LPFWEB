/** 
 * 在这里配置接口路由
 * 通用接口配置{}
 * 当前接口加入中间件{ method: 'POST', path: '/regist', functionName: 'regist', middleware:function }
 * 当前接口加参数校验规则{ method: 'POST', path: '/regist', functionName: 'regist', validatorRules:{username:'required | string'} }
*/
const userRules = require('../src/validator-rules/user-api-rules')

const RouterList = {
    user: [
        { method: 'POST', path: '/regist', functionName: 'regist', validatorRules: userRules.regist },
        { method: 'POST', path: '/login', functionName: 'login', validatorRules: userRules.login },
        { method: 'POST', path: '/test', functionName: 'test' }
    ]
};

module.exports = {
    RouterList
}