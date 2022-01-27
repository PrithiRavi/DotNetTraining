async function FetchComponent(reqParams) {
  const headers = {
    method: "GET",
    accept: "application/json",
    "content-type": "application/json",
  };
  return await fetch(reqParams, { headers });
}

export default FetchComponent;
