const express = require('express'),
      router  = express.Router();
      const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');

// Index Stories Route
router.get('/', (req, res) => {
    res.render('stories/index');
});

// Add Stories Form
router.get('/add', ensureAuthenticated, (req, res) => {
    res.render('stories/add');
});


module.exports = router;