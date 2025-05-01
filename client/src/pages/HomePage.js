import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import SearchInput from "../components/Form/SearchInput";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    getAllCategory();
    getTotal();
    getAllProducts();
  }, []);

  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data.success) setCategories(data.category);
    } catch (error) {
      console.log(error);
    }
  };

  // Get total product count
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  // Get all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // Load more products
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (page > 1) loadMore();
  }, [page]);
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length && !radio.length) {
      getAllProducts();
    } else {
      filterProduct();
    }
  }, [checked, radio]);

  // get filtered products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  //slider for animation
  const heroImages = [
    "/images/Hero_img.png",
    "/images/Hero_img_2.png",
    "/images/Hero_img_3.png",
  ];

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentImage((prev) => (prev + 1) % heroImages.length);
  }, 3000); // Change image every 3 seconds

  return () => clearInterval(interval);
}, []);


  return (
    <Layout title="Shop">
      {/* 
       Section */}
      <div
        className="hero-section"
        style={{
          backgroundImage: `url(${heroImages[currentImage]})`,
        }}
      ></div>

      {/* Search & Filters */}
      <div className="container-fluid mt-4 ">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="fw-bold">All Products</h2>
          <div className="search-box">
            <SearchInput />
          </div>
        </div>
      </div>

      {/* Filters & Product Grid
      < className="container-fluid row mt-3">
        {/* Sidebar Filters */}
      {/* <div className="col-md-2">
          <div className="p-3 bg-light rounded shadow-sm">
            <h5 className="text-center">Filter by Category</h5>
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => setChecked([...checked, c._id])}
              >
                {c.name}
              </Checkbox>
            ))} */}

      {/* <h5 className="text-center mt-3">Filter by Price</h5>
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <Radio key={p._id} value={p.array}>
                  {p.name}
                </Radio>
              ))}
            </Radio.Group> */}

      {/* <button
              className="btn btn-danger mt-3 w-100"
              onClick={() => window.location.reload()}
            >
              Reset Filters
            </button>
          </div> */}

      {/* Products Grid */}
      <div className="col-md-15">
        <div className="d-flex flex-wrap justify-content-center">
          {products?.map((p) => (
            <div
              className="card product-card m-3 shadow-sm border-0"
              key={p._id}
            >
              <img
                src={`/api/v1/product/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body text-center">
                <h5 className="card-title fw-bold">{p.name}</h5>

                <p className="card-text fw-bold">${p.price}</p>
                <div className="d-flex justify-content-center gap-2">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    Details
                  </button>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("Added to Cart");
                    }}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() =>
                      navigate(`/tryon/${p._id}`, {
                        state: {
                          clothImage: `/api/v1/product/product-photo/${p._id}`,
                        },
                      })
                    }
                  >
                    Try-On
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {products.length < total && (
          <div className="text-center my-4">
            <button
              className="btn btn-warning"
              onClick={() => setPage(page + 1)}
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
      </div>

      {/* Styles */}

      <style>
        {`

.container-fluid
{
width: 94%;
}

 .btn
            {
            background-color: #ffffff;
            font-weight: bold;
            font-family: poppins;

            }

        .search-box{
        width: 50px;
        }

.product-grid{
width:100%;}
/* Hero Section */
.hero-section {
   transition: background-image 3s ease-in-out, opacity 1s ease-in-out;
   background-size: cover;
   background-position: center top -10px;
   color: #ffffff;
   padding: 220px 0 150px;
   min-height: 800px;
   display: flex;
   align-items: center;
   justify-content: center;
   text-align: center;
   backdrop-filter: blur(5px);
   opacity: 1;
}

.hero-section.fade-out {
   opacity: 0;
}

/* Search Box */
.search-box {
  width: 320px;
  background: rgba(255, 255, 255, 0.1);
  padding: 10px;
  border-radius: 3rem;
  // box-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
}

.search-box button {
padding: 0px 30px;
    border-radius: 1rem;
  background: black;
  color: white;
  border: none;
  font-weight: bold;
  transition: all 0.3s ease-in-out;
}



/* Product Card */
.product-card {
  width: 20rem;
  height: 480px;
  display: flex;
  flex-direction: column;
  border-radius: 14px;
  background: rgba(20, 20, 20, 0.95);
  border: 2px solid rgba(0, 255, 255, 0.25);
  box-shadow: 0 8px 30px rgba(0, 255, 255, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
  backdrop-filter: blur(10px);
}

.product-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 35px rgba(255, 0, 255, 0.5);
  border-color: rgba(255, 0, 255, 0.6);
}

/* Product Image */
.product-card img {
  height: 220px;
  object-fit: contain;
  border-bottom: 1px solid rgba(0, 255, 255, 0.2);
  background-color: #1a1a1a;
}

/* Card Body */
.card-body {
  flex-grow: 1;
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: #f8f8f8;
  background-color: rgba(30, 30, 30, 0.95);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

/* Product Title */
.card-title {
  font-size: 2rem;
  font-weight: bold;
  color: #ffffff;
  font-family: poppins;
  margin-bottom: 0.5rem;
  text-transform: capitalize;
  letter-spacing: 0.4px;
  
}

/* Product Description */
.card-text {
font-family: poppins;
  font-size: 2.5rem;
  color: #ffffff;
  background-color: green;
  margin-bottom: 0.5rem;
  border-radius: 10px;
  line-height: 1.5;
  max-height: 3.2em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

/* Product Price */
.product-price {
  font-size: 1.6rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0.6rem 0;
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.4);
}

/* Add to Cart Button */
.card-button {
  padding: 0.6rem 1.4rem;
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
  background: linear-gradient(135deg, #00bcd4, #009688);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 3px 8px rgba(0, 188, 212, 0.3);
  transition: background 0.3s ease, transform 0.2s ease;
}

.card-button:hover {
  background: linear-gradient(135deg, #00acc1, #00796b);
  transform: translateY(-2px);
}

/* Button Container */
.button-container {
  display: flex;
  flex-direction: column; /* Stack vertically */
  align-items: center;
  gap: 8px;
}

/* Futuristic Buttons */
.btn-sm {
  width: 100px;
  font-size: 14px;
  font-weight: bold;
  padding: 8px 12px;
  text-transform: uppercase;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

/* Primary Button - now white */
.btn-primary {
 background-color: #ffffff !important;
    color: #000000 !important;
  border: 1px solid #ccc;
}

.btn-primary:hover {
  background: #f0f0f0;
  color: #000000;
}

/* Secondary Button - now white */
.btn-secondary {
 background-color: #ffffff !important;
    color: #000000 !important;
  border: 1px solid #ccc;
}

.btn-secondary:hover {
  background: #e0e0e0;
  color: #000000;
}

/* Sidebar Filters */
.p-3.bg-light.rounded.shadow-sm {
  background: #2E2E2E;
  border-radius: 12px;
  padding: 20px;
  color: #E0E0E0;
  border: 1px solid #3C3C3C;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

/* Filter Headings */
.p-3.bg-light.rounded.shadow-sm h5 {
  font-size: 1.2rem;
  font-weight: bold;
  color: #D4D4D4;
  text-align: center;
}

/* Checkboxes & Radios */
.ant-checkbox-wrapper, .ant-radio-wrapper {
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-weight: bold;
  color: #D4D4D4;
  transition: all 0.3s ease-in-out;
}

.ant-checkbox .ant-checkbox-inner,
.ant-radio .ant-radio-inner {
  background: #3C3C3C;
  border-color: #575757;
  border-radius: 4px;
  transition: all 0.3s ease-in-out;
}

.ant-checkbox-checked .ant-checkbox-inner,
.ant-radio-checked .ant-radio-inner {
  background: #575757;
  border-color: #909090;
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.1);
}

.ant-checkbox-wrapper:hover,
.ant-radio-wrapper:hover {
  color: #A8A8A8;
}

/* Reset Filters Button */

.btn-yellow.mt-3.w-100 {
  background: #444;
  font-weight: bold;
  color: #E0E0E0;
  border-radius: 10px;
  border: none;
  transition: all 0.3s ease-in-out;
}
.btn-yellow {
background-color: yellow;
}
.btn-yellow.mt-3.w-100:hover {
  background: #5A5A5A;
  color: white;
}
`}
      </style>
    </Layout>
  );
};

export default HomePage;
