import React, { useEffect, useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import FetchComponent from "../elements/FetchComponent";
import Select from "../elements/Select";

function UpdateTask({ glboalAllUsers, globalAllProjects }) {
  const getTaskID = useLocation().search;
  const taskID = new URLSearchParams(getTaskID).get("id");
  const [isTaskUpdateLoading, setIsTaskUpdateLoading] = useState(false);
  const [isTaskUpdateLoadError, setIsTaskUpdateLoadError] = useState(false);
  const [taskUpadteErrorMsg, setTaskUpadteErrorMsg] = useState("");
  const [taskUpdateDetail, setTaskUpdateDetail] = useState({});

  const updateTaskHandler = (e) => {
    e.preventDefault();
    console.log("updateTaskHandler clicked...");
  };

  const getTaskData = async () => {
    setIsTaskUpdateLoadError(false);
    setIsTaskUpdateLoading(true);
    const apiUrl = `${process.env.REACT_APP_API_URL}Tasks/${taskID}`;
    const res = await FetchComponent(apiUrl).catch(() => {
      setTaskUpadteErrorMsg("Error when retrieving details. Please try again!");
      setIsTaskUpdateLoadError(true);
      setIsTaskUpdateLoading(false);
    });
    if (res !== undefined) {
      if (res.ok) {
        res.json().then((data) => {
          setTaskUpdateDetail(data);
          setIsTaskUpdateLoading(false);
        });
      } else {
        if (res.status === 404) {
          setTaskUpadteErrorMsg("Task details not found.");
        } else {
          setTaskUpadteErrorMsg(
            "Error when retrieving details. Please try again!"
          );
        }
        setIsTaskUpdateLoadError(true);
        setIsTaskUpdateLoading(false);
      }
    }
  };

  useEffect(() => {
    getTaskData();
  }, []);

  const taskStatus = [
    { id: 1, status: "New" },
    { id: 2, status: "In Progress" },
    { id: 3, status: "In QA" },
    { id: 4, status: "Complete" },
  ];

  return (
    <div className="mt-4" style={{ marginRight: "40px" }}>
      {isTaskUpdateLoading ? (
        <div className="spinner-border text-primary" role="status"></div>
      ) : (
        <div>
          {isTaskUpdateLoadError ? (
            <div className="text-danger">{taskUpadteErrorMsg}</div>
          ) : (
            <div>
              <h3 className="text-primary">
                <i className="fa fa-tasks"></i> Update Task
              </h3>
              <hr className="mb-4" />
              <form onSubmit={updateTaskHandler}>
                <div className="form-group mb-4 row">
                  <label
                    htmlFor="projectName"
                    className="col-sm-2 col-form-label"
                  >
                    Project
                  </label>
                  <div className="col-sm-4">
                    <Select
                      name="projectName"
                      optionList={globalAllProjects}
                      colKeys={["name"]}
                      selectedOption={taskUpdateDetail.projectID}
                      required
                    />
                  </div>
                </div>
                <div className="form-group mb-4 row">
                  <label
                    htmlFor="assignedToUserID"
                    className="col-sm-2 col-form-label"
                  >
                    Assigned to User
                  </label>
                  <div className="col-sm-4">
                    <Select
                      name="userName"
                      optionList={glboalAllUsers}
                      colKeys={["firstName", "lastName"]}
                      selectedOption={taskUpdateDetail.assignedToUserID}
                      required
                    />
                  </div>
                </div>
                <div className="form-group mb-4 row">
                  <label htmlFor="status" className="col-sm-2 col-form-label">
                    Status
                  </label>
                  <div className="col-sm-4">
                    <Select
                      name="status"
                      optionList={taskStatus}
                      colKeys={["status"]}
                      selectedOption={taskUpdateDetail.status}
                      required
                    />
                  </div>
                </div>
                <div className="form-group mb-4 row">
                  <label
                    htmlFor="taskDetails"
                    className="col-sm-2 col-form-label"
                  >
                    Details
                  </label>
                  <div className="col-sm-4">
                    <textarea
                      type="text"
                      name="taskDetails"
                      className="form-control"
                      placeholder="Task Details"
                      defaultValue={taskUpdateDetail.detail}
                      required
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
                      <i className="fa fa-pencil"></i> Update Task
                    </button>
                    <span>{""}</span>
                    <NavLink
                      to="/tasks"
                      className="btn btn-danger"
                      style={{ marginRight: "25px" }}
                    >
                      <i className="fa fa-times"></i> Delete
                    </NavLink>
                    <span>{""}</span>
                    <NavLink to="/tasks" className="btn btn-dark">
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
}

export default UpdateTask;
