import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://192.168.18.17:5000/api/admin",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("quickChatAminToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Response interceptor remains unchanged
axiosInstance.interceptors.response.use(
  (response) => {
    if (response.config.responseType === "blob") {
      const contentDisposition = response.headers["content-disposition"];
      const fileName = contentDisposition
        ? contentDisposition.split("filename=")[1]
        : "data.xlsx";

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");

      link.href = url;
      link.setAttribute("download", fileName.replace(/"/g, ""));
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    return response;
  },

  (error) => {
    // if (error.response.status === 401) {
    //   if (localStorage.getItem("quickChatAminToken")) {
    //     localStorage.removeItem("quickChatAminToken");
    //     window.location.href = "/";
    //   }
    // }
    return Promise.reject(error);
  }
);

export default axiosInstance;
