const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Att = require('../nuts/attendance')
const Student = require('../nuts/student');
const Lboard = require('../nuts/lboard');
const Stat = require('../nuts/dstats');

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
        Lboard.findOne({studentId: req.params.studentId})
        .exec()
        .then( doc => { 
            Lboard.updateOne({_id: doc._id}, { scoreTotal: doc.scoreTotal + 1 + doc.streak})
            .then( result => {
                //console.log(result);
                return;
            });
         });
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
                //console.log(result);
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
                    //console.log(result);
                    res.status(200).json({ message: 'Success' });
                });
            });
        }
    })
    .catch(err => { res.status(500).json({ message: 'Error' })});

    Student.find({_id: req.params.studentId})
    .exec()
    .then( doc => {
        Stat.findOne({messId: doc[0].messId})
        .then( stat => {
            console.log(stat, doc[0]);
            var bf = stat.breakfast;
            var lun = stat.lunch;
            var sn = stat.snacks;
            var din = stat.dinner;
            console.log({
                ...req.body.breakfast && {breakfast: req.body.breakfast==-1?[bf[0]+1,bf[1]]:[bf[0],bf[1]+1]},
                ...req.body.lunch && {lunch: req.body.lunch==-1?[lun[0]+1,lun[1]]:[lun[0],lun[1]+1]},
                ...req.body.snacks && {snacks: req.body.snacks==-1?[sn[0]+1,sn[1]]:[sn[0],sn[1]+1]},
                ...req.body.dinner && {dinner: req.body.dinner==-1?[din[0]+1,din[1]]:[din[0],din[1]+1]}
            }, stat._id);
            Stat.updateOne(
                {_id: stat._id}, 
                {
                    ...req.body.breakfast && {breakfast: req.body.breakfast==-1?[bf[0]+1,bf[1]]:[bf[0],bf[1]+1]},
                    ...req.body.lunch && {lunch: req.body.lunch==-1?[lun[0]+1,lun[1]]:[lun[0],lun[1]+1]},
                    ...req.body.snacks && {snacks: req.body.snacks==-1?[sn[0]+1,sn[1]]:[sn[0],sn[1]+1]},
                    ...req.body.dinner && {dinner: req.body.dinner==-1?[din[0]+1,din[1]]:[din[0],din[1]+1]}
                }
            ).then();
        });
    });
});

module.exports = router;