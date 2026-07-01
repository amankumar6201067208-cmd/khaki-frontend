import axios from "axios";

// Base URL of the Strapi backend. Configurable per environment via Vite's
// VITE_API_URL (see .env / .env.example). Falls back to localhost for dev.
export const STRAPI_BASE_URL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "http://localhost:1337";

const strapi = axios.create({
  baseURL: `${STRAPI_BASE_URL}/api`,
});

export default strapi;
