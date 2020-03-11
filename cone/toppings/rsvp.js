const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Att = require('../nuts/attendance')
const Student = require('../nuts/student');

router.get('/', (req, res, next) => {
    Att.find()
    .exec()
    .then( doc => {
        res.status(200).json(doc);
    })
    .catch(err => { res.status(500).json(err); });
});

router.post('/', (req, res, next) => {
    const att = new Att({
        _id: mongoose.Types.ObjectId()
    })

    Student.find()
    .exec()
    .then( doc => {
        att.messId = doc[0];
        att.save()
        .then( result => {
            console.log(result);
            res.status(200).json({ message: 'Success' });
        })
        .catch(err => { res.status(500).json({ message: 'Error' })});
    })
    .catch(err => { res.status(500).json({ message: 'Error' })});
});

module.exports = router;