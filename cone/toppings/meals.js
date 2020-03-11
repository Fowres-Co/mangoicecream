const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Meal = require('../nuts/meal');
const Mess = require('../nuts/mess');

router.get('/', (req, res, next) => {
    Meal.find()
    .exec()
    .then( doc => {
        res.status(201).json(doc);
    })
    .catch( err => {
        res.status(500).json({ message: 'Error'});
    });
});

router.post('/', (req, res, next) => {
    const meal = new Meal({
        _id: mongoose.Types.ObjectId(),
        mealItems: req.body.mealItems,
        mealTime: req.body.mealTime
    });

    Mess.find()
    .exec()
    .then( doc => {
        //console.log(meal);
        meal.messId = doc[0];
        meal.save()
        .then( result => {
            console.log(result);
            res.status(201).json({ message: 'Success' });
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({ message: 'Error' });
        });
    })
    .catch(err => {
        console.log(err);
    });
});

module.exports = router;