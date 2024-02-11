import axios from "axios";

export default function useBackend() {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_BASE_URL + "/api",
  })
  return instance;
}

