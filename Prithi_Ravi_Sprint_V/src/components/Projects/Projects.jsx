import React, { useState, useEffect } from "react";
import Table from "../elements/Table";
import FetchComponent from "../elements/FetchComponent";
import { NavLink } from "react-router-dom";

function Projects() {
  const [isProjectListLoading, setIsProjectListLoading] = useState(false);
  const [isProjectListError, setIsProjectListError] = useState(false);
  const [projectListErrorMsg, setProjectListErrorMsg] = useState("");
  const [projectData, setProjectData] = useState([]);

  const tableHeader = [
    { headerKey: "id", headerValue: "ID" },
    { headerKey: "name", headerValue: "Name" },
    { headerKey: "detail", headerValue: "Detail" },
    { headerKey: "createdOn", headerValue: "CreatedOn" },
  ];

  const formatDate = (inDate) => {
    const d = new Date(inDate);
    return d.toLocaleDateString();
  };

  const getProjectsData = async () => {
    setIsProjectListLoading(true);
    setIsProjectListError(false);
    const apiUrl = `${process.env.REACT_APP_API_URL}Projects/`;
    const allProjects = await FetchComponent(apiUrl).catch(() => {
      setIsProjectListError(true);
      setProjectListErrorMsg(
        "Error when retreiving projects data. Please try again!"
      );
      setIsProjectListLoading(false);
    });
    if (allProjects !== undefined) {
      if (allProjects.ok) {
        allProjects.json().then((data) => {
          data.forEach((eachData, eachDataIndex) => {
            data[eachDataIndex].createdOn = formatDate(
              data[eachDataIndex].createdOn
            );
          });
          setProjectData(data);
        });
      } else {
        setIsProjectListError(true);
        setProjectListErrorMsg(
          "Error when retreiving projects data. Please try again!"
        );
      }
    }
    setIsProjectListLoading(false);
  };

  useEffect(() => {
    getProjectsData();
  }, []);

  return (
    <div className="mt-4">
      {isProjectListLoading ? (
        <div className="spinner-border text-primary" role="status"></div>
      ) : (
        <div>
          {isProjectListError ? (
            <div className="text-danger">{projectListErrorMsg}</div>
          ) : (
            <div>
              <NavLink
                style={{
                  cursor: "pointer",
                  transition: "all 0.3s",
                  maxWidth: "120px",
                  minWidth: "120px",
                  padding: "10px",
                  textDecoration: "none",
                }}
                className="new-project"
                to="/projects/add"
              >
                <i className="fa fa-plus-circle"></i> New Project
              </NavLink>
              <div style={{ width: "80%" }}>
                <Table
                  tableHeader={tableHeader}
                  tableData={projectData}
                  updateRoute="update"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Projects;
