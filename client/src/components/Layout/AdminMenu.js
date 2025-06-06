import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <h2 style={{ backgroundColor: "black", color: "white", paddingBottom: "6px" }}> Admin Panel</h2>

          <div className="list-group">
            <NavLink
              to="/dashboard/admin/create-category"
              className="list-group-item list-group-item-action "
              aria-current="true"
            >
              Create Category
            </NavLink>
            <NavLink
              to="/dashboard/admin/create-product"
              className="list-group-item list-group-item-action"
            >
              Create Product
            </NavLink>
            <NavLink
              to="/dashboard/admin/products"
              className="list-group-item list-group-item-action"
            >
              Products
            </NavLink>
            <NavLink
              to="/dashboard/admin/orders"
              className="list-group-item list-group-item-action"
            >
              Orders
            </NavLink>
            <NavLink
              to="/dashboard/admin/user"
              className="list-group-item list-group-item-action"
            >
              Users
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
