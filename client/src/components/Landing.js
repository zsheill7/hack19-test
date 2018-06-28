import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Landing extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`);
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth == true;
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>Agromo!</h1>
        <div>
          <Navbar fluid>
            <Navbar.Header>
              <Button
                bsStyle="primary"
                className="btn-margin"
                onClick={this.goTo.bind(this, 'home')}
              >
                Home
              </Button>
              {!isAuthenticated && (
                <Button
                  bsStyle="primary"
                  className="btn-margin"
                  //onClick={this.login.bind(this)}
                >
                  <a href="/auth/auth0">Login With Auth0</a>
                </Button>
              )}
              {isAuthenticated && (
                <Button
                  bsStyle="primary"
                  className="btn-margin"
                  onClick={this.logout.bind(this)}
                >
                  Log Out
                </Button>
              )}
            </Navbar.Header>
          </Navbar>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Landing);
