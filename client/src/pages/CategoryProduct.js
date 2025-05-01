import React,{useState,useEffect} from "react";
import Layout from "../components/Layout/Layout";
import { useParams , useNavigate } from "react-router-dom";
import axios from "axios";


const CategoryProduct = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    
    useEffect(() => {
        if(params?.slug) getProductByCat()

    },[params?.slug])
    const getProductByCat = async () => {
try{
const {data} =await axios.get(`/api/v1/product/product-category/${params.slug}`)
setProducts(data?.products)
setCategory(data?.category);
}
catch(error)
{                  
    console.error(error);
}
    }
  return (
    <Layout>
      <div className="container">
        <h4 className="text-center">Category - {category?.name}</h4>
        <h6 className="text-center">{products?.length} results found</h6>
        <div className="row">
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">$ {p.price}</p>
                  <button
                    className="btn  ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                  <button className="btn  ms-1">Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <style>
          {`
            .row
            {
            margin-top: 10%;
            }

            .card-body
            {
            background-color: #1e1e1e;
            color: #ffffff;
            font-size: 2.2rem;
            font-family: poppins;

            }
            .card-title
            {
             color: #ffffff;
            font-size: 2.2rem;
            font-family: poppins;
            }
            .card-text
            {
             font-size: 2.2rem;
      font-family: poppins;
      background-color: green;
      width: 35%;
      border-radius: 10px;
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

.card-img-top
{
 height: 350px;
      object-fit: cover;
}
        .btn
            {
            background-color: #ffffff;
            font-weight: bold;
            font-family: poppins;

            }

            `}
        </style>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
