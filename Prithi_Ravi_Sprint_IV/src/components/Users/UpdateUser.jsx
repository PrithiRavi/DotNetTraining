import React, { useEffect, useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import FetchComponent from "../elements/FetchComponent";

const UpdateUser = () => {
  const getUserID = useLocation().search;
  const userID = new URLSearchParams(getUserID).get("id");
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [userUpdateDetail, setUserUpdateDetail] = useState({});

  const getUserData = async () => {
    setIsError(false);
    setIsUserLoading(true);
    const apiUrl = `${process.env.REACT_APP_API_URL}User/${userID}`;
    const res = await FetchComponent(apiUrl).catch(() => {
      setErrorMsg("Error when retrieving details. Please try again!");
      setIsError(true);
      setIsUserLoading(false);
    });
    if (res !== undefined) {
      if (res.ok) {
        res.json().then((data) => {
          setUserUpdateDetail(data);
          setIsUserLoading(false);
        });
      } else {
        if (res.status === 404) {
          setErrorMsg("User not found.");
        } else {
          setErrorMsg("Error when retrieving details. Please try again!");
        }
        setIsError(true);
        setIsUserLoading(false);
      }
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const updateHandler = (e) => {
    e.preventDefault();
    console.log("updateHandler clicked...", userUpdateDetail);
  };

  return (
    <div className="mt-4" style={{ marginRight: "40px" }}>
      {isUserLoading ? (
        <div className="spinner-border text-primary" role="status"></div>
      ) : (
        <div>
          {isError ? (
            <div className="text-danger">{errorMsg}</div>
          ) : (
            <div>
              <h3>Update User</h3>
              <hr className="mb-4" />
              <form onSubmit={updateHandler}>
                <div className="form-group mb-4 row">
                  <label
                    htmlFor="firstName"
                    className="col-sm-1 col-form-label"
                  >
                    First Name
                  </label>
                  <div className="col-sm-3">
                    <input
                      type="text"
                      name="firstName"
                      className="form-control"
                      placeholder="First Name"
                      defaultValue={userUpdateDetail.firstName}
                      onChange={(e) => {
                        setUserUpdateDetail({
                          ...userUpdateDetail,
                          firstName: e.target.value,
                        });
                      }}
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
                      defaultValue={userUpdateDetail.lastName}
                      required
                      onChange={(e) => {
                        setUserUpdateDetail({
                          ...userUpdateDetail,
                          lastName: e.target.value,
                        });
                      }}
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
                      defaultValue={userUpdateDetail.email}
                      required
                      onChange={(e) => {
                        setUserUpdateDetail({
                          ...userUpdateDetail,
                          email: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-sm-3 mt-4">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ marginRight: "25px" }}
                    >
                      <i className="fa fa-pencil"></i> Update User
                    </button>
                    <span>{""}</span>
                    <NavLink
                      to="/users"
                      className="btn btn-danger"
                      style={{ marginRight: "25px" }}
                    >
                      <i className="fa fa-times"></i> Delete
                    </NavLink>
                    <span>{""}</span>
                    <NavLink to="/users" className="btn btn-dark">
                      <i className="fa fa-times-circle"></i> Cancel
                    </NavLink>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UpdateUser;
