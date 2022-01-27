import React, { useEffect, useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import FetchComponent from "../elements/FetchComponent";

function UpdateProject() {
  const getProjectID = useLocation().search;
  const projectID = new URLSearchParams(getProjectID).get("id");
  const [isProjectLoading, setIsProjectLoading] = useState(false);
  const [isProjectLoadError, setIsProjectLoadError] = useState(false);
  const [projectLoadErrorMsg, setProjectLoadErrorMsg] = useState("");
  const [projectUpdateDetail, setProjectUpdateDetail] = useState({});

  const getProjectData = async () => {
    setIsProjectLoadError(false);
    setIsProjectLoading(true);
    const apiUrl = `${process.env.REACT_APP_API_URL}Projects/${projectID}`;
    const res = await FetchComponent(apiUrl).catch(() => {
      setProjectLoadErrorMsg(
        "Error when retrieving details. Please try again!"
      );
      setIsProjectLoadError(true);
      setIsProjectLoading(false);
    });
    if (res !== undefined) {
      if (res.ok) {
        res.json().then((data) => {
          setProjectUpdateDetail(data);
          setIsProjectLoading(false);
        });
      } else {
        if (res.status === 404) {
          setProjectLoadErrorMsg("Project details not found.");
        } else {
          setProjectLoadErrorMsg(
            "Error when retrieving details. Please try again!"
          );
        }
        setIsProjectLoadError(true);
        setIsProjectLoading(false);
      }
    }
  };

  const updateHandler = (e) => {
    e.preventDefault();
    console.log("updateHandler clicked...", projectUpdateDetail);
  };

  useEffect(() => {
    getProjectData();
  }, []);

  return (
    <div className="mt-4" style={{ marginRight: "40px" }}>
      {isProjectLoading ? (
        <div className="spinner-border text-primary" role="status"></div>
      ) : (
        <div>
          {isProjectLoadError ? (
            <div className="text-danger">{projectLoadErrorMsg}</div>
          ) : (
            <div>
              <h3>Update Project Details</h3>
              <hr className="mb-4" />
              <form onSubmit={updateHandler}>
                <div className="form-group mb-4 row">
                  <label htmlFor="name" className="col-sm-1 col-form-label">
                    Name
                  </label>
                  <div className="col-sm-3">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Project Name"
                      defaultValue={projectUpdateDetail.name}
                      onChange={(e) => {
                        setProjectUpdateDetail({
                          ...projectUpdateDetail,
                          name: e.target.value,
                        });
                      }}
                      required
                    />
                  </div>
                </div>
                <div className="form-group mb-4 row">
                  <label
                    htmlFor="projectDetails"
                    className="col-sm-1 col-form-label"
                  >
                    Details
                  </label>
                  <div className="col-sm-3">
                    <textarea
                      type="text"
                      name="projectDetails"
                      className="form-control"
                      defaultValue={projectUpdateDetail.detail}
                      onChange={(e) => {
                        setProjectUpdateDetail({
                          ...projectUpdateDetail,
                          detail: e.target.value,
                        });
                      }}
                      placeholder="Project Details"
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
                      <i className="fa fa-pencil"></i> Update Project
                    </button>
                    <span>{""}</span>
                    <NavLink
                      to="/projects"
                      className="btn btn-danger"
                      style={{ marginRight: "25px" }}
                    >
                      <i className="fa fa-times"></i> Delete
                    </NavLink>
                    <span>{""}</span>
                    <NavLink to="/projects" className="btn btn-dark">
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

export default UpdateProject;
