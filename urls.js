const lineReader = require('line-reader');
const fs = require('fs');
const axios = require('axios');

function handleOutputData(data, out) {
	fs.writeFile(out, data, 'utf8', (err) => {
		if (err) {
			console.log('ERROR:', err);
			process.exit(1);
		}
		console.log('Successfully added data');
	});
}

function makeFiles(path) {
	lineReader.eachLine(path, (line, last) => {
		out = getOut(line);
		webCat(line, out);
		console.log(out);
		if (last) console.log('end of file');
	});
}

async function webCat(url, out) {
	try {
		let resp = await axios.get(url);
		handleOutputData(resp.data, out);
	} catch (err) {
		console.log(`Error fetching: ${url}. Please check url and try again`, err);
	}
}

let out;

function getOut(line) {
	let string;
	if (line.slice(7, 11) === 'www') {
		string = string.slice(11);
	} else {
		string = line.slice(7);
	}
	out = string.split('/')[0];
	return out;
}

path = process.argv[2];
makeFiles(path);

module.exports = {
	makeFiles,
	handleOutputData,
	webCat
};
