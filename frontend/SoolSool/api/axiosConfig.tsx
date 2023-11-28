import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const axiosInstance = axios.create({
  // 추후 .env 파일에 환경변수 생성해서 사용할 것
  baseURL: process.env.REACT_APP_BACK_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Axios 인스턴스에 요청 전에 인터셉터해서 accessToken 추가
axiosInstance.interceptors.request.use(
  async (config) => {
    //AsyncStorage에서 accessToken을 불러옴
    const accessToken = await AsyncStorage.getItem("accessToken");
    // console.log("AccessToken", accessToken);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    console.log("AccessToken이 없습니다", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
