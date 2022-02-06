import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import PostComponent from "../elements/PostComponent";
import { useNavigate } from "react-router-dom";

function AddUser() {
  const navigate = useNavigate();
  const goToRoute = (url) => {
    navigate(url);
  };
  const [addingUser, setAddingUser] = useState(false);
  const [addingUserError, setAddingUserError] = useState(false);
  const [addingUserErrMsg, setAddingUserErrMsg] = useState("");
  const [isRedirecting, setIsRedirecting] = useState(false);
  const submitHandler = async (e) => {
    e.preventDefault();
    setIsRedirecting(false);
    setAddingUserError(false);
    setAddingUser(true);
    setAddingUserErrMsg("");
    const addUserParam = `${process.env.REACT_APP_API_URL}User/`;
    const addUserBody = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    const addUserRes = await PostComponent(addUserParam, addUserBody);
    if (addUserRes.ok) {
      setAddingUser(false);
      setIsRedirecting(true);
      setTimeout(() => {
        goToRoute("/users");
      }, 2000);
    } else {
      addUserRes.text().then((msg) => {
        setAddingUserErrMsg(msg);
        setAddingUser(false);
        setAddingUserError(true);
      });
    }
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
              disabled={addingUser || isRedirecting}
            >
              <i className="fa fa-plus-circle"></i> Add User
            </button>
            <span>{""}</span>
            <NavLink
              to="/users"
              className={
                addingUser || isRedirecting
                  ? "btn btn-dark disabled"
                  : "btn btn-dark"
              }
            >
              <i className="fa fa-times-circle"></i> Cancel
            </NavLink>
          </div>
        </div>
      </form>
      <div className="mb-3"></div>
      {addingUser ? (
        <div className="spinner-border text-primary" role="status"></div>
      ) : (
        <div>
          {addingUserError ? (
            <div className="text-danger">{addingUserErrMsg}</div>
          ) : (
            <div>
              {isRedirecting ? (
                <div>User added successfully.</div>
              ) : (
                <div></div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AddUser;
