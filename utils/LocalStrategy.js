const passport = require('passport');
const crypto = require('crypto');
const LocalStrategy = require('passport-local');
const User = require('../models/userModel');
const session = require('express-session');

exports.useLocalStrategy = (req, res, next) => {
  passport.use(User.createStrategy());
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
  next();
};
