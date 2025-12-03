import React, { useState } from "react";
import IMG from "../../assets/blacklogoamazon.png";
import { Divider } from "@mui/material";
import { Link } from "react-router-dom";
 import { ToastContainer, toast } from "react-toastify";
 import "react-toastify/dist/ReactToastify.css";
import "./Register.scss";
function Register() {
  const [Data, setData] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
    cpassword: "",
  });
  console.log(Data);

  const sendData = async (e) => {
    e.preventDefault();
    const { name, email, number, password, cpassword } = Data;
    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        number,
        password,
        cpassword,
      }),
    });
    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !Data) {
        toast.warn("data is invalid", {
          position: "top-center",
        });
    } else {
     toast.success("", {
       position: "top-center",
     });
      setData({
        ...Data,
        name: "",
        email: "",
        number: "",
        password: "",
        cpassword: "",
      });
    }
  };

  return (
    <div className="sign">
      <div className="sign_container">
        <div className="sign_header">
          <img src={IMG} alt="login_img" />
        </div>
        <div className="sign_form">
          <form>
            <h1>Sign In</h1>
            <div className="form_data">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                name="name"
                id="name"
                onChange={(e) => setData({ ...Data, name: e.target.value })}
                value={Data.name}
              />
            </div>
            <div className="form_data">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={(e) => setData({ ...Data, email: e.target.value })}
                value={Data.email}
              />
            </div>

            <div className="form_data">
              <label htmlFor="number">Number</label>
              <input
                type="text"
                name="number"
                id="number"
                onChange={(e) => setData({ ...Data, number: e.target.value })}
                value={Data.number}
              />
            </div>

            <div className="form_data">
              <label htmlFor="password">password</label>
              <input
                type="password"
                password="password"
                id="password"
                placeholder="At Least 6 Char"
                onChange={(e) => setData({ ...Data, password: e.target.value })}
                value={Data.password}
              />
            </div>

            <div className="form_data">
              <label htmlFor="password">Password Again</label>
              <input
                type="password"
                password="password"
                id="cpassword"
                placeholder="At Least 6 Char"
                onChange={(e) =>
                  setData({ ...Data, cpassword: e.target.value })
                }
                value={Data.cpassword}
              />
            </div>

            <button className="sign_btn" onClick={sendData}>
              Continue
            </button>
            <Divider />
            <div className="signin_info">
              <p>Already have an account?</p>
              <Link to="/login">Sign in</Link>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default Register;
