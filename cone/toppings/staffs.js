const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    console.log('staff reached');
    res.status(200).json({ message: "Staff Reached" });
});

module.exports = router;