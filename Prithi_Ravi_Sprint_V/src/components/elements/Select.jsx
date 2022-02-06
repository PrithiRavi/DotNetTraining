import React, { useState } from "react";

function Select({ optionList, selectedOption, colKeys, setSelectedValue }) {
  return (
    <div>
      <select className="form-select" onChange={setSelectedValue}>
        {optionList.map((eachOption, eachOptionIndex) => {
          return (
            <option
              key={eachOptionIndex}
              value={eachOption.id}
              selected={selectedOption === eachOption.id ? true : false}
            >
              {colKeys.length === 2
                ? eachOption[colKeys[0]] + " " + eachOption[colKeys[1]]
                : eachOption[colKeys]}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default Select;
