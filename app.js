var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var emailRouter = require('./routes/email');

require("./db");

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**
* Please add the following two lines,
* For parse the AWS SES notification events payload
**/
app.use(bodyParser.raw());
app.use(bodyParser.text());

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
* Route for handling the AWS SES notification events
**/
app.use('/api/email-bounce', indexRouter);

/**
* Test route for sending the email
**/
app.get('/api/send-mail', emailRouter);

module.exports = app;
