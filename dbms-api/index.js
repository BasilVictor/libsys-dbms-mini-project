var createError = require('http-errors');
var path = require('path');
var logger = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken')

var booksRouter = require('./routes/booksRouter');
var finesRouter = require('./routes/finesRouter');
var authRouter = require('./routes/authRouter');

const app = express();

// const authRoute = require('./routes/auth');

app.use(logger('dev'));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
    next();
});

// app.use('/api/user', authRoute);

app.use('/api/books', booksRouter);
app.use('/api/fines', finesRouter);
app.use('/api/auth', authRouter);

app.listen(3000, () => {
    console.log("Starting Server on PORT 3000");
})