var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var indexRouter = require('./routes/index');
var userRoutes = require('./routes/users');
var eventRoutes = require('./routes/events');
var orgRoutes = require('./routes/organisation');
var adminRoutes = require('./routes/admin');
var app = express();

if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1);
}

app.use(session({
    secret: process.env.SESSION_SECRET || 'marine-volunteer-dev-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
    }
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Routes
app.use('/', indexRouter);

app.get('/api/health', function(req, res) {
    res.json({ status: 'ok' });
});

app.use('/api', userRoutes);
app.use('/api', eventRoutes);
app.use('/api', orgRoutes);
app.use('/api', adminRoutes);

app.use(function(req, res) {
    if (req.path.startsWith('/api')) {
        return res.status(404).json({ error: 'API route not found' });
    }

    return res.status(404).sendFile(path.join(__dirname, 'public', 'index.html'));
});


module.exports = app;
