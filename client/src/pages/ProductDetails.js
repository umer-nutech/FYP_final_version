import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container mt-3">
        <div className="row align-items-center">
          <div className="col-md-6 text-center">
            <img
              src={`/api/v1/product/product-photo/${product._id}`}
              alt={product.name}
              className="img-fluid product-main-img"
            />
          </div>
          <div className="col-md-6 product-details-box">
            <h2 className="mb-4">Product Details</h2>
            <h6>
              <strong>Name:</strong> {product.name}
            </h6>
            {/* <h6>
              <strong>Description:</strong> {product.description}
            </h6> */}
            <h6>
              <strong>Price:</strong> ${product.price}
            </h6>
            <h6>
              <strong>Category:</strong> {product?.category?.name}
            </h6>
            <button className="btn btn-primary mt-1">Add to Cart</button>
          </div>
        </div>

        <hr className="my-5" />

        <div>
          <h3 className="mb-4">Similar Products</h3>
          {relatedProducts.length < 1 ? (
            <p className="text-center">No Similar Products Found</p>
          ) : (
            <div className="row">
              {relatedProducts.map((p) => (
                <div className="col-md-4 mb-4" key={p._id}>
                  <div className="card product-card h-90">
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text ">$ {p.price}</p>
                      <button className="btn ">Add to Cart</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`

.product-main-img{
height: 360px;
}

        .product-details-box
        {
        margin-left: 20px;
        margin-top: 10%;
        width: 550px%;
        height: 360px;
        }

        .text-center{
        margin-top: 100px;
        width: 250px;
        }

        align-items-center
        {
        margin-right: 30%;
        }


      .btn{
      background-color: #ffffff;
      color: #000000 ;
      font-weight: bold;
      font-family: poppins;
      padding: 15px 30px;
      font-size: 1.3rem;
      
      }

      .card-img-top
      {
      height: 350px;
      object-fit: cover;
      }

      .card-title
      {
      font-size: 2.2rem;
      font-family: poppins;

      }

      .card-text
      {
       font-size: 2.2rem;
      font-family: poppins;
      background-color: green;
      width: 23%;
      border-radius: 10px;
     
      }
        .product-main-img {
          width: 100%;
          max-width: 400px;
          border: 2px solid #ddd;
          border-radius: 12px;
          object-fit: contain;
          transition: transform 0.3s ease;
          margin-top: 20%;
        }

        .product-main-img:hover {
          transform: scale(1.05);
        }

        .product-details-box {
          background-color: #f9f9f9;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }

        

        .product-details-box h2 {
          color: #000000;
        }

        .product-details-box h6 {
          color: #444;
          line-height: 1.6;
          font-size: 1.5rem;
        }

        .product-card {
          background: #1e1e1e;
          border: 1px solid #444;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;
          color: #fff;
        }



        
        @media (max-width: 767px) {
          .product-main-img {
            max-width: 100%;
          }

          .product-details-box {
            margin-top: 2rem;
          }
        }
      `}</style>
    </Layout>
  );
};

export default ProductDetails;
