import axios from "axios";

const apiURLs = {
  development: "http://localhost:4000",
  production: "COLOQUE AQUI O LINK DA SUA API DEPLOYADA",
};

const api = axios.create({ baseURL: apiURLs[process.env.NODE_ENV] });

export { api };
