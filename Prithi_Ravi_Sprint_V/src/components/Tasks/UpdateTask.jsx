import React, { useEffect, useState } from "react";
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import Select from "../elements/Select";
import FetchComponent from "../elements/FetchComponent";
import PutComponent from "../elements/PutComponent";
import DeleteComponent from "../elements/DeleteComponent";

function UpdateTask({ glboalAllUsers, globalAllProjects }) {
  const getTaskID = useLocation().search;
  const taskID = new URLSearchParams(getTaskID).get("id");
  const [isTaskUpdateLoading, setIsTaskUpdateLoading] = useState(false);
  const [isTaskUpdateLoadError, setIsTaskUpdateLoadError] = useState(false);
  const [taskUpadteErrorMsg, setTaskUpadteErrorMsg] = useState("");
  const [taskUpdateDetail, setTaskUpdateDetail] = useState({});

  const [selectedProjectIdUpdTask, setSelectedProjectIdUpdTask] = useState();
  const [selectedUserIdUpdTask, setSelectedUserIdUpdTask] = useState();
  const [selectedTaskStatusUpdTask, setSelectedTaskStatusUpdTask] = useState();

  const navigate = useNavigate();
  const goToRoute = (url) => {
    navigate(url);
  };
  const [updatingTask, setUpdatingTask] = useState(false);
  const [updatingTaskError, setUpdatingTaskError] = useState(true);
  const [updatingTaskErrMsg, setUpdatingTaskErrMsg] = useState("");
  const [isTaskUpdated, setIsTaskUpdated] = useState(false);
  const [isTaskDeleted, setIsTaskDeleted] = useState(false);

  const updateTaskHandler = async (e) => {
    e.preventDefault();
    setUpdatingTask(true);
    setUpdatingTaskError(false);
    setIsTaskUpdated(false);
    setUpdatingTaskErrMsg("");
    const updateTaskParam = `${process.env.REACT_APP_API_URL}Tasks/`;
    const updateTaskBody = {
      id: taskUpdateDetail.id,
      projectID: selectedProjectIdUpdTask,
      status: selectedTaskStatusUpdTask,
      assignedToUserID: selectedUserIdUpdTask,
      detail: e.target.taskDetails.value,
    };
    const updTaskRes = await PutComponent(updateTaskParam, updateTaskBody);
    if (updTaskRes.ok) {
      setUpdatingTask(false);
      setIsTaskUpdated(true);
      setTimeout(() => {
        goToRoute("/tasks");
      }, 2000);
    } else {
      updTaskRes.text().then((msg) => {
        setUpdatingTaskErrMsg(msg);
        setUpdatingTask(false);
        setUpdatingTaskError(true);
      });
    }
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
          setSelectedProjectIdUpdTask(data.projectID);
          setSelectedUserIdUpdTask(data.assignedToUserID);
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

  const deleteHandler = async (e) => {
    e.preventDefault();
    setUpdatingTask(true);
    setUpdatingTaskError(false);
    const deleteUrl = `${process.env.REACT_APP_API_URL}Tasks/${taskUpdateDetail.id}`;
    const delTaskRes = await DeleteComponent(deleteUrl);
    if (delTaskRes.ok) {
      setUpdatingTask(false);
      setIsTaskDeleted(true);
      setTimeout(() => {
        goToRoute("/tasks");
      }, 2000);
    } else {
      setUpdatingTask(false);
      setIsTaskDeleted(true);
      setUpdatingTaskError(true);
      setUpdatingTaskErrMsg(
        "Error occured when deleting the task. Please try again!"
      );
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
                      setSelectedValue={(e) => {
                        setSelectedProjectIdUpdTask(e.target.value);
                      }}
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
                      setSelectedValue={(e) => {
                        setSelectedUserIdUpdTask(e.target.value);
                      }}
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
                      setSelectedValue={(e) => {
                        setSelectedTaskStatusUpdTask(e.target.value);
                      }}
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
                      disabled={updatingTask || isTaskUpdated || isTaskDeleted}
                    >
                      <i className="fa fa-pencil"></i> Update Task
                    </button>
                    <span>{""}</span>
                    <button
                      onClick={deleteHandler}
                      className={
                        updatingTask || isTaskUpdated || isTaskDeleted
                          ? "btn btn-danger disabled"
                          : "btn btn-danger"
                      }
                      style={{ marginRight: "25px" }}
                    >
                      <i className="fa fa-times"></i> Delete
                    </button>
                    <span>{""}</span>
                    <NavLink
                      to="/tasks"
                      className={
                        updatingTask || isTaskUpdated || isTaskDeleted
                          ? "btn btn-dark disabled"
                          : "btn btn-dark"
                      }
                    >
                      <i className="fa fa-times-circle"></i> Cancel
                    </NavLink>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
      <div className="mb-3"></div>
      {updatingTask ? (
        <div className="spinner-border text-primary" role="status"></div>
      ) : (
        <div>
          {updatingTaskError ? (
            <div className="text-danger">{updatingTaskErrMsg}</div>
          ) : (
            <div>
              {isTaskUpdated ? (
                <div>Task updated successfully.</div>
              ) : (
                <div></div>
              )}
              {isTaskDeleted ? (
                <div>Task deleted successfully.</div>
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

export default UpdateTask;
