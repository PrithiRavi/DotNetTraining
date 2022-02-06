import React from "react";

function DeleteComponent(reqParams) {
  return fetch(reqParams, {
    method: "DELETE",
    headers: { accept: "text/plain", "content-type": "application/json" },
  });
}

export default DeleteComponent;
