import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/actions/authAction";
import "./index.css"; // Import the CSS file for styling
import axios from "axios";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill out all fields");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      if (!response) {
        throw new Error("Login failed");
      }

      const { userId , username, token } = response.data;
      //console.log(username);
      dispatch(loginSuccess(userId ,username,token));
  

      navigate("/editor");
    } catch (error) {
      console.log("login failed:", error);
      alert(
        "Login failed. Please check your email and password and try again."
      );
    }
  };

  return (
    <div className="login-container">
      <form className="login-form">
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="button" onClick={handleSubmit}>
          Login
        </button>
        <p>Create Account:-<NavLink to={"/register"}><a >Register Here</a></NavLink></p>
        <NavLink to={"/"}>
        <button type="button" style={{background: "grey"}}>
          Return to home
        </button>
        </NavLink>
      </form>
    </div>
  );
};

export default Login;
