import React from 'react';
import { GoogleLogin } from 'react-google-login';

import { GOOGLE_OAUTH_KEY } from '../../../config/config';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      user: null,
      token: ''
    }
  }

  googleResponse = (res) => {
    console.log(res)
  }

  onFailure = (err) => {
    console.error(err);
  }

  render() {
    return (
      <div>
        {/* This feature is not yet supported, please login via Google
        <form action="">
          <input type="text" placeholder="username"/>
          <input type="text" placeholder="password"/>
        </form>
        <hr/> */}
        <div>
          <GoogleLogin
            clientId={GOOGLE_OAUTH_KEY}
            buttonText="Login"
            onSuccess={this.googleResponse}
            onFailure={this.onFailure}
          />
        </div>
        <div>
          Don't have an account?
          <button name="signup" onClick={this.props.toggleView}>Signup Here!</button>
        </div>
      </div>
    )
  }
}

// const Login = ({ toggleView }) =>
//   <div>
//     {/* This feature is not yet supported, please login via Google
//     <form action="">
//       <input type="text" placeholder="username"/>
//       <input type="text" placeholder="password"/>
//     </form>
//     <hr/> */}
//     <div>
//       login with google
//     </div>
//     <div>
//       Don't have an account?
//       <button name="signup" onClick={toggleView}>Signup Here!</button>
//     </div>
//   </div>

export default Login;