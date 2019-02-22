const express = require('express'),
      router  = express.Router();
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');

router.get('/', ensureGuest, (req, res) => {
    res.render('index/welcome');
});

router.get('/about', (req, res) => {
    res.render('index/about');
});

router.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.render('index/dashboard');
});

module.exports = router;