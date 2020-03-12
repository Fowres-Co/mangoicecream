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

router.post('/:studentId', (req, res, next) => {

    Att.find({studentId: req.params.studentId})
    .exec()
    .then( doc => {
        if(doc.length > 0) {
            Att.updateOne(
                {studentId: req.params.studentId},
                {
                    ...req.body.breakfast && {breakfast: req.body.breakfast},
                    ...req.body.lunch && {lunch: req.body.lunch},
                    ...req.body.snacks && {snacks: req.body.snacks},
                    ...req.body.dinner && {dinner: req.body.dinner}
                }
            ).then(result => { 
                console.log(result);
                res.status(200).json({ message: 'Success'}); 
            });
        }
        else {
            var att = new Att({
                _id: mongoose.Types.ObjectId(),
                ...req.body.breakfast && {breakfast: req.body.breakfast},
                ...req.body.lunch && {lunch: req.body.lunch},
                ...req.body.snacks && {snacks: req.body.snacks},
                ...req.body.dinner && {dinner: req.body.dinner}
            });
            
            //att.push(req.body);
        
            Student.find({_id: req.params.studentId})
            .exec()
            .then( doc => {
                att.studentId = doc;
                att.save()
                .then( result => {
                    console.log(result);
                    res.status(200).json({ message: 'Success' });
                });
            });
        }
    })
    .catch(err => { res.status(500).json({ message: 'Error' })});
});

module.exports = router;