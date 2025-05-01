import React from "react";
import Layout from "./../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title={"privacy policy"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/policy.png"
            alt="privacy"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h2>• We use encryption to protect your personal information</h2>
          <h2>• We collect only the data necessary to process your orders.</h2>
          <h2>• We do not track your location without explicit permission.</h2>
          <h2>• We do not share your data with marketing agencies without your consent. </h2>
        </div>
        <style>
          {`

          h2{
          margin-bottom: 30px;
          }
            .col-md-6{
          margin-top: 15%;
           border: 10px solid #000000;
           padding: 3px; 
           margin-left: 10px;
           width: 700px;
           height: 420px;
           
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

export default Policy;
