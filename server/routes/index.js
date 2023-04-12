const express = require('express');
const router = express.Router();

const Razorpay = require('razorpay');

const instance = new Razorpay({
	key_id: process.env.RZP_KEY_ID,
	key_secret: process.env.RZP_KEY_SECRET
});

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get('/api/v1/rzp_capture/:payment_id/:amount', (req, res) => {
	const { payment_id } = req.params;
	const amount = Number(req.params.amount * 100);
	instance.payments.capture(payment_id, amount).then((data) => {
		res.json(data);
	}).catch((error) => {
		res.json(error);
	});
});

router.get('/api/v1/rzp_refunds/:payment_id', (req, res) => {
	const { payment_id } = req.params;
	instance.payments.refund(payment_id).then((data) => {
		res.json(data);
	}).catch((error) => {
		res.json(error);
	});
});

module.exports = router;
