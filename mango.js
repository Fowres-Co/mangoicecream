const express = require('express');
const mango = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const staffRoutes = require('./cone/toppings/staffs');

mango.use(morgan('dev'));

mango.use(bodyParser.urlencoded({ extended : false }));
mango.use(bodyParser.json());

mango.use('/staffs', staffRoutes);

module.exports = mango;