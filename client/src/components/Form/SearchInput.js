import React from 'react'
import { useSearch } from '../../context/search'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const SearchInput = () => {
    const [values,setValues] = useSearch()
    const navigate = useNavigate()
    const handleSubmit = async (e) =>{
e.preventDefault();
        
        try{
            const {data} = await axios.get(`/api/v1/product/search/${values.keyword}`)
            setValues({...values , results: data})
            navigate("/search")
        }
        catch(error)
        {
            console.log(error)
        }
    }
  return (
    <div>
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <button className="btn search-btn" type="submit">
          Search
        </button>
      </form>
      <style>
        {`
    .btn.search-btn{

    color: #ffffff;
    background-color: #000000;
    }
.btn.search-btn:hover {
  background-color: #ffbe0b;
}

    `}
      </style>
    </div>
  );
}

export default SearchInput
