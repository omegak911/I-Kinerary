import React from 'react';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';

import { GOOGLE_OAUTH_KEY } from '../../../config/config';

class Authenticate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  googleResponse = (res) => {
    console.log(res)
    let token = res.tokenObj;

    axios
      .post(`/api/auth/${this.props.view}`, token)
      .then(({ data }) => {
        console.log(data);
        this.props.history.push({
          pathname: '/home',
          state: {
            user: data //user object with email, username + trip array
          }
        });
      })
      .catch(err => console.error(err))
    
  }

  onFailure = (err) => {
    console.error(err);
  }

  showLoginOrSignup = () => {
    let views = {
      login: {
        status: `Don't`,
        tagName: 'signup',
        tagMsg: 'Signup'
      },
      signup: {
        status: `Already`,
        tagName: 'login',
        tagMsg: 'Login'
      }
    }

    let { status, tagName, tagMsg } = views[this.props.view];

    return (
      <div>
        {status} have an account?
        <button name={tagName} onClick={this.props.toggleView}>{tagMsg} Here!</button>
      </div>
    )
  }

  render() {
    return (
      <div>
        {/* This feature is not yet supported, please Signup via Google
        <form action="">
          <input type="text" placeholder="username"/>
          <input type="text" placeholder="password"/>
        </form>
        <hr/> */}
        <h2>{this.props.view.toUpperCase()}</h2>
        <div>
          <GoogleLogin
            clientId={GOOGLE_OAUTH_KEY}
            buttonText="Login"
            onSuccess={this.googleResponse}
            onFailure={this.onFailure}
          />
        </div>
        {this.showLoginOrSignup()}
      </div>
    )
  }
}

export default Authenticate;