var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var helmet = require('helmet')
var session = require('express-session');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

var GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '303339814215-46e7ksq2f33h7bka3rc2rtkk68krq1i1.apps.googleusercontent.com';
var GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || 'LvMewWkvb5kazKKhxVmliNU-';

passport.serializeUser(function(user, done){
  done(null, user);
});
passport.deserializeUser(function(obj, done){
  done(null, obj);
});

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.HEROKU_URL ? process.env.HEROKU_URL + 'auth/google/callback' : 'http://localhost:8000/auth/google/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function (){
      return done(null, profile);
    })
  }
));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var inputFormRouter = require('./routes/inputForm');

var app = express();
app.use(helmet());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: '17e50c87efa62a62', resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/inputForm', inputFormRouter);

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));
 
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/logout', function(req, res){
  req.logOut();
  res.redirect('/');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
