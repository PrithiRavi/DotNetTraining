import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import Home from "../Home";
import Users from "./Users/Users";
import AddUser from "./Users/AddUser";
import UpdateUser from "./Users/UpdateUser";
import Projects from "./Projects/Projects";
import AddProject from "./Projects/AddProject";
import UpdateProject from "./Projects/UpdateProject";
import Tasks from "./Tasks/Tasks";
import AddTask from "./Tasks/AddTask";
import UpdateTask from "./Tasks/UpdateTask";
import FetchComponent from "./elements/FetchComponent";
import Sidebar from "./Sidebar";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [globalAllProjects, setGlobalAllProjects] = useState([]);
  const [glboalAllUsers, setGlboalAllUsers] = useState([]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");
    const apiUrl = `${process.env.REACT_APP_API_URL}User/userLogin?email=${e.target.email.value}&password=${e.target.password.value}`;
    const res = await FetchComponent(apiUrl).catch(() => {
      setErrorMsg("Unable to reach authentication server. Please try again!");
      setLoggedIn(false);
      setIsLoading(false);
    });
    if (res !== undefined) {
      if (res.ok) {
        setLoggedIn(true);
        res.json().then((data) => {
          setUserDetails(data);
        });
        setIsLoading(false);
      } else {
        res.json().then((data) => {
          if (data.status === 401) {
            setErrorMsg("Invalid Credentials.");
          } else {
            setErrorMsg(data);
          }
          setLoggedIn(false);
          setIsLoading(false);
        });
      }
    }
  };

  const Logout = () => {
    setLoggedIn(false);
    setUserDetails({});
  };

  useEffect(() => {
    setLoggedIn(JSON.parse(localStorage.getItem("loggedIn")));
    setUserDetails({ firstName: localStorage.getItem("userFirstName") });
  }, []);

  useEffect(() => {
    localStorage.setItem("loggedIn", loggedIn);
  }, [loggedIn]);

  useEffect(() => {
    if (userDetails) {
      localStorage.setItem("userFirstName", userDetails.firstName);
    }
  }, [userDetails]);

  return (
    <div>
      {loggedIn ? (
        <div className="d-flex">
          <Router>
            <div className="col-2" style={{ height: "100vh" }}>
              <Sidebar
                userName={
                  userDetails.firstName != null ? userDetails.firstName : ""
                }
                logout={Logout}
              />
            </div>
            <div className="col mt-4">
              <Routes>
                <Route exact="true" path="/" element={<Home />} />
                <Route path="/users" element={<Users />} />
                <Route path="/users/add" element={<AddUser />} />
                <Route path="/users/update" element={<UpdateUser />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/add" element={<AddProject />} />
                <Route path="/projects/update" element={<UpdateProject />} />
                <Route
                  path="/tasks"
                  element={
                    <Tasks
                      setGlobalAllProjects={setGlobalAllProjects}
                      setGlboalAllUsers={setGlboalAllUsers}
                    />
                  }
                />
                <Route
                  path="/tasks/add"
                  element={
                    <AddTask
                      glboalAllUsers={glboalAllUsers}
                      globalAllProjects={globalAllProjects}
                    />
                  }
                />
                <Route
                  path="/tasks/update"
                  element={
                    <UpdateTask
                      glboalAllUsers={glboalAllUsers}
                      globalAllProjects={globalAllProjects}
                    />
                  }
                />
              </Routes>
            </div>
          </Router>
        </div>
      ) : (
        <div>
          <div className="container">
            <div className="row">
              <div className="col"></div>
              <div className="col-6">
                <div className="mt-4 d-flex justify-content-center">
                  <h1 className="text-primary">Project Management</h1>
                </div>
              </div>
              <div className="col"></div>
            </div>
            <div className="login-form">
              <form onSubmit={submitHandler}>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    required
                  />
                </div>
                <div className="form-group mt-2">
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    required
                  />
                </div>
                <div className="form-group mt-3">
                  <div className="row">
                    <div className="col-10">
                      <button
                        type="submit"
                        className="btn btn-primary p-2"
                        disabled={isLoading}
                      >
                        <i className="fa fa-sign-in"></i> Login
                      </button>
                    </div>
                    <div className="col">
                      {isLoading ? (
                        <div
                          className="spinner-border text-primary"
                          role="status"
                        ></div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-3" style={{ height: "30px", color: "red" }}>
                  {errorMsg === "" ? <div></div> : <div>{errorMsg}</div>}
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
