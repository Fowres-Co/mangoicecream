const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Lboard = require('../nuts/lboard');
const Student = require('../nuts/student');

router.get('/', (req, res, next) => {
    Lboard.find()
    .then( doc => {
        res.status(200).json(doc);
    })
    .catch( err => {
        console.log(err);
        res.status(500).json({ message: 'Error' });
    });
});

router.post('/:studentId', (req, res, next) => {
    var lboard = new Lboard({
        _id: mongoose.Types.ObjectId()
    });
    Student.findOne({_id: req.params.studentId})
    .then(doc => { 
        lboard.studentId = doc;
        lboard.save()
        .then( result => {
            console.log(result);
            res.status(200).json({message: 'Success'});
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({ message: 'Error' });
        }); 
    });
});

router.get('/top10', (req, res, next) => {
    Lboard.find()
    .then( doc => {
        var sorrtedList = doc.sort( (a, b) => a.scoreTotal<b.scoreTotal ? 1:-1 );
        res.status(200).json(sorrtedList.slice(0,11));
    });
});

module.exports = router;
