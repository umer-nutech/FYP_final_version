import React from "react";
import { NavLink } from "react-router-dom";
const UserMenu = () => {
  return (
    <>
      <div className=".text-center ">
        <div className="list-group">
          <h4>Dashboard</h4>
          <NavLink to="/dashboard/user/profile" className="list-group-item">
            profile
          </NavLink>
          <NavLink to="/dashboard/user/Orders" className="list-group-item">
            Orders
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default UserMenu;
