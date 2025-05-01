import React from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  // total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        total = total + Number(item.price || 0);
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
      return "$0.00";
    }
  };

  // delete item
   const removeCartItem = (pid) => {
     try {
       let myCart = [...cart];
       let index = myCart.findIndex((item) => item._id === pid);
       myCart.splice(index, 1);
       setCart(myCart);
       localStorage.setItem("cart", JSON.stringify(myCart));
     } catch (error) {
       console.log(error);
     }
   };

  return (
    <Layout>
      <div className="container cart-container">
        <div className="row">
          <div className="col-md-12 text-center">
            <h1 className="cart-header">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="cart-subheader">
              {cart?.length
                ? `You Have ${cart?.length} Items In Your Cart  ${
                    auth?.token ? "" : "please login to checkout"
                  }`
                : "Your Cart is Empty"}
            </h4>
          </div>
        </div>

        <div className="row">
          <div className="col-md-8">
            {cart?.map((p) => (
              <div
                className="row mb-3 p-3 cart-item-card align-items-center"
                key={p._id}
              >
                <div className="col-md-4 text-centerr">
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="img-fluid cart-product-img"
                    alt={p.name}
                  />
                </div>
                <div className="col-md-8 des">
                  <h5>{p.name}</h5>
                  <p>
                    <strong>Price:</strong> ${p.price}
                  </p>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="col-md-4 cart-summary">
            <h2>Cart Summary</h2>
            <hr />
            <h4>Total: {totalPrice()}</h4>
            {auth?.user?.address ? (
              <div className="mb-3">
                {/* <h4>Current Address</h4> */}
                {/* <h5>{auth?.user?.address}</h5>
                <button
                  className="btn btn-outline-warning"
                  onClick={() => navigate("/dashboard/user/profile")}
                >
                  Update Address
                </button> */}
              </div>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Please login to checkout
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
      .text-center {
      margin-top: 80px;
      color: #1e1e1e;
      }
      .text-centerr {
      margin-top: 20px;
      height:50px;
      }
.des
{
margin-top: -50px;
font-family: poppins;
font-size: 1.8rem;
margin-left: 200px;
color: #ffffff;
}
.col-md-8
{
margin-left:200px;
}
img-fluid
{
color: #1e1e1e;
background-color: #1e1e1e;
}
      .cart-summary{
      
      font-family: poppins;
      height: 200px;
      margin-left: 500px;
      }
  .cart-container {
    margin-top: 40px;
    padding: 20px;
  }

  .cart-header {
    font-size: 2rem;
    background-color: #1e1e1e;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 20px;
    color: #ffffff;
    font-weight: bold;
    font-family: poppins;
  }

  .cart-subheader {
    font-size: 1.1rem;
    color: #444;
    margin-bottom: 30px;
  }

  .cart-item-card {
    background-color: #1e1e1e;
    border: 1px solid #1e1e1e;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .cart-item-card:hover {
    transform: scale(1.01);
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  }

  .cart-product-img {
    max-height: 130px;
    object-fit: contain;
    border-radius: 8px;
    background-color: #f9f9f9;
    padding: 8px;
  }

  .cart-summary {
    background-color: #fdfdfd;
    padding: 30px 25px;
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.05);
    border: 1px solid #e0e0e0;
  }

  .cart-summary h2 {
    font-weight: 700;
    color: #333;
    margin-bottom: 15px;
  }

  .btn-outline-warning {
    font-weight: 500;
    border-radius: 8px;
    transition: all 0.2s ease-in-out;
  }

  .btn-outline-warning:hover {
    background-color: #ffc107;
    color: #fff;
  }

  .btn-danger {
    font-size: 0.9rem;
    padding: 6px 12px;
    border-radius: 6px;
  }

  @media (max-width: 768px) {
    .cart-product-img {
      max-height: 90px;
    }

    .cart-summary {
      margin-top: 30px;
    }

    .cart-header {
      font-size: 1.5rem;
    }
  }
`}</style>
    </Layout>
  );
};

export default CartPage;
