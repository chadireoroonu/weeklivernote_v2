import axiosInstance from "./axiosConfig";
import * as FileSystem from "expo-file-system";
import { Buffer } from "buffer";

// 일간 음주 총계 조회
export const fetchDrink = async (drinkDate: string) => {
  try {
    const res = await axiosInstance.get(`/v1/drink/${drinkDate}`);
    return res.data;
  } catch (err) {
    console.log("axios 호출 실패하는 이유", err);
    throw new Error("drink record 조회 get 요청 실패");
  }
};

// 음주 기록 추가
export const createDrink = async (drinkData) => {
  try {
    const res = await axiosInstance.post(`/v1/drink`, drinkData);
    console.log("성공했다면", res.data);
    return res.data;
  } catch (err) {
    console.log("axios 호출 실패");
    throw new Error("drink record 기록 post 요청 실패");
  }
};

// 음주 기록 수정
export const updateDrink = async (drinkData) => {
  try {
    const res = await axiosInstance.patch(`/v1/drink`, drinkData);
    // console.log("성공했다면", res.data);
    return res.data;
  } catch (err) {
    console.log("axios 호출 실패");
    throw new Error("drink record 기록 patch 요청 실패");
  }
};

// 음주 기록 삭제 (개별 술 기록 삭제)
export const deleteDrink = async (drinkData) => {
  try {
    const res = await axiosInstance.delete(`/v1/drink-one`, {
      data: drinkData,
    });
    return res.data;
  } catch (err) {
    // console.log("axios 호출 실패");
    throw new Error("drink record 기록 delete 요청 실패");
  }
};

// 일간 음주 기록 완전 삭제
export const removeDrink = async (drinkDate) => {
  try {
    const res = await axiosInstance.delete(`/v1/drink/daily/${drinkDate}`);
    console.log("성공했다면", res.data);
    return res.data;
  } catch (err) {
    // console.log("axios 호출 실패");
    if (err.response) {
      console.error("응답 데이터:", err.response.data);
      console.error("응답 상태 코드:", err.response.status);
    }
    throw new Error("drink record 기록 delete 요청 실패");
  }
};

// 월간 음주 기록 조회
export const fetchMonthRecord = async (day) => {
  try {
    const res = await axiosInstance.get(`/v1/drink/monthly/${day}`);
    console.log("성공!", res.data);
    return res.data;
  } catch (err) {
    console.log(err);
    throw new Error("월간 음주기록 조회 실패!");
  }
};

// 일간 음주기록 요약 조회
export const fetchDailyDrink = async (day) => {
  try {
    const res = await axiosInstance.get(`/v1/drink/daily/${day}`);
    console.log(`${day} 날짜의 요약 정보 조회 요청 성공!`, res.data);
    return res.data;
  } catch (err) {
    console.log("왜실패할까?", err);
    throw new Error(`음주기록 요약 조회 실패! 실패한 날짜는 ${day}`);
  }
};

// 일간 음주기록 상세 조회
export const fetchDailyDetail = async (day) => {
  try {
    const res = await axiosInstance.get(`/v1/drink/daily-detail/${day}`);
    // console.log("성공!", res.data);
    return res.data;
  } catch (err) {
    throw new Error(`음주기록 상세 조회 실패! 실패한 날짜는 ${day}`);
  }
};

function base64ToArrayBuffer(base64) {
  const buffer = Buffer.from(base64, "base64");
  return buffer.buffer;
}

// 사진 기록
// export const postImage = async (day, imageUri) => {
//   try {
//     const base64 = await FileSystem.readAsStringAsync(imageUri, {
//       encoding: FileSystem.EncodingType.Base64,
//     });
//     const arrayBuffer = base64ToArrayBuffer(base64);
//     let blob = new Blob([new Uint8Array(arrayBuffer)], { type: "image/jpeg" });
//     let formData = new FormData();
//     formData.append("image", blob, "image.jpg");

//     const res = await axiosInstance.post(`/v1/drink/photo/${day}`, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//     console.log("사진 post 요청 성공", res.data);
//     return res.data;
//   } catch (err) {
//     console.error("Failed to upload the image:", err);
//     throw new Error("사진 post 요청 실패");
//   }
// };

export const postImage = async (body, token, day) => {
  console.log("보내기 직전에 formData확인", body);
  console.log("토큰 확인", token);
  try {
    const res = await fetch(
      process.env.REACT_APP_BACK_URL + `/v1/drink/photo/${day}`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "multipart/form-data; boundary=someArbitraryUniqueString",
          Authorization: `Bearer ${token}`,
        },
        body: body,
      }
    );

    if (!res.ok) {
      throw new Error("사진 post 요청 실패");
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.log("사진 포스트 안되는 이유", err);
    throw new Error("이미지 저장 요청 실패");
  }
};
