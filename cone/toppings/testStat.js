const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Stat = require('../nuts/dstats');

router.get('/', (req, res, next) => {
    Stat.find()
    .then( doc => {
        res.status(200).json(doc);
    })
    .catch( err => {
        console.log(err);
        res.status(500).json({ message: 'Error' });
    });
});

router.post('/', (req, res, next) => {
    var stat = new Stat({
        _id: mongoose.Types.ObjectId(),
        messId: req.body.messId,
    });
    stat.save()
    .then( result => {
        res.status(200).json({ message:'Success' });
    })
    .catch( err => {
        console.log(err);
        res.status(500).json({ message: 'Error Occured' });
    });
});

module.exports = router;