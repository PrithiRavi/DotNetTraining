import React from "react";
import { NavLink } from "react-router-dom";

function AddUser() {
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("CLicked");
  };
  return (
    <div className="mt-4" style={{ marginRight: "40px" }}>
      <h3 className="text-primary">
        <i className="fa fa-user"></i> New User
      </h3>
      <hr className="mb-4" />
      <form onSubmit={submitHandler}>
        <div className="form-group mb-4 row">
          <label htmlFor="firstName" className="col-sm-1 col-form-label">
            First Name
          </label>
          <div className="col-sm-3">
            <input
              type="text"
              name="firstName"
              className="form-control"
              placeholder="First Name"
              required
            />
          </div>
        </div>
        <div className="form-group mb-4 row">
          <label htmlFor="lastName" className="col-sm-1 col-form-label">
            Last Name
          </label>
          <div className="col-sm-3">
            <input
              type="text"
              name="lastName"
              className="form-control"
              placeholder="Last Name"
              required
            />
          </div>
        </div>
        <div className="form-group mb-4 row">
          <label htmlFor="email" className="col-sm-1 col-form-label">
            Email
          </label>
          <div className="col-sm-3">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              required
            />
          </div>
        </div>
        <div className="form-group mb-4 row">
          <label htmlFor="password" className="col-sm-1 col-form-label">
            Password
          </label>
          <div className="col-sm-3">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              required
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-2 mt-4">
            <button
              type="submit"
              className="btn btn-primary"
              style={{ marginRight: "25px" }}
            >
              <i className="fa fa-plus-circle"></i> Add User
            </button>
            <span>{""}</span>
            <NavLink to="/users" className="btn btn-danger">
              <i className="fa fa-times-circle"></i> Cancel
            </NavLink>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddUser;
