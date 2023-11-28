import axiosInstance from "./axiosConfig";

export const logOut = async () => {
  try {
    const res = await axiosInstance.post(`/v1/user/logout`);
    // console.log("성공했다면", res.data);
    return res.data;
  } catch (err) {
    // console.log("axios 호출 실패");
    throw new Error("로그아웃 요청 실패");
  }
};

export const signOut = async () => {
  try {
    const res = await axiosInstance.post(`/v1/user`);
    // console.log("성공했다면", res.data);
    return res.data;
  } catch (err) {
    // console.log("axios 호출 실패");
    throw new Error("회원탈퇴 요청 실패");
  }
};
