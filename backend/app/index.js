const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const productRouter = require('./api/product');

const app = express();

app.use(cors({ origin: 'http://localhost:1234' }));
app.use(bodyParser.json());

app.use('/product', productRouter);

app.use((err, req, res, next) => {
	const statusCode = err.statusCode || 500;

	res.status(statusCode).json({
		type: 'error',
		message: err.message
	});
});


module.exports = app;