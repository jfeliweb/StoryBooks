const express = require('express'),
      router  = express.Router();

router.get('/', (req, res) => {
    res.render('index/welcome');
});

router.get('/about', (req, res) => {
    res.render('index/about');
});

router.get('/dashboard', (req, res) => {
    res.render('index/dashboard');
});

module.exports = router;