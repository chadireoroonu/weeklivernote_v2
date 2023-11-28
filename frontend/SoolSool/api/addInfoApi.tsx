import axiosInstance from "./axiosConfig";
import axios from "axios";

// export const saveUserInfo = async (
//   socialId,
//   weight,
//   height,
//   gender,
//   address,
//   drinkInfo
// ) => {
//   // console.log("data확인", socialId, weight, height, gender, address, drinkInfo);
//   try {
//     const res = await axiosInstance.patch(`/v1/user`, {
//       socialId: socialId,
//       weight: weight,
//       height: height,
//       gender: gender,
//       address: address,
//       drinkInfo: drinkInfo,
//     });
//     return res.data;
//   } catch (err) {
//     console.log("error",err);
//     throw new Error("사용자 정보 추가 patch 요청 실패");
//   }
// };

export const saveUserInfo = async (
  socialId,
  weight,
  height,
  gender,
  address,
  drinkInfo
) => {
  try {
    const response = await axios.patch(process.env.REACT_APP_BACK_URL+"/v1/user", {
      socialId: socialId,
      weight: weight,
      height: height,
      gender: gender,
      address: address,
      drinkInfo: drinkInfo,
    });
    
    return response.data;
  } catch (error) {
    console.error("error", error);
    throw new Error("사용자 정보 업데이트 patch 요청 실패");
  }
};