const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');
const Auth0Strategy = require('passport-auth0');
import mongo from 'mongo';
import bcrypt from 'bcrypt';
const User = mongoose.model('users');

const auth0 = require('auth0-js');
//hi
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ userId: profile.id });

      if (existingUser) {
        return done(null, existingUser);
      }

      const user = await new User({ userId: profile.id }).save();
      done(null, user);
    }
  ) /*,
  new Auth0Strategy(
    {
      domain: 'agromo.auth0.com',
      clientID: 'zBfvmY45rbc7ucimEMCJds4VW6tsBvBZ',
      clientSecret:
        '3Dc4aMq0X0i5VMCwE36hybLiwUnHi4qWQo7TnyHUzAPFuy4Ghrzpv9Tj7KnBV5cT',
      callbackURL: 'http://localhost:3000/auth/auth0/callback',
      audience: 'https://agromo.auth0.com/userinfo',
      responseType: 'token id_token',
      scope: 'openid'
    },

    function(accessToken, refreshToken, extraParams, profile, done) {
      // accessToken is the token to call Auth0 API (not needed in the most cases)
      // extraParams.id_token has the JSON Web Token
      // profile has all the information from the user
      const auth = new Auth();
      auth.login();
      return done(null, profile);
    }
  )*/
);
