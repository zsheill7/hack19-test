import history from '../history';
import auth0 from 'auth0-js';
import keys from '../config/keys';

//import mongo from 'mongo';
//import bcrypt from 'bcrypt';
//import mongoose from 'mongoose';
import request from 'superagent';

//const User = mongoose.model('users');

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: keys.auth0Domain,
    clientID: keys.auth0ClientID,
    redirectUri: keys.callbackUrl,
    audience: `https://${keys.auth0Domain}/userinfo`,
    responseType: 'token id_token',
    scope: 'openid'
  });

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  async login(email, password, callback) {
    request
      .post('/auth/auth0')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send({ email: email, password: password })
      .end(function(err, res) {
        console.log(res.text);
      });
    // auth0.parseHash({ hash: window.location.hash }, function(err, authResult) {
    //   if (err) {
    //     return console.log(err);
    //   }
    //
    //   auth0.client.userInfo(authResult.accessToken, function(err, user) {
    //
    //   });
    // });
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        history.replace('/home');
      } else if (err) {
        history.replace('/home');
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  setSession(authResult) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    // navigate to the home route
    history.replace('/home');
  }

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
    history.replace('/home');
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}
