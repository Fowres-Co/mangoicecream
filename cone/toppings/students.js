const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Mess = require('../nuts/mess');
const Student = require('../nuts/student');
const User = require('../nuts/user');

router.get('/', (req, res, next) => {
    Student.find()
    .exec()
    .then( doc => {
        res.status(200).json(doc);
    })
    .catch(err => { res.status(500).json(err); });
});

router.post('/', (req, res, next) => {
    const student = new Student({
        _id: mongoose.Types.ObjectId(),
        studentName: req.body.studentName
    });
    const user = new User({
        _id: mongoose.Types.ObjectId(),
        uPass: req.body.uPass,
        uEmail: req.body.uEmail,
        uType: 0
    });

    user.save()
    .catch( err => { console.log('error in making new user',err) });
    student.uId = user;

    Mess.find()
    .exec()
    .then( doc => {
        student.messId = doc[0];
        student.save()
        .then( result => {
            console.log(result);
            res.status(200).json({ message: 'Success' });
        })
        .catch(err => { res.status(500).json({ message: 'Error' })});
    })
    .catch(err => { res.status(500).json({ message: 'Error' })});
});

module.exports = router;