var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var PostModel = mongoose.model('Post');
var CommentModel = mongoose.model('Comment');

var jwt = require('express-jwt');

var auth = jwt({
    secret: 'SECRET',
    userProperty: 'payload'
});

// GET (all)
router.get('/posts', getAllPosts);

// POST
router.post('/posts', auth, createPost);

// MIDDLEWARE
router.param('post', postMiddleware);

// GET (by id)
router.get('/posts/:post', getById);

// PUT
router.put('/posts/:post/upvote', auth, postUpvote);

// DELETE
router.delete('/posts/:post', auth, deletePost);

function getAllPosts(req, res, next) {

    PostModel.find(function findPostCallback(err, posts) {
        if (err) {
            return next(err);
        }

        res.json(posts);
    });
}

function createPost(req, res, next) {

    var post = new PostModel(req.body);
    post.author = req.payload.username;

    post.save(function savePostCallback(err, post) {

        if (err) {
            return next(err);
        }

        res.json(post);
    });
}

function postMiddleware(req, res, next, id) {

    var query = PostModel.findById(id);

    query.exec(function queryPostCallback(err, post) {

        if (err) {
            return next(err);
        }

        if (!post) {
            return next(new Error('can\'t find post'));
        }

        req.post = post;
        return next();
    });
}

function getById(req, res) {

    req.post.populate('comments', function postPopulateCallback(err, post) {

        if (err) {
            return next(err);
        }

        res.json(post);
    });
}

function postUpvote(req, res, next) {

    req.post.upvote(function postUpvoteCallback(err, post) {

        if (err) {
            return next(err);
        }

        res.json(post);
    });
}

function deletePost(req, res, next) {

    // first remove the comments of this post
    CommentModel.remove({
        post: req.post._id
    }, function removeCommentsCallback(err) {

        if (err) {
            return next(err);
        }

        // then remove the post
        PostModel.remove({
            _id: req.post._id
        }, function removeCallback(err) {
            if (err) {
                return next(err);
            }

            res.json({
                success: true
            });
        });
    });
}

module.exports = router;
