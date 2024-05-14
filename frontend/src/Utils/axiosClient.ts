import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
// import { deleteCookie, getCookie, setCookie, hasCookie } from 'cookies-next'
import { SESSION_COOKIE } from "./constants";

const authUrls = ["/user/login", "/user/signup"];

const axiosClient = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
  headers: {
    "Content-type": "application/json",
    // 'Access-Control-Allow-Credentials':'true',
    "Access-Control-Allow-Origin": "*",
    // 'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
  withCredentials: true,
});

axiosClient.interceptors.request.use(
  (config: any) => {
    let url: string | undefined = config.url;

    const token = Cookies.get(SESSION_COOKIE);

    if (token && url && !authUrls.includes(url)) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error) => {
    console.log("ERROR RESPONSE:", error.response);

    return Promise.reject(error);
  }
);
async function handleRefreshTokenError(error: any) {
  const isError =
    error.response.status === 401 || error.response.status === 403;

  if (isError) {
    Cookies.remove(SESSION_COOKIE);
    window.location.reload();
  }

  return Promise.reject(error);
}

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  handleRefreshTokenError
);

export default axiosClient;
