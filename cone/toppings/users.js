const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    console.log('users reached');
    res.status(200).json({ message: "Users Reached" });
});

module.exports = router;