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

router.get('/now', (req, res, next) => {
    var d = new Date();
    var h = d.getHours(), m = d.getMinutes();
    var ob = {mealTime: null};
    if(h<=10 || h>21)
        ob.mealTime = 'breakfast';
    else if(h>10 && h<=14)
        ob.mealTime = 'lunch';
    else if(h>14 && h<=18)
        ob.mealTime = 'snacks';
    else
        ob.mealTime = 'dinner';
    Meal.findOne(ob)
    .exec()
    .then( doc => {
        console.log(ob,'\n//',doc);
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