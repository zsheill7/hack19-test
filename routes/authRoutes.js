const express = require('express');
const multer = require('multer');
const passport = require('passport');
var AWS = require('aws-sdk');
var s3 = new AWS.S3();
// Make sure you set this env variable correctly
var bucketName = process.env.AWS_BUCKET_NAME;
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  subregion: 'us-east-1'
});

// Multer config
// memory storage keeps file data in a buffer
const upload = multer({
  storage: multer.memoryStorage(),
  // file size limitation in bytes
  limits: { fileSize: 52428800 }
});

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

  app.get(
    '/auth/auth0',
    passport.authenticate('auth0', {
      scope: ['profile', 'email']
    })
  );

  app.get('/uploadHandler', async (req, res) => {
    exports.handler = (event, context) => {
      if (!event.hasOwnProperty('contentType')) {
        context.fail({ err: 'Missing contentType' });
      }

      if (!event.hasOwnProperty('filePath')) {
        context.fail({ err: 'Missing filePath' });
      }

      var params = {
        Bucket: bucketName,
        Key: event.filePath,
        Expires: 3600,
        ContentType: event.contentType
      };

      s3.getSignedUrl('putObject', params, (err, url) => {
        if (err) {
          context.fail({ err });
        } else {
          context.succeed({ url });
        }
      });
    };
    res.send(user);
  });

  app.post('/upload', upload.single('theseNamesMustMatch'), (req, res) => {
    // req.file is the 'theseNamesMustMatch' file
    s3.putObject(
      {
        Bucket: 'your-bucket-name',
        Key: 'your-key-name',
        Body: req.file.buffer,
        ACL: 'public-read' // your permisions
      },
      err => {
        if (err) return res.status(400).send(err);
        res.send('File uploaded to S3');
      }
    );
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
