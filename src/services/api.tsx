import axios from "axios";
export const api = axios.create({
  baseURL: "http://localhost:1337",
  timeout: 1000,
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt");

  if (config.headers) {
    config.headers["Accept"] = "application/json";

    // ✅ NO agregar Authorization si es /auth/local o /auth/local/register
    if (!config.url?.includes("/auth/local")) {
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
        console.log("✔️ JWT agregado a headers:", token);
      } else {
        console.warn("⚠️ No JWT encontrado");
      }
    }
  }

  return config;
});
