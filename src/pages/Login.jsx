import { Link } from "react-router-dom";

const Login = () => {
  return(
    <div>
      <h1>Login</h1>
      <input type='text' placeholder='Email'/>
      <input type='password' placeholder='Password'/>
      <Link to='/dashboard'> Login </Link>
    </div>
  );
};

export default Login;