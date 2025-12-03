import React, { useState, useContext } from "react";
import "./Login.scss";
import IMG from "../../assets/blacklogoamazon.png";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoginContext } from "../../Context/ContextProvider";
 

function Login() {
  const { account, setAccount } = useContext(LoginContext);
  const navigate = useNavigate();

  const [data, setData] = useState({ email: "", password: "" });

  const addData = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const sendData = async (e) => {
    e.preventDefault();
    const { email, password } = data;

    try {
      const res = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",  
      });

      if (!res.ok) {
        toast.warn("Invalid login credentials.", { position: "top-center" });
        return;
      }

      const responseData = await res.json();

     
localStorage.setItem("userID", responseData.user._id);
localStorage.setItem("userName", responseData.user.name);
setAccount(responseData.user);

      toast.success("Login successful!", { position: "top-center" });

      setData({ email: "", password: "" });
      setAccount(responseData.user);  
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Server error, please try again later.", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="sign">
      <div className="sign_container">
        <div className="sign_header">
          <Link to="/">
            <img src={IMG} alt="Amazon Logo" />
          </Link>
        </div>
        <div className="sign_form">
          <form onSubmit={sendData}>
            <h1>Sign In</h1>
            <div className="form_data">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={addData}
                value={data.email}
                required
              />
            </div>
            <div className="form_data">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="At least 6 characters"
                onChange={addData}
                value={data.password}
                required
              />
            </div>
            <button className="sign_btn" type="submit">
              Continue
            </button>
          </form>
        </div>
        <div className="create_account">
          <p>New to Amazon?</p>
          <Link to="/register" className="create_account_link">
            <button className="sign_btn">Create Your Amazon Account</button>
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
