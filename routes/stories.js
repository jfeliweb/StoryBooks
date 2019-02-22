const express = require('express'),
      router  = express.Router();

// Index Stories Route
router.get('/', (req, res) => {
    res.render('stories/index');
});

// Add Stories Form
router.get('/add', (req, res) => {
    res.render('stories/add');
});


module.exports = router;