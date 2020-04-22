const express = require('express');
const productRouter = require('./api/product');

const app = express();

app.use('/product', productRouter);

app.use((err, req, res, next) => {
	const statusCode = err.statusCode || 500;

	res.status(statusCode).json({
		type: 'error',
		message: err.message
	});
});


module.exports = app;