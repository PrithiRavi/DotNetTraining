import React, { useState, useEffect } from "react";
import Table from "../elements/Table";
import FetchComponent from "../elements/FetchComponent";
import { NavLink } from "react-router-dom";

const Users = () => {
  const [isUserListLoading, setIsUserListLoading] = useState(false);
  const [isUserListError, setIsUserListError] = useState(false);
  const [userListErrorMsg, setUserListErrorMsg] = useState("");
  const [userData, setUserData] = useState([]);

  const tableHeader = [
    { headerKey: "id", headerValue: "ID" },
    { headerKey: "firstName", headerValue: "First Name" },
    { headerKey: "lastName", headerValue: "Last Name" },
    { headerKey: "email", headerValue: "Email" },
  ];

  const getUsersData = async () => {
    setIsUserListError(false);
    setIsUserListLoading(true);
    const apiUrl = `${process.env.REACT_APP_API_URL}User/`;
    const allUsers = await FetchComponent(apiUrl).catch(() => {
      setIsUserListError(true);
      setUserListErrorMsg(
        "Error when retreiving users data. Please try again!"
      );
      setIsUserListLoading(false);
    });
    if (allUsers !== undefined) {
      if (allUsers.ok) {
        allUsers.json().then((data) => {
          data.forEach((each) => {
            delete each["password"];
          });
          setUserData(data);
        });
      } else {
        setIsUserListError(true);
        setUserListErrorMsg(
          "Error when retreiving users data. Please try again!"
        );
      }
    }
    setIsUserListLoading(false);
  };

  useEffect(() => {
    getUsersData();
  }, []);

  return (
    <div className="mt-4">
      {isUserListLoading ? (
        <div className="spinner-border text-primary" role="status"></div>
      ) : (
        <div>
          {isUserListError ? (
            <div className="text-danger">{userListErrorMsg}</div>
          ) : (
            <div>
              <NavLink
                style={{
                  cursor: "pointer",
                  transition: "all 0.3s",
                  maxWidth: "120px",
                  minWidth: "120px",
                  padding: "10px",
                  textDecoration: "none",
                }}
                className="new-user"
                to="/users/add"
              >
                <i className="fa fa-plus-circle"></i> New User
              </NavLink>
              <div style={{ width: "80%" }}>
                <Table
                  tableHeader={tableHeader}
                  tableData={userData}
                  updateRoute="update"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Users;
