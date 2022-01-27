import React from "react";
import { NavLink } from "react-router-dom";
import Select from "../elements/Select";

function AddTask({ glboalAllUsers, globalAllProjects }) {
  const addTaskHandler = (e) => {
    e.preventDefault();
    console.log("addTaskHandler clicked...");
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
              name="projectName"
              optionList={globalAllProjects}
              colKeys={["name"]}
              required
            />
          </div>
        </div>
        <div className="form-group mb-4 row">
          <label htmlFor="projectName" className="col-sm-2 col-form-label">
            Assigned to User
          </label>
          <div className="col-sm-4">
            <Select
              name="userName"
              optionList={glboalAllUsers}
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
            >
              <i className="fa fa-plus-circle"></i>Add Task
            </button>
            <span>{""}</span>
            <NavLink to="/tasks" className="btn btn-danger">
              <i className="fa fa-times-circle"></i> Cancel
            </NavLink>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddTask;
