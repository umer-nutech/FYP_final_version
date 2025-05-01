import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "./../../context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Login - Ecommerce App">
      <style>{`
        body {
          background-color: #1E1E1E;
        }
        .form-container {
          max-width: 500px;
          margin: 450px auto;
          padding: 30px;
          background-color: #2C2C2C;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0,0,0,0.5);
        }
        .form-container h4.title {
         font-family: poppins;
        font-weight: bold;
          color: #FFBE0B;
          text-align: center;
          margin-bottom: 30px;
          font-size: 2.5rem;
        }
        .form-control {
          background-color: #1E1E1E;
          color: #fff;
          border: 1px solid #3A86FF;
        }
        .form-control::placeholder {
          color: #bbb;
        }
        .btn-primary {
          background-color: #3A86FF;
          border: none;
        }
        .btn-primary:hover {
          background-color: #3366CC;
        }
      `}</style>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h4 className="title">LOGIN FORM</h4>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Email"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
          </div>
          <div>
            <button type="submit" className="login-button">
              LOGIN
            </button>
          </div>
          <div className="mb-4">
            <button
              type="button"
              className="forgot-button"
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              Forgot Password
            </button>
          </div>
        </form>

        <style>
          {`

          .login-button{
           background-color: #ffffff;
                  border-radius: 50px;
                  margin-left: 100px;
                  margin-top: 20px;
                  font-weight: bold;
                  font-family: poppins;
                  font-size: 1.5rem;
                  width: 50%;
                   display: flex;
  justify-content: center;
  align-items: center;
          }
                  .forgot-button{
                  background-color: #ffffff;
                  border-radius: 50px;
margin-top: 10px;
                  margin-left: 100px;
                  font-weight: bold;
                  font-family: poppins;
                  font-size: 1.5rem;
                  width: 50%;
                   display: flex;
  justify-content: center;
  align-items: center;

  .mb3{
   font-weight: bold;
                  font-family: poppins;
  }
                  
                  



                  
                  }
                  `}
        </style>
      </div>
    </Layout>
  );
};

export default Login;
