const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../nuts/user')

router.get('/', (req, res, next) => {
    res.status(200).json({ message: "Users" });
});

router.post('/signup', (req, res, next) => {
    const user = new User({
        _id: mongoose.Types.ObjectId(),
        uEmail: req.body.uEmail,
        uType: req.body.uType,
        uPass: req.body.uPass
    });
    user.save()
    .then( result=> {
        res.status(201).json({ message:'Success' });
    })
    .catch( err => {
        console.log(err);
        res.status(500).json({ message: 'Error Occured' });
    });
});

module.exports = router;