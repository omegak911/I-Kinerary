import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
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