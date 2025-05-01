import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ name, email, password, phone, address, answer });
    try {
      const res = await axios.post("/api/v1/auth/register", {
        name,
        email,
        password,
        phone,
        address,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Register Ecommerce App">
      <div className="form-container">
        <h1>Register Page</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="name"
              placeholder="Enter your Name"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="email"
              placeholder="Enter your Email"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="password"
              placeholder="Enter your Password"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              id="phone"
              placeholder="Enter your Phone"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              id="address"
              placeholder="Enter your Address"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="answer"
              placeholder="What is your best friend's name?"
              required
            />
          </div>

          <button type="submit" className="btn-submit">
            Submit
          </button>
        </form>
      </div>

      <style>{`
      body {
          background-color: #1E1E1E;
        }
          .btn-submit{
           background-color: #ffffff;
                  border-radius: 50px;
                  margin-left: 150px;
                  font-weight: bold;
                  font-family: poppins;
                  font-size: 1.5rem;
                  width: 30%;
                   display: flex;
  justify-content: center;
  align-items: center;
          }

        .form-container {
          background-color: #1E1E1E;
          padding: 30px;
          border-radius: 10px;
          max-width: 500px;
          margin: 200px auto;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
        }

        .form-container h1 {
        font-family: poppins;
        font-weight: bold;
          color: #FFBE0B;
          text-align: center;
          margin-bottom: 30px;
          font-size: 2.5rem;
        }

        .form-container form {
          display: flex;
          flex-direction: column;
        }

        .form-control {
          background-color: #333;
          color: #fff;
          border: 1px solid #555;
          padding: 12px;
          border-radius: 6px;
          margin-bottom: 20px;
          font-size: 1rem;
        }

        .form-control::placeholder {
          color: #aaa;
        }

        
        
      `}</style>
    </Layout>
  );
};

export default Register;
