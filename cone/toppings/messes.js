const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Mess = require('../nuts/mess');

router.get('/', (req, res, next) => {
    Mess.find()
    .exec()
    .then( doc => {
        console.log('fetched mess data');
        res.status(200).json(doc);
    })
    .catch( err => {
        console.log(err);
        res.status(500).json({ message: 'Error' });
    });
});

router.post('/', (req, res, next) => {
    const mess = new Mess({
        _id: mongoose.Types.ObjectId(),
        messName: req.body.messName,
        strength: req.body.strength
    });

    mess.save()
    .then(result => {
        console.log(result);
        res.status(200).json({message: 'Success'});
    });
});

module.exports = router;