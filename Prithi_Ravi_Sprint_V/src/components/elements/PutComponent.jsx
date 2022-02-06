function PutComponent(reqParams, requestBody) {
  return fetch(reqParams, {
    method: "PUT",
    headers: { accept: "text/plain", "content-type": "application/json" },
    body: JSON.stringify(requestBody),
  });
}

export default PutComponent;
