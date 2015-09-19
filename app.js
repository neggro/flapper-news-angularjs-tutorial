var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),

    indexRoute,
    postsRoute,
    commentsRoute,
    loginRoute,
    registerRoute,

    app = express(),

    mongoose = require('mongoose'),

    passport = require('passport');

// register mongoose models in the application
require('./models/Comment');
require('./models/Post');
require('./models/User');

// passport configuration
require('./config/passport');

mongoose.connect('mongodb://localhost/news');

indexRoute = require('./routes/index');
postsRoute = require('./routes/posts');
commentsRoute = require('./routes/comments');
loginRoute = require('./routes/login');
registerRoute = require('./routes/register');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// init passport
app.use(passport.initialize());

app.use(indexRoute);
app.use(postsRoute);
app.use(commentsRoute);
app.use(loginRoute);
app.use(registerRoute);

// catch 404 and forward to error handler
app.use(function appUseCatch404(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function appUseDevErrorHandler(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function appUseProdErrorHandler(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
