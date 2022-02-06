function PostComponent(reqParams, requestBody) {
  return fetch(reqParams, {
    method: "POST",
    headers: { accept: "text/plain", "content-type": "application/json" },
    body: JSON.stringify(requestBody),
  });
}

export default PostComponent;
