const path = require("path");
const fs = require("fs").promises;
const { encrypto } = require("./crypto");

async function readFolder(currPath) {
	console.log(currPath);
	const data = await fs.readdir(currPath);
	const result = [];
	for (let i of data) {
		result.push({
			name: i,
			type: (await fs.stat(path.join(currPath, i))).isFile() ? 1 : 0,
			cipher: encrypto(i),
		});
	}
	console.log(result);
	return result;
}

module.exports = readFolder;
