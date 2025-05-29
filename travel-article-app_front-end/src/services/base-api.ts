import { BASE_API_URL } from "@/constants/config";
import axios from "axios";
import type {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";

export const getAuthToken = () => {
  return localStorage.getItem("token");
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

const baseApi: AxiosInstance = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

baseApi.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAuthToken();

    if (token) {
      config.headers!["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

baseApi.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Clear auth state
      //   queryClient.setQueryData(QUERY_KEYS.AUTH, null);
      //   queryClient.clear();
      removeToken();

      // Redirect to login if not already there
      if (window.location.pathname !== "/login") {
        setTimeout(() => {
          window.location.href = `/login?redirect=${window.location.pathname}`;
        }, 1000);
      }
    }

    console.log({ error }, "<< Error Axios Stack");

    return Promise.reject(error);
  }
);

export { baseApi };
