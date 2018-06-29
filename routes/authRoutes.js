const express = require('express');
const passport = require('passport');

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/surveys');
    }
  );

  app.get('/auth/auth0', (req, res) => {
    var { email, password } = req;
    mongo('mongodb://zoe:rainbow78@mymongoserver.com/agromo', function(db) {
      var users = db.collection('users');
      users.findOne({ email: email }, function(err, user) {
        if (err) return callback(err);

        if (!user) return callback(new Error('Wrong username or password'));
        // WrongUsernameOrPasswordError
        bcrypt.compare(password, user.password, function(err, isValid) {
          if (err) {
            callback(err);
          } else if (!isValid) {
            callback(new Error('Wrong username or password'));
          } else {
            callback(null, {
              user_id: user._id.toString(),
              nickname: user.nickname,
              email: user.email
            });
          }
        });
      });
    });
  });

  app.get(
    '/auth/auth0/callback',
    passport.authenticate('auth0'),
    (req, res) => {
      res.redirect('/surveys');
    }
  );

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
