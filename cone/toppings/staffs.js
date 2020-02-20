const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Staff = require('../nuts/staff');

router.get('/', (req, res, next) => {
    console.log('staff reached');
    res.status(200).json({ message: "Staff Reached" });
});

router.post('/signup', (req, res, next) => {
    const staff = new Staff({
        _id: mongoose.Types.ObjectId(),
        
    });
});

module.exports = router;