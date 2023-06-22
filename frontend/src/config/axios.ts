import Axios from "axios";
import { get } from "lodash";
import showNotification from "../utils/notification";
import { getToken } from "../utils/localstorage";

export const BASE_URL = "http://localhost:5000/api";

const axiosInstance = Axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["x-auth-token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
const request = {
  get: (url: string, params: { [key: string]: string }, headers = {}) =>
    axiosInstance.get(url, { params, headers }),
  post: (url: string, data: any, headers = {}) =>
    axiosInstance.post(url, data, { headers }),
  patch: (url: string, data: any, headers = {}) =>
    axiosInstance.patch(url, data, { headers }),
  put: (url: string, data: any, headers = {}) =>
    axiosInstance.put(url, data, { headers }),
  delete: (url: string, data: any, headers = {}) =>
    axiosInstance.delete(url, { data, headers }),
};

export const resolveRequest = async (requestPromise: Promise<any>) => {
  let data: {
    statusCode: number;
    status: boolean;
    body: any;
    message: any;
    error: any;
  };

  try {
    const result = await requestPromise;
    data = result.data;
    data.statusCode = result.status;
    // if (data.status) {
    //   showNotification(data.message, {
    //     type: "success",
    //   });
    // }
  } catch (e) {
    const errorData = get(e, "response.data.error");
    const statusCode = get(e, "response.status");
    if ([400, 401, 403, 404, 500].includes(statusCode)) {
      showNotification(errorData?.message, { type: "error" });
    }
    data = typeof errorData === "object" ? errorData : {};

    data.error = {
      code: errorData?.code,
      name: errorData?.name,
      message: errorData?.message,
    };
    data.message = errorData?.message;
    data.status = false;
    data.body = null;
    console.log("error", data);
  }

  return data;
};

export default request;
