const express = require('express');
const axios = require('axios');
const morgan = require('morgan');
const ExpressError = require('./expressError');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.post('/', async (req, res, next) => {
	try {
		if (req.body.length === undefined) throw new ExpressError('Body of request is empty!', 400);
		console.log(req.body.length, 'REQUEST BODY LENGTH');
		let linksArr = req.body.developers.map((u) => `https://api.github.com/users/${u}`);
		let getLinkData = await Promise.all(linksArr.map(async (link) => await axios.get(link)));
		let results = getLinkData.map((d) => ({ name: d.data.name, bio: d.data.bio }));
		if (results.name === undefined || results.bio === undefined)
			throw new ExpressError('Please enter correct body params');
		return res.send(results);
	} catch (err) {
		return next(err);
	}
});

//if empty request get 404
app.use((req, res, next) => {
	let err = new ExpressError('Please make a valid request', 400);
	return next(err);
});

//error handler
app.use((err, req, res, next) => {
	let message = err.message;
	let status = err.status || 500;
	return res.status(status).send(message);
});

app.listen(3000, console.log('Running on port 3000'));
