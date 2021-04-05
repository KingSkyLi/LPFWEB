const Router = require('koa-router');
const router = new Router({ prefix: '/api' });
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const { RouterConfig } = require('../config/router-config');

const functionTemplate = `
exports.FUNCTIONNAME =  async ( ctx, next )=>{
    ctx.body = {
        a:1
    }
}
`;

async function readRouterConfig(params) {
	return new Promise((resolve, reject) => {
		let promiseList = [];
		Object.keys(RouterConfig).forEach((item) => {
			promiseList.push(createRouterFile(item, RouterConfig[item]));
		});
		Promise.all(promiseList).then(() => {
			resolve();
		});
	});
}

async function createRouterFile(fileName, options) {
	let content = '';
	let contenChanged = false;
	let file = path.resolve(__dirname, fileName + '.js');
	let res = await promisify(fs.exists)(file);
	if (!res) {
		contenChanged = true;
		options.forEach((item) => {
			content += functionTemplate.replace('FUNCTIONNAME', item.functionName);
		});
	} else {
		content = await (await promisify(fs.readFile)(file)).toString();
		options.forEach((item) => {
			if (!content.includes(`exports.${item.functionName} `)) {
				contenChanged = true;
				content += functionTemplate.replace('FUNCTIONNAME', item.functionName);
			}
		});
	}
	if (contenChanged) {
		await promisify(fs.writeFile)(file, content);
	}
}

function reginsRoutes() {
	let dir = path.resolve(__dirname, './')
	let a = fs.readdirSync(dir)
	a.forEach(file => {
		if (file.endsWith('.js')) {
			let key = file.replace('.js', '')
			if (!RouterConfig[key] && key !== 'index') {
				fs.unlinkSync(dir + '/' + file)
			}
		}
	})
	Object.keys(RouterConfig).forEach((item) => {
		let file = path.resolve(__dirname, item + '.js');
		let data = require(file);
		RouterConfig[item].forEach((api) => {
			let method = api.method.toLowerCase();
			router[method](api.path, data[api.functionName]);
		});
		Object.keys(data).forEach((fnName) => {
			if (!RouterConfig[item].find((item) => item.functionName === fnName)) {
				let content = fs.readFileSync(file).toString().split('\n');
				let start = content.findIndex((item) => item.startsWith('exports.' + fnName + ' '));
				let n = start;
				while (true) {
					n++;
					if (content[n] === '};' || content[n] === '}') {
						break;
					}
				}
				content.splice(start, n);
				let newContent = '';
				content.forEach((item) => {
					newContent += item + '\n';
				});
				fs.writeFileSync(file, newContent);
			}
		});
	});
	return router;
}

module.exports = {
	run: async () => {
		await readRouterConfig();
		let router = reginsRoutes();
		return router;
	},
};
