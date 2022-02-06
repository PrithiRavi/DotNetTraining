import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar({ userName, logout }) {
  return (
    <div className="">
      <div className="col">
        <div className="wrapper">
          <nav id="sidebar">
            <div className="sidebar-header">
              <h4>Hello {userName}!</h4>
            </div>
            <div
              style={{
                padding: "20px",
                fontSize: "1.1rem",
                fontWeight: "bold",
              }}
            >
              <NavLink exact="true" className="nav-link" to="/">
                <i className="fa fa-home"></i> Home
              </NavLink>
              <NavLink className="nav-link" to="/users">
                <i className="fa fa-user"></i> Users
              </NavLink>
              <NavLink className="nav-link" to="/projects">
                <i className="fa fa-briefcase"></i> Projects
              </NavLink>
              <NavLink className="nav-link" to="/tasks">
                <i className="fa fa-tasks"></i> Tasks
              </NavLink>
            </div>
            <div
              className="d-flex justify-content-center"
              style={{ marginTop: "50%" }}
            >
              <NavLink
                className="btn btn-outline-primary my-2 my-sm-0"
                style={{ marginRight: "20px" }}
                type="button"
                to="/"
                onClick={logout}
              >
                <i className="fa fa-sign-out"></i> Logout
              </NavLink>
            </div>
          </nav>
        </div>
      </div>
      <div className="col mt-4"></div>
    </div>
  );
}

export default Sidebar;
