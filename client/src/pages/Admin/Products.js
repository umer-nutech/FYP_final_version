import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  //get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-10 d-flex flex-column">
          <h1 className="text-center mt-5 mb-4"></h1>
          <div className="d-flex flex-wrap justify-content-center">
            {products?.map((p) => (
              <Link
                key={p._id}
                to={`/dashboard/admin/product/${p.slug}`}
                className="product-link"
              >
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />

                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <style>
          {`
          .text-center{
          margin-top: 20%;
          }
         
 .card-img-top
      {
      height: 350px;
      object-fit: cover;
      }

      .card-title
      {
      color: #ffffff;
      font-size: 1.5rem;
      font-family: poppins;

      }

      
      .card-img-top
      {
      height: 350px;
      object-fit: cover;
      }
      .card-body
      {
      background-color: #1e1e1e;
      }
`}
        </style>
      </div>
    </Layout>
  );
};

export default Products;
