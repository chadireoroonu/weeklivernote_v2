import axiosInstance from "./axiosConfig";

export const fetchNotice = async () => {
  try {
    const res = await axiosInstance.get(`/v1/notice`);
    return res.data;
  } catch (err) {
    console.log("err", err);
    throw new Error("공지사항 조회 실패");
  }
};
