import React from "react";
import { NavLink } from "react-router-dom";
const AdminMenu = () => {
  return (
    <>
      <h4>Admin Panel</h4>
      <div className=".text-center ">
        <div className="list-group">
          <NavLink
            to="/dashboard/admin/create-category"
            className="list-group-item"
          >
            Create Category
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-product"
            className="list-group-item"
          >
            Create Product
          </NavLink>
          <NavLink
            to="/dashboard/admin/products"
            className="list-group-item list-group-item-action"
          >
            Update Products
          </NavLink>
          {/* <NavLink to="/dashboard/admin/users" className="list-group-item">
            Users
          </NavLink> */}
        </div>
      </div>
      <style>
        {`
      .col-md-3{
      color: #1e1e1e;
      margin-top: 3%;
      
      width: 200px;
      
      }
      .col-md-9{
      margin-top: 3%;
      margin-left: 10%;
      
      
      
      }
    .list-group {
color: #1e1e1e;
 }

      `}
      </style>
    </>
  );
};

export default AdminMenu;
console.log('AdminMenu component rendered');

