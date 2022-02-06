import React, { useState, useEffect } from "react";
import Table from "../elements/Table";
import { NavLink } from "react-router-dom";
import FetchComponent from "../elements/FetchComponent";

function Tasks({ setGlobalAllProjects, setGlboalAllUsers }) {
  const [isTaskLoading, setIsTaskLoading] = useState(false);
  const [isTaskLoadError, setIsTaskLoadError] = useState(false);
  const [taskPageErrMsg, setTaskPageErrMsg] = useState("");
  const [allProjects, setAllProjects] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [tasksData, setTasksData] = useState([]);
  const [tableHeader, setTableHeader] = useState([]);

  const getAllProjects = async () => {
    const apiUrl = `${process.env.REACT_APP_API_URL}Projects/`;
    const allProjectsRes = await FetchComponent(apiUrl).catch(() => {
      setIsTaskLoadError(true);
      setTaskPageErrMsg(
        "Error when retreiving projects data. Please try again!"
      );
    });
    if (allProjectsRes !== undefined) {
      if (allProjectsRes.ok) {
        allProjectsRes.json().then((data) => {
          setAllProjects(data);
        });
      } else {
        setIsTaskLoadError(true);
        setTaskPageErrMsg(
          "Error when retreiving projects data. Please try again!"
        );
      }
    }
  };

  const getAllUsers = async () => {
    const apiUrl = `${process.env.REACT_APP_API_URL}User/`;
    const allUsersRes = await FetchComponent(apiUrl).catch(() => {
      setIsTaskLoadError(true);
      setTaskPageErrMsg("Error when retreiving users data. Please try again!");
    });
    if (allUsersRes !== undefined) {
      if (allUsersRes.ok) {
        allUsersRes.json().then((data) => {
          data.forEach((each) => {
            delete each["password"];
            delete each["email"];
          });
          setAllUsers(data);
        });
      } else {
        setIsTaskLoadError(true);
        setTaskPageErrMsg(
          "Error when retreiving users data. Please try again!"
        );
      }
    }
  };

  const formatDate = (inDate) => {
    const d = new Date(inDate);
    return d.toLocaleDateString();
  };

  const assignUserAndProjectName = async () => {
    const apiUrl = `${process.env.REACT_APP_API_URL}Tasks/`;
    const allTasksRes = await FetchComponent(apiUrl).catch(() => {
      setIsTaskLoadError(true);
      setTaskPageErrMsg("Error when retreiving tasks data. Please try again!");
    });
    if (allTasksRes !== undefined) {
      if (allTasksRes.ok) {
        await allTasksRes.json().then((data) => {
          data.forEach((each, eachIndex) => {
            allProjects.forEach((eachProject) => {
              if (eachProject.id === each.projectID) {
                data[eachIndex].projectName = eachProject.name;
              }
            });
            allUsers.forEach((eachUser) => {
              if (eachUser.id === each.assignedToUserID) {
                data[eachIndex].assignedToUser =
                  eachUser.firstName + " " + eachUser.lastName;
              }
            });
            data[eachIndex].createdOn = formatDate(data[eachIndex].createdOn);
            switch (data[eachIndex].status) {
              case 1:
                data[eachIndex].status = "New";
                break;
              case 2:
                data[eachIndex].status = "In Progress";
                break;
              case 3:
                data[eachIndex].status = "In QA";
                break;
              case 4:
                data[eachIndex].status = "Complete";
                break;
              default:
                data[eachIndex].status = "New";
            }
          });
          data.forEach((each) => {
            delete each["projectID"];
            delete each["assignedToUserID"];
          });
          setTasksData(data);
          setTableHeader([
            { headerKey: "id", headerValue: "ID" },
            { headerKey: "projectName", headerValue: "Project" },
            { headerKey: "detail", headerValue: "Details" },
            { headerKey: "assignedToUser", headerValue: "AssignedToUser" },
            { headerKey: "status", headerValue: "Status" },
            { headerKey: "createdOn", headerValue: "CreatedOn" },
          ]);
          setGlobalAllProjects(allProjects);
          setGlboalAllUsers(allUsers);
        });
      } else {
        setIsTaskLoadError(true);
        setTaskPageErrMsg(
          "Error when retreiving tasks data. Please try again!"
        );
      }
    }
  };

  useEffect(() => {
    setIsTaskLoadError(false);
    setTaskPageErrMsg("");
    setIsTaskLoading(true);
    getAllProjects();
    getAllUsers();
  }, []);

  useEffect(() => {
    assignUserAndProjectName();
    setIsTaskLoading(false);
  }, [allProjects, allUsers]);

  return (
    <div className="mt-4">
      {isTaskLoading ? (
        <div className="spinner-border text-primary" role="status"></div>
      ) : (
        <div>
          {isTaskLoadError ? (
            <div className="text-danger">{taskPageErrMsg}</div>
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
                className="new-task"
                to="/tasks/add"
              >
                <i className="fa fa-tasks"></i> New Task
              </NavLink>
              <div style={{ width: "80%" }}>
                <Table
                  tableHeader={tableHeader}
                  tableData={tasksData}
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

export default Tasks;
