import { React } from "react";

const LoginForm = (props) => {

  return(
    <div>
      <h1>Login</h1>
      <input type='text' placeholder='Email'/>
      <input type='password' placeholder='Password'/>
      <button>Click</button>
    </div>
  );
};

export default LoginForm;