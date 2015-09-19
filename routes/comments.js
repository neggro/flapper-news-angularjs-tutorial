var express = require('express'),
    router = express.Router(),

    mongoose = require('mongoose'),
    PostModel = mongoose.model('Post'),
    CommentModel = mongoose.model('Comment'),

    jwt = require('express-jwt'),

    auth = jwt({
        secret: 'SECRET',
        userProperty: 'payload'
    });

// POST
router.post('/posts/:post/comments', auth, commentCreate);

// COMMENT MIDDLEWARE
router.param('comment', commentMiddleware);

// POST MIDDLEWARE
router.param('post', postMiddleware);

// PUT
router.put('/comments/:comment/upvote', auth, commentUpvote);

function commentCreate(req, res, next) {

    var comment = new CommentModel(req.body);
    comment.post = req.post;
    comment.author = req.payload.username;

    comment.save(function commnetSaveCallback(err, comment) {

        if (err) {
            return next(err);
        }

        req.post.comments.push(comment);
        req.post.save(function postSaveCallback(err, post) {

            if (err) {
                return next(err);
            }

            res.json(comment);
        });
    });
}

function commentMiddleware(req, res, next, id) {

    var query = CommentModel.findById(id);

    query.exec(function queryCommentCallback(err, comment) {

        if (err) {
            return next(err);
        }

        if (!comment) {
            return next(new Error('can\'t find comment'));
        }

        req.comment = comment;
        return next();
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

function commentUpvote(req, res, next) {

    req.comment.upvote(function commentUpvoteCallback(err, comment) {

        if (err) {
            return next(err);
        }

        res.json(comment);
    });
}

module.exports = router;
