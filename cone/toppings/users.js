const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../nuts/user');

router.get('/', (req, res, next) => {
    User.find()
    .exec()
    .then( doc => {
        console.log("All users fetched.");
        res.status(201).json(doc);
    })
    .catch( err => {
        console.log(err);
        res.status(500).json({ error: 'Error in fetching users.'});
    });
});

router.post('/login', (req, res, next) => {
    console.log('..login..');
    User.find({ uEmail: req.body.uEmail })
    .exec()
    .then(user => {
        console.log('Body:',req.body.uEmail,req.body.uPass,'user:',user);
        if(user.length < 1)
            return res.status(401).json({auth: false, message: 'No user'});
        else if(user[0].uPass == req.body.uPass && user[0].uEmail == req.body.uEmail)
            return res.status(200).json({auth: true, uType: user[0].uType});
        else
            return res.status(401).json({auth: false});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({message: 'Error'});
    });
});

router.post('/signup', (req, res, next) => {
    console.log('signup', req.body);
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