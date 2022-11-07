'use strict';

require('dotenv').load();
const express = require('express');
const app = express();

const Razorpay = require('razorpay');

const instance = new Razorpay({
  key_id: process.env.RZP_KEY_ID,
  key_secret: process.env.RZP_KEY_SECRET
});

app.all('/*', (req, res, next) => {

  const allowedReferers = ['http://localhost:8080', 'https://ashwamegh.github.io/razorpay-react-demo'];
  console.log("req.headers.origin", req.headers.origin);
  if (allowedReferers.indexOf(req.headers.origin) !== -1) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
  } else {
    res.header('Access-Control-Allow-Origin', null);
  }
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type,token, Access-Control-Request-Method, Access-Control-Request-Headers');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

console.log("process.env.NODE_ENV")



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

app.listen(process.env.PORT || 3000
  , () => console.log("Listening on port 3000"))
