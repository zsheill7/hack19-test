import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Auth from '../Auth/Auth.js';

class Auth0Component extends Component {
  componentDidMount() {
    const auth = new Auth();
    auth.login();
  }

  render() {
    return <div className="container" />;
  }
}

export default connect(null, actions)(Auth0Component);
