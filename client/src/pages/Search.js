import React from 'react'
import Layout from '../components/Layout/Layout'
import { useSearch } from '../context/search'
const Search = () => {
    const [values,setValues] = useSearch()
  return (
    <Layout titles={"Search Results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {values?.results.map((p) => (
              <div
                className="card m-2"
                style={{ width: "18rem", height: "350px" }}
                key={p._id}
              >
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                  style={{ height: "350px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>

                  <p className="card-text">$ {p.price}</p>
                  <button className="btn ms-1">More Details</button>
                  <button className="btn ms-1">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <style>
          {`
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
      width: 45%;
      border-radius: 10px;
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
}

export default Search
