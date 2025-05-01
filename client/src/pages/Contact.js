import React from "react";
import Layout from "./../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
const Contact = () => {
  return (
    <Layout>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/contact-us.png"
            alt="contact-us"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-2">
            any query and info about prodduct feel free to call anytime we 24X7
            vaialible
          </p>
          <h2 className="mt-3">
            <BiMailSend /> : E-wardrobe@gmail.com
          </h2>
          <h2 className="mt-3">
            <BiPhoneCall /> : 0345-1234567
          </h2>
          {/* <p className="mt-3">
            <BiSupport /> : 1800-0000-0000 (toll free)
          </p> */}
        </div>

        <style>
          {`
.col-md-6{
          margin-top: 15%;
           border: 10px solid #000000;
           padding: 3px; 
           margin-left: 10px;
           
          }

          .col-md-4{
          margin-top: 15%;
          font-family: poppins;
           font-weight: bold;

          }
`}
        </style>
      </div>
    </Layout>
  );
};

export default Contact;
