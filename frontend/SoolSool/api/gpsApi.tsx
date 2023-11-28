import axiosInstance from "./axiosConfig";

export const updateNowGpsInfo = async (gpsInfo) => {
	try {
		const res = await axiosInstance.patch(`/v2/gps`, gpsInfo);
    return res.data;
    
	} catch (err) {
		console.log("err", err);
		throw new Error("현재 위치 patch 요청 실패");
	}
};
