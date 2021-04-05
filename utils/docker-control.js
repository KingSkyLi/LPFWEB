const docker = new require('dockerode')();
const path = require('path');

/**
 * 获取所有镜像列表，或通过指定repository:tag，列出指定镜像
 * @param {string} repository repository:tag
 * @returns [err,imagelist]
 */
async function listImages(repository = '') {
	let options;
	console.log(repository)
	repository ? options = { filters: JSON.stringify({ reference: [repository] }) } : options = { all: true }
	let [err, res] = await docker.listImages(options).then(
		(res) => {
			return [null, res];
		},
		(err) => {
			return [err, null];
		}
	);
	if (err) {
		return [err, null]
	}
	return [null, res]
}

/**
 *
 * 构建image
 * @param {string} name 必填 repository:tag
 * @returns
 */
async function buidImage(name) {
	let context = path.resolve(__dirname, '../dockerfiles/' + name);
	let stream = await docker.buildImage(
		{
			context: context,
			src: ['Dockerfile'],
		},
		{ t: name + ':v1' }
	);
	let [err, result] = await new Promise((resolve, reject) => {
		docker.modem.followProgress(stream, (err, res) => {
			let res_errors = res.filter((item) => item.error);
			if (err || res_errors.length) {
				err ? reject(err) : reject(res_errors);
				return;
			}
			resolve(res);
		});
	}).then(
		(res) => [null, res],
		(err) => [err, null]
	);
	if (err) {
		return err;
	}
	return result;
}

/**
 * 列出所有容器，或通过ID列出指定容器
 *
 * @param {string} [containerID='']
 * @returns
 */
async function listContainers(containerID = '') {
	let options;
	containerID ? options = { all: true, filters: JSON.stringify({ id: [containerID] }) } : options = { all: true }
	let [err, res] = await docker.listContainers(options).then(res => [null, res], err => [err, null]);
	if (err) {
		return [err, null]
	}
	return [null, res]
}

// /**
//  * 删容器
//  *
//  * @param {string} [containerID='']
//  * @returns
//  */
// async function removeContainer(containerID) {
// 	let container = docker.getContainer(containerID)
// 	let result = await new Promise((resolve, reject) => {
// 		container.remove(function (err, data) {
// 			if (err) {
// 				reject(err)
// 			}
// 			resolve(data)
// 		})
// 	}).then(res => [null, res], err => [err, null])
// 	return result
// }

/**
 * 创建容器
 *
 * @param {*} imageName 镜像
 * @param {*} serverport 服务端口
 * @param {*} clinetport 客户端端口
 * @returns
 */
async function createContainer(imageName, serverport, clinetport) {
	if (!imageName || !serverport || !clinetport) {
		return ['imageName、serverport、clinetport不能为空', null]
	}
	let result = docker.createContainer({
		Image: imageName,
		Cmd: ['/bin/bash', '-c', 'tail -f /etc/nginx/nginx.conf'],
		ExposedPorts: { '3000/tcp': {}, '80/tcp': {} },
		HostConfig: {
			PortBindings: {
				'3000/tcp': [{
					HostIp: '0.0.0.0',
					HostPort: serverport,
				}],
				'80/tcp': [{
					HostIp: '0.0.0.0',
					HostPort: clinetport,
				}],
			}
		}
	}).then(res => [null, res.id], err => [err, null])
	return result
}

/**
 * 启动容器
 *
 * @param {*} containerId 容器ID
 * @returns
 */
async function startContainer(containerId) {
	let container = docker.getContainer(containerId)
	let result = new Promise((resolve, reject) => {
		container.start((err, data) => {
			if (err) {
				reject(err)
				return
			}
			resolve(data)
		})
	}).then(res => [null, `容器：${containerId} 启动成功`], err => [err, null])
	return result
}

/**
 * 停止容器
 *
 * @param {*} containerId 容器ID
 * @returns
 */
async function stopContainer(containerId) {
	let container = docker.getContainer(containerId)
	let result = new Promise((resolve, reject) => {
		container.stop((err, data) => {
			if (err) {
				reject(err)
				return
			}
			resolve(data)
		})
	}).then(res => [null, `容器：${containerId} 停止成功`], err => [err, null])
	return result
}

/**
 * 删除容器
 *
 * @param {*} containerId 容器ID
 * @returns
 */
async function removeContainer(containerId) {
	let container = docker.getContainer(containerId)
	let result = new Promise((resolve, reject) => {
		container.remove((err, data) => {
			if (err) {
				reject(err)
				return
			}
			resolve(data)
		})
	}).then(res => [null, `容器：${containerId} 删除成功`], err => [err, null])
	return result
}

module.exports = {
	listImages,
	buidImage,
	listContainers,
	removeContainer,
	createContainer,
	startContainer,
	stopContainer,
}
