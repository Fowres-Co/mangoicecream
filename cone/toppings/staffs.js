const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Staff = require('../nuts/staff');
const User = require('../nuts/user');

router.get('/', (req, res, next) => {
    console.log('staff reached');
    res.status(200).json({ message: "Staff Reached" });
});

router.post('/signup', (req, res, next) => {
    console.log('staff signup reached');
    const staff = new Staff({
        _id: mongoose.Types.ObjectId(),
        staffRole: req.body.staffRole,
        staffName: req.body.staffName
    });
    const user = new User({
        _id: mongoose.Types.ObjectId(),
        uPass: req.body.uPass,
        uEmail: req.body.uEmail,
        uType: 0
    });
    user.save()
    .catch( err => { console.log('error in making new user',err) });
    staff.uId = user;
    staff.save()
    .then(result => {
        console.log(result);
        res.status(201).json({ message: 'Success'});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({message: 'Error'});
    });
});

module.exports = router;