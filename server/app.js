'use strict';

require('dotenv').load();
const express = require('express');
const path = require('path');
const app = express();
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'views')));

const Razorpay = require('razorpay');

const instance = new Razorpay({
	key_id: process.env.RZP_KEY_ID,
	key_secret: process.env.RZP_KEY_SECRET
});

app.get('/', function (req, res, next) {
	res.render('index', { title: 'Express' });
});

app.get('/api/v1/rzp_capture/:payment_id/:amount', (req, res) => {
	const { payment_id } = req.params;
	const amount = Number(req.params.amount * 100);
	instance.payments.capture(payment_id, amount).then((data) => {
		res.json(data);
	}).catch((error) => {
		res.json(error);
	});
});

app.get('/api/v1/rzp_refunds/:payment_id', (req, res) => {
	const { payment_id } = req.params;
	instance.payments.refund(payment_id).then((data) => {
		res.json(data);
	}).catch((error) => {
		res.json(error);
	});
});



app.listen('3000', () => console.log("Listening on port 3000"))
