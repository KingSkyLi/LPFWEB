const dockerController = require('../utils/docker-control')
const crypto = require('crypto');


/**
 * 
 * @param { projectName:string,clientPort:string,serverPort:string,dbPort:string } ctx.request.body 
 * @param {*} next 
 */
exports.addProject = async (ctx, next) => {
    let { projectName, clientProt, serverPort, dbPort } = ctx.requset.body;
}
