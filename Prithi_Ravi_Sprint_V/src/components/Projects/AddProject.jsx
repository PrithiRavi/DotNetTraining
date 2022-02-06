import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import PostComponent from "../elements/PostComponent";
import { useNavigate } from "react-router-dom";

function AddProject() {
  const navigate = useNavigate();
  const goToRoute = (url) => {
    navigate(url);
  };
  const [addingProject, setAddingProject] = useState(false);
  const [addingProjectError, setProjectError] = useState(false);
  const [addingProjectErrMsg, setProjectErrMsg] = useState("");
  const [isProjectAdded, setIsProjectAdded] = useState(false);
  const addProjectHandler = async (e) => {
    e.preventDefault();
    setIsProjectAdded(false);
    setProjectError(false);
    setAddingProject(true);
    setProjectErrMsg("");
    const addProjectParam = `${process.env.REACT_APP_API_URL}Projects/`;
    const addProjectBody = {
      name: e.target.projectName.value,
      detail: e.target.projectDetails.value,
      createdOn: new Date(),
    };
    const addProjectRes = await PostComponent(addProjectParam, addProjectBody);
    if (addProjectRes.ok) {
      setAddingProject(false);
      setIsProjectAdded(true);
      setTimeout(() => {
        goToRoute("/projects");
      }, 2000);
    } else {
      addProjectRes.text().then((msg) => {
        setProjectErrMsg(msg);
        setAddingProject(false);
        setProjectError(true);
      });
    }
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
              disabled={addingProject || isProjectAdded}
            >
              <i className="fa fa-plus-circle"></i> Add Project
            </button>
            <span>{""}</span>
            <NavLink
              to="/projects"
              className={
                addingProject || isProjectAdded
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
      {addingProject ? (
        <div className="spinner-border text-primary" role="status"></div>
      ) : (
        <div>
          {addingProjectError ? (
            <div className="text-danger">{addingProjectErrMsg}</div>
          ) : (
            <div>
              {isProjectAdded ? (
                <div>Project added successfully.</div>
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

export default AddProject;
