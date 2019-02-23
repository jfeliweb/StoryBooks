const express = require('express'),
    router = express.Router();
const mongoose = require('mongoose');
const Story = mongoose.model('stories');
const User = mongoose.model('users')
const {
    ensureAuthenticated,
    ensureGuest
} = require('../helpers/auth');

// Index Stories Route
router.get('/', (req, res) => {
    Story.find({
            status: 'public'
        })
        .populate('user')
        .populate('comments.commentUser')
        .then(stories => {
            res.render('stories/index', {
                stories: stories
            });
        });
});

// Show single story
router.get('/show/:id', (req, res) => {
    Story.findOne({
        _id: req.params.id
    })
    .populate('user')
    .then(story => {
        res.render('stories/show', {
            story: story
        });
    });
});

// Add Stories Form
router.get('/add', ensureAuthenticated, (req, res) => {
    res.render('stories/add');
});

// Edit Stories Form
router.get('/edit/:id', ensureAuthenticated, (req, res) => {
    Story.findOne({
        _id: req.params.id
    })
    .then(story => {
        res.render('stories/edit', {
            story: story
        });
    });
});

// Process add story
router.post('/', (req, res) => {
    let allowComments;

    if (req.body.allowComments) {
        allowComments = true;
    } else {
        allowComments = false;
    }

    const newStory = {
        title: req.body.title,
        body: req.body.body,
        status: req.body.status,
        allowComments: allowComments,
        user: req.user.id
    }

    // Create Story
    new Story(newStory)
        .save()
        .then(story => {
            res.redirect(`/stories/show/${story._id}`);
        });
});

// Edit form Process
router.put('/:id', (req, res) => {
    Story.findOne({
        _id: req.params.id
    })
    .then(story => {
        let allowComments;

        if (req.body.allowComments) {
            allowComments = true;
        } else {
            allowComments = false;
        }
        
        // New Values
        story.title = req.body.title;
        story.body = req.body.body;
        story.status = req.body.status;
        story.allowComments = allowComments;

        story.save().then(story => {
            res.redirect('/dashboard');
        });
    });
});

// Delete Story
router.delete('/:id', (req, res) => {
    Story.deleteOne({_id: req.params.id}).then(() => {
        res.redirect('/dashboard');
    });
});

// Add Comment
router.post('/comment/:id', (req, res) => {
    Story.findOne({
        _id: req.params.id
    })
    .then(story => {
        const newComment = {
            commentBody: req.body.commentBody,
            commentUser: req.user.id
        }

        // Push to comments array
        story.comments.unshift(newComment);

        story.save().then(story => {
            res.redirect(`/stories/show/${story.id}`);
        });
    });
});

module.exports = router;