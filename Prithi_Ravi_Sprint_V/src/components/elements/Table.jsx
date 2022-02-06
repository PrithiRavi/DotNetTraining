import React from "react";
import { useNavigate } from "react-router-dom";

const Table = ({ tableHeader, tableData, updateRoute }) => {
  const navigate = useNavigate();
  const goToRoute = (url) => {
    navigate(url);
  };
  return (
    <div>
      <table className="table table-hover">
        <thead>
          <tr>
            {tableHeader.map((each, eachIndex) => {
              return (
                <th scope="col" key={eachIndex}>
                  {each.headerValue}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {tableData.map((eachRow, eachRowIndex) => {
            return (
              <tr
                key={eachRowIndex}
                onClick={() => {
                  goToRoute(updateRoute + "?id=" + eachRow.id);
                }}
              >
                {tableHeader.map((each, eachIndex) => {
                  return <td key={eachIndex}> {eachRow[each.headerKey]}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
