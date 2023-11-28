import axiosInstance from "./axiosConfig";

export const fetchHomeRoute = async () => {
  try {
    const res = await axiosInstance.get(`/v2/location`);
    // console.log("성공했다면", res.data);
    return res.data;
  } catch (err) {
    // console.log("경로 요청 axios 호출 실패", err);
    throw new Error("???");
  }
};
