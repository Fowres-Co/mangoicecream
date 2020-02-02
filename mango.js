const express = require('express');
const mango = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./cone/toppings/users');

mango.use(morgan('dev'));

mango.use(bodyParser.urlencoded({ extended : false }));
mango.use(bodyParser.json());

mango.use('/users', userRoutes);

module.exports = mango;