import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api/";

export const apiCalls = (
  method,
  url,
  data = {},
  headers = { "Content-Type": "application/json" }
) => {
  const axiosMethod = axios[method];
  const resolvedUrl = baseUrl + url;
  return axiosMethod(resolvedUrl, data, { headers: headers });
};
