import { useState } from 'react';
import { NavLink,useNavigate } from 'react-router-dom';
//import {useDispatch} from 'react-redux';
import axios from 'axios';
import './index.css'; // Import the CSS file for styling

const Register = () => {
  const navigate=useNavigate();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  //const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!username || !password || !email){
      alert("Please fill all fields");
    }

    try {
      const response = await axios.post("http://localhost:5000/register",{email,username,password});

      if(!response.data){
        throw new Error("Something went wrong while registering");
      }

      navigate("/login");

    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" value={username} onChange={(e)=> setUsername(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={password} onChange={(e)=> setPassword(e.target.value)} required />
        </div>
        <button type="submit">Register</button>
        <p>Already Have Account:-<NavLink to={"/login"}><a >Login Here</a></NavLink></p>
        <NavLink to={"/"}>
        <button type="button" style={{background: "grey"}}>
          Return to Home
        </button>
        </NavLink>
      </form>
    </div>
  );
};

export default Register;
