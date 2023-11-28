import axiosInstance from "./axiosConfig";

export const fetchWeeklyStatistics = async () => {
  try {
    const res = await axiosInstance.get(`/v1/user/stat-chart`);
    return res.data;
  } catch (err) {
    console.log("err", err);
    throw new Error("그래프 실패");
  }
};

export const fetchYearlyStatistics = async () => {
  try {
    const res = await axiosInstance.get(`/v1/user/stat-chart`);
    return res.data;
  } catch (err) {
    console.log("err", err);
    throw new Error("그래프 실패");
  }
};
