const express = require('express');
const mango = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const staffRoutes = require('./cone/toppings/staffs');
const userRoutes = require('./cone/toppings/users');
const mealRoutes = require('./cone/toppings/meals');
const messRoutes = require('./cone/toppings/messes');
const studentRoutes = require('./cone/toppings/students');
const rsvpRoutes = require('./cone/toppings/rsvp');

mongoose.connect('mongodb+srv://forster:abcd@cluster0-g9sl4.mongodb.net/test?retryWrites=true&w=majority',  {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.catch( err => {
    console.log('Mongodb connection error.', err);
});

mango.use(morgan('dev'));

mango.use(bodyParser.urlencoded({ extended : false }));
mango.use(bodyParser.json());

mango.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if(req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

//routes
mango.use('/staffs', staffRoutes);
mango.use('/users', userRoutes);
mango.use('/meals', mealRoutes);
mango.use('/messes', messRoutes);
mango.use('/students', studentRoutes);
mango.use('/rsvp', rsvpRoutes);

//handling error
mango.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

//this catches all other erros
mango.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = mango;