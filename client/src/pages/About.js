import React from "react";
import Layout from "./../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About us -E commerce app"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/about-us.png"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="about-heading1"> About Us</h1>
          <h1 className="about-heading"> Welcome to E-WARDROBE</h1>

          <h2 className="about-us">
            We offer a virtual try-on feature that lets you see how clothing
            fits before making a purchase. Experience a smarter, more confident
            way to shop from the comfort of your home.
          </h2>
        </div>

        <style>
          {`

.row.contactus{
width: 100%;
}
          .col-md-6{
          margin-top: 15%;
           border: 10px solid #000000;
           padding: 3px; 
           margin-left: 10px;
          }
            .about-us{
            font-family: poppins;

            }
            .about-heading{
            font-family: poppins;
            font-weight: bold;
          margin-top: 50%;

            }
          .about-heading1{
          font-family: poppins;
            font-weight: bold;
            position: absolute;
            left: 42%;
            font-size: 4rem;
            }
            
            `}
        </style>
      </div>
    </Layout>
  );
};
Layout.defaultProps = {
  title: "Ecommerce app - shop now",
  description: "mern stack project",
  keywords: "mern, react,node,mongodb",
  author: "Muhammad Umer Qureshi",
};
export default About;
