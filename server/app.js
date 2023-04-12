'use strict';

require('dotenv').load();
const express = require('express');
const path = require('path');
const app = express();
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);



app.listen('3000', () => console.log("Listening on port 3000"))
