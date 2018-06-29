import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Auth from '../Auth/Auth.js';
import keys from '../config/keys';

class Auth0Component extends Component {
  async componentDidMount() {
    var options = {};
    const auth = await new Auth();
    auth.login();
  }

  render() {
    return <div className="container" />;
  }
}

export default connect(null, actions)(Auth0Component);
