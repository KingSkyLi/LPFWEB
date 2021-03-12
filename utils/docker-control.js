const docker = new require('dockerode')();
const path = require('path');
const { get } = require('https');

/**
 * 
 * @param {string} repository repository:tag
 * @returns [err,imagelist]
 */
async function getImageList(repository = '') {
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


async function listImage(name) {
	let [err, res] = await docker.listImages({ all: true }).then(
		(res) => {
			return [null, res];
		},
		(err) => {
			return [err, null];
		}
	);
	if (err) {
		return Promise.reject(err);
	}
	if (name) {
		return res.filter((item) => item.RepoTags.includes(name));
	}
	return res;
}

async function buidImage(name) {
	let context = path.resolve(__dirname, '../dockerfiles/' + name);
	console.log(context);
	let stream = await docker.buildImage(
		{
			context: context,
			src: ['Dockerfile'],
		},
		{ t: name + ':v1' }
	);
	let n = 0;
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
		console.log(err);
		return;
	}
	return result;
}

async function listContainers() {
	let res = await docker.listContainers({ all: true });
	return res;
}

async function deleteContainer(containers) {
	containers.forEach((item) => {
		var container = docker.getContainer(item.Id);
		container.remove((err, data) => {
			console.log(err);
		});
	});
}

async function createContainer() {
	docker.run('ubuntu', ['bash', '-c', 'uname -a'], process.stdout, function (err, data, container) {
		console.log(data.StatusCode);
	});
}

async function testFn() {
	let res = await getImageList()
	console.log(res)
}
testFn()
