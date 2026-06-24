import axios from "axios";

export const STRAPI_BASE_URL = "http://localhost:1337";

const strapi = axios.create({
  baseURL: `${STRAPI_BASE_URL}/api`,
});

export default strapi;