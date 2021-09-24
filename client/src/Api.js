import axios from "axios";

const API_ROOT = "http://localhost:9000/";

const requests = {
  get: (url) => axios.get(`${API_ROOT}${url}`),
  post: (url, body) => axios.post(`${API_ROOT}${url}`, body),
};

const testApi = {
  get: () => requests.get(`testApi`),
};

//eslint-disable-next-line
export default {
    testApi
}
