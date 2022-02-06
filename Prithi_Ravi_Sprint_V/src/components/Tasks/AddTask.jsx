import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Select from "../elements/Select";
import PostComponent from "../elements/PostComponent";
import { useNavigate } from "react-router-dom";

function AddTask({ glboalAllUsers, globalAllProjects }) {
  const [selectedProjectId, setSelectedProjectId] = useState(
    globalAllProjects[0].id
  );
  const [selectedUserId, setSelectedUserId] = useState(glboalAllUsers[0].id);
  const navigate = useNavigate();
  const goToRoute = (url) => {
    navigate(url);
  };
  const [addingTask, setAddingTask] = useState(false);
  const [addingTaskError, setTaskError] = useState(false);
  const [addingTaskErrMsg, setTaskErrMsg] = useState("");
  const [isTaskAdded, setIsTaskAdded] = useState(false);

  const addTaskHandler = async (e) => {
    e.preventDefault();
    setIsTaskAdded(false);
    setTaskError(false);
    setAddingTask(true);
    setTaskErrMsg("");
    const addTaskParam = `${process.env.REACT_APP_API_URL}Tasks/`;
    const addTaskBody = {
      projectID: selectedProjectId,
      status: 1,
      assignedToUserID: selectedUserId,
      detail: e.target.taskDetails.value,
      createdOn: new Date(),
    };
    const addTaskRes = await PostComponent(addTaskParam, addTaskBody);
    if (addTaskRes.ok) {
      setAddingTask(false);
      setIsTaskAdded(true);
      setTimeout(() => {
        goToRoute("/tasks");
      }, 2000);
    } else {
      addTaskRes.text().then((msg) => {
        setTaskErrMsg(msg);
        setAddingTask(false);
        setTaskError(true);
      });
    }
  };

  return (
    <div className="mt-4" style={{ marginRight: "40px" }}>
      <h3 className="text-primary">
        <i className="fa fa-tasks"></i> New Task
      </h3>
      <hr className="mb-4" />
      <form onSubmit={addTaskHandler}>
        <div className="form-group mb-4 row">
          <label htmlFor="projectName" className="col-sm-2 col-form-label">
            Project
          </label>
          <div className="col-sm-4">
            <Select
              setSelectedValue={(e) => {
                setSelectedProjectId(e.target.value);
              }}
              name="projectName"
              selectedOption={globalAllProjects[0].id}
              optionList={globalAllProjects}
              colKeys={["name"]}
              required
            />
          </div>
        </div>
        <div className="form-group mb-4 row">
          <label htmlFor="userName" className="col-sm-2 col-form-label">
            Assigned to User
          </label>
          <div className="col-sm-4">
            <Select
              setSelectedValue={(e) => {
                setSelectedUserId(e.target.value);
              }}
              identifier="userName"
              name="userName"
              optionList={glboalAllUsers}
              selectedOption={glboalAllUsers[0].id}
              colKeys={["firstName", "lastName"]}
              required
            />
          </div>
        </div>
        <div className="form-group mb-4 row">
          <label htmlFor="taskDetails" className="col-sm-2 col-form-label">
            Details
          </label>
          <div className="col-sm-4">
            <textarea
              type="text"
              name="taskDetails"
              className="form-control"
              placeholder="Task Details"
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
              disabled={addingTask || isTaskAdded}
            >
              <i className="fa fa-plus-circle"></i>Add Task
            </button>
            <span>{""}</span>
            <NavLink
              to="/tasks"
              className={
                addingTask || isTaskAdded
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
      {addingTask ? (
        <div className="spinner-border text-primary" role="status"></div>
      ) : (
        <div>
          {addingTaskError ? (
            <div className="text-danger">{addingTaskErrMsg}</div>
          ) : (
            <div>
              {isTaskAdded ? <div>Task added successfully.</div> : <div></div>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AddTask;
