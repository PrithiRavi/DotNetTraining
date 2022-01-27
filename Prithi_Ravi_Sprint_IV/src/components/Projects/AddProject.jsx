import React from "react";
import { NavLink } from "react-router-dom";

function AddProject() {
  const addProjectHandler = (e) => {
    e.preventDefault();
    console.log("addProjectHandler clicked...");
  };
  return (
    <div className="mt-4" style={{ marginRight: "40px" }}>
      <h3 className="text-primary">
        <i className="fa fa-briefcase"></i> New Project
      </h3>
      <hr className="mb-4" />
      <form onSubmit={addProjectHandler}>
        <div className="form-group mb-4 row">
          <label htmlFor="projectName" className="col-sm-1 col-form-label">
            Name
          </label>
          <div className="col-sm-3">
            <input
              type="text"
              name="projectName"
              className="form-control"
              placeholder="Project Name"
              required
            />
          </div>
        </div>
        <div className="form-group mb-4 row">
          <label htmlFor="projectDetails" className="col-sm-1 col-form-label">
            Details
          </label>
          <div className="col-sm-3">
            <textarea
              type="text"
              name="projectDetails"
              className="form-control"
              placeholder="Project Details"
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
              <i className="fa fa-plus-circle"></i> Add Project
            </button>
            <span>{""}</span>
            <NavLink to="/projects" className="btn btn-danger">
              <i className="fa fa-times-circle"></i> Cancel
            </NavLink>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddProject;
