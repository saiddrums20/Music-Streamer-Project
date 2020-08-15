const express = require('express');
const router = express.Router();

router.get('/',(req,res) => {
    res.render('index', { title: 'My Express Music App', message: 'hello'})
});

module.exports = router;