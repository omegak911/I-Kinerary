import React from 'react';

const Signup = ({ toggleView }) =>
  <div>
    {/* This feature is not yet supported, please Signup via Google
    <form action="">
      <input type="text" placeholder="username"/>
      <input type="text" placeholder="password"/>
    </form>
    <hr/> */}
    <div>
      Signup with google
    </div>
    <div>
      Already have an account?
      <button name="login" onClick={toggleView}>Login Here!</button>
    </div>
  </div>

export default Signup;