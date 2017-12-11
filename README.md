# Razorpay React Demo

[![npm](https://img.shields.io/npm/v/razorpay.svg?maxAge=2592000?style=flat-square)](https://www.npmjs.com/package/razorpay)
[![react](https://i.imgur.com/n7etgPr.png)](https://reactjs.org/)

A demo of Razorpay Node Sdk with React.js showcasing the payments and refunds scenarios: 

## Getting Started

```bash
git clone https://github.com/shashank7200/razorpay-react-demo.git
cd razorpay-react-demo
```

## Prerequisites

> Get your Razorpay API keys [`key_id` and `key_secret`] for test environment variables from here, [https://dashboard.razorpay.com/#/app/keys](https://dashboard.razorpay.com/#/app/keys)

## Installation

### For Frontend

```bash
npm install or yarn
touch .env
```

Copy the contents from `sample.env` to `.env` and replace the dumb characters(`xxxxx`) with your Razorpay `key` and the Server URL, which you will be creating soon(local default is already there in the file).

```bash
npm start or yarn start
```



### For Backend/Server 
> Note:  Server Needed to talk with Razorpay using Node SDK

```bash
cd server
npm install or yarn
touch .env
```
Copy the contents from `sample.env` to `.env` and replace the dumb characters(`xxxxx`) with your Razorpay `key` and `secret`

Now run,
```bash
npm start or yarn start
```

You can goto http://localhost:8080 and try out this demo, later you can deploy the server code to server app containers like **heroku, glitch, aws, etc** and replace the URL in frontend's `.env` file with your new server URL.

## Licence

MIT Licensed.




