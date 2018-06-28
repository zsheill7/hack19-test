const passport = require('passport');
var AWS = require('aws-sdk');
var s3 = new AWS.S3();
// Make sure you set this env variable correctly
var bucketName = process.env.AWS_BUCKET_NAME;

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

  app.use(
    '/s3',
    require('react-dropzone-s3-uploader/s3router')({
      bucket: 'webuploadtest1',
      //region: 'us-east-1', //optional
      //headers: { 'Access-Control-Allow-Origin': '*' }, // optional
      ACL: 'private' // this is default
    })
  );

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
