import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RESET_TASK_NAME = "RESET_UPDATE_LOCATION_TASK";
const ALARM_TIME_TASK_NAME = "RESET_ALARM_TIME_TASK";

// 현재 시간이 새벽 5시인지 확인 후 storage 초기화
TaskManager.defineTask(RESET_TASK_NAME, async () => {
	const now: Date = new Date();
	const year = now.getFullYear();
	const month = ("0" + (now.getMonth() + 1)).slice(-2);
	const date = ("0" + now.getDate()).slice(-2);
	const nowDate = `${year}-${month}-${date}`;
	let todayPostDate = JSON.parse((await AsyncStorage.getItem("todayPostDate")) || "null");

	if (todayPostDate !== null) {
		todayPostDate = todayPostDate.split("T")[0];
	}

	if (now.getHours() >= 5 && todayPostDate != nowDate) {
		try {
			await AsyncStorage.setItem("keepUpdateLocation", JSON.stringify(true));
			await AsyncStorage.removeItem("alarmTime");
			await AsyncStorage.removeItem("todayPostDate");
			await AsyncStorage.setItem("nowLocation", "{}");
		} catch (err) {
			console.error("storage 초기화에 실패했습니다 : ", err);
		}
	}
});

// 막차 알림 시간이 지나면 keepUpdateLocation/alarmTime 초기화
TaskManager.defineTask(ALARM_TIME_TASK_NAME, async () => {
	const now: Date = new Date();
	let alarmTime: string | null = null;

	try {
		alarmTime = await AsyncStorage.getItem("alarmTime");
	} catch (err) {
		console.error("alarmTime 값 조회에 실패했습니다 : ", err);
		return;
	}

	if (alarmTime) {
		const [alarmHour, alarmMinute] = alarmTime.split(":").map(Number);
		const alarmDateTime = new Date(
			now.getFullYear(),
			now.getMonth(),
			now.getDate(),
			alarmHour,
			alarmMinute
		);

		console.log("알림 시간은 ?! : ", alarmDateTime);

		if (now.getTime() >= alarmDateTime.getTime()) {
			await AsyncStorage.setItem("keepUpdateLocation", JSON.stringify(true));
			await AsyncStorage.removeItem("alarmTime");
			await AsyncStorage.removeItem("todayPostDate");
		}
	}
});

// 태스크 등록 및 백그라운드 패치 활성화
export const registerResetTask = async () => {
	const now: Date = new Date();
	const currentHour = now.getHours();

	// 새벽 4시부터 6시 사이인 경우에만 태스크 등록
	if (currentHour >= 4 && currentHour < 7) {
		try {
			await BackgroundFetch.registerTaskAsync(RESET_TASK_NAME, {
				minimumInterval: 3600,
				stopOnTerminate: true,
				startOnBoot: true,
			});
		} catch (err) {
			console.error("TASK 등록에 실패하였습니다 : ", err);
		}
	}
};

export const registerAlarmTimeResetTask = async () => {
	const now: Date = new Date();
	const currentHour = now.getHours();

	// 저녁 7시부터 새벽 2시 사이인 경우에만 태스크 등록
	if (
		(currentHour >= 19 && currentHour <= 23) ||
		(currentHour >= 0 && currentHour < 2)
	) {
		try {
			await BackgroundFetch.registerTaskAsync(ALARM_TIME_TASK_NAME, {
				minimumInterval: 1800,
				stopOnTerminate: true,
				startOnBoot: true,
			});
		} catch (err) {
			console.error("TASK 등록에 실패하였습니다 : ", err);
		}
	}
};
