import axios from "axios";

const API_ROOT = process.env.REACT_APP_API_ROOT  || "http://localhost:9000/";

const requests = {
  get: (url) => axios.get(`${API_ROOT}${url}`),
  post: (url, body) => axios.post(`${API_ROOT}${url}`, body),
};

const email = {
  post: (body) => requests.post(`email`, body),
};

//eslint-disable-next-line
export default {
  email,
};
