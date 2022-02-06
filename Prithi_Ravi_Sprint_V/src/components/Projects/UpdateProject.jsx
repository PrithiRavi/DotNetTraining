import React, { useEffect, useState } from "react";
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import FetchComponent from "../elements/FetchComponent";
import PutComponent from "../elements/PutComponent";
import DeleteComponent from "../elements/DeleteComponent";

function UpdateProject() {
  const getProjectID = useLocation().search;
  const projectID = new URLSearchParams(getProjectID).get("id");
  const [isProjectLoading, setIsProjectLoading] = useState(false);
  const [isProjectLoadError, setIsProjectLoadError] = useState(false);
  const [projectLoadErrorMsg, setProjectLoadErrorMsg] = useState("");
  const [projectUpdateDetail, setProjectUpdateDetail] = useState({});

  const navigate = useNavigate();
  const goToRoute = (url) => {
    navigate(url);
  };
  const [updatingProject, setUpdatingProject] = useState(false);
  const [updatingProjectError, setUpdatingProjectError] = useState(true);
  const [updatingProjectErrMsg, setUpdatingProjectErrMsg] = useState("");
  const [isProjectUpdated, setIsProjectUpdated] = useState(false);
  const [isProjectDeleted, setIsProjectDeleted] = useState(false);

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

  const updateHandler = async (e) => {
    e.preventDefault();
    setUpdatingProject(true);
    setUpdatingProjectError(false);
    setIsProjectUpdated(false);
    setUpdatingProjectErrMsg("");
    const updateProjectParam = `${process.env.REACT_APP_API_URL}Projects/`;
    const updProjectRes = await PutComponent(
      updateProjectParam,
      projectUpdateDetail
    );
    if (updProjectRes.ok) {
      setUpdatingProject(false);
      setIsProjectUpdated(true);
      setTimeout(() => {
        goToRoute("/projects");
      }, 2000);
    } else {
      updProjectRes.text().then((msg) => {
        setUpdatingProjectErrMsg(msg);
        setUpdatingProject(false);
        setUpdatingProjectError(true);
      });
    }
  };

  const deleteHandler = async (e) => {
    e.preventDefault();
    setUpdatingProject(true);
    setUpdatingProjectError(false);
    setIsProjectDeleted(false);
    setUpdatingProjectErrMsg("");
    const apiUrl = `${process.env.REACT_APP_API_URL}Tasks/byProjectId/${projectUpdateDetail.id}`;
    const getTasksRes = await FetchComponent(apiUrl);
    if (getTasksRes.ok) {
      getTasksRes.text().then(async (msg) => {
        if (msg === '"Task Found"') {
          setUpdatingProjectError(true);
          setUpdatingProjectErrMsg(
            "Project mapped to task, cannot be deleted."
          );
        } else {
          const deleteUrl = `${process.env.REACT_APP_API_URL}Projects/${projectUpdateDetail.id}`;
          const delProjectRes = await DeleteComponent(deleteUrl);
          if (delProjectRes.ok) {
            setUpdatingProject(false);
            setTimeout(() => {
              goToRoute("/projects");
            }, 2000);
          } else {
            setUpdatingProjectError(true);
            setUpdatingProjectErrMsg(
              "Error occured when deleting the project. Please try again!"
            );
          }
          setIsProjectDeleted(true);
        }
        setUpdatingProject(false);
      });
    } else {
      setUpdatingProject(false);
      setUpdatingProjectError(true);
      setUpdatingProjectErrMsg(
        "Error when retrieving details. Please try again!"
      );
    }
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
                      disabled={
                        updatingProject || isProjectUpdated || isProjectDeleted
                      }
                    >
                      <i className="fa fa-pencil"></i> Update Project
                    </button>
                    <span>{""}</span>
                    <button
                      onClick={deleteHandler}
                      className={
                        updatingProject || isProjectUpdated || isProjectDeleted
                          ? "btn btn-danger disabled"
                          : "btn btn-danger"
                      }
                      style={{ marginRight: "25px" }}
                    >
                      <i className="fa fa-times"></i> Delete
                    </button>
                    <span>{""}</span>
                    <NavLink
                      to="/projects"
                      className={
                        updatingProject || isProjectUpdated || isProjectDeleted
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
      {updatingProject ? (
        <div className="spinner-border text-primary" role="status"></div>
      ) : (
        <div>
          {updatingProjectError ? (
            <div className="text-danger">{updatingProjectErrMsg}</div>
          ) : (
            <div>
              {isProjectUpdated ? (
                <div>Project updated successfully.</div>
              ) : (
                <div></div>
              )}
              {isProjectDeleted ? (
                <div>Project deleted successfully.</div>
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

export default UpdateProject;
