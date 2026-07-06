import axios from "axios";

export const STRAPI_BASE_URL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "http://localhost:1337";

const strapi = axios.create({
  baseURL: `${STRAPI_BASE_URL}/api`,
});

export default strapi;
