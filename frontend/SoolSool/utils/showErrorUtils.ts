import { Alert } from "react-native";

export const showErrorAndRetry = (title: string, content: string) => {
  Alert.alert(
    // "다음에 다시 시도하세요",
    // "알 수 없는 오류가 발생했습니다. 나중에 다시 시도하세요.",
    title,
    content,
    [
      {
        text: "확인", // 알림에 표시될 버튼 텍스트
        onPress: () => {
          // 사용자가 확인 버튼을 눌렀을 때 실행할 코드
          // 아무것도 없을 경우 그냥 알림 꺼짐
          // 추가 작업 로직 쓰기
        },
      },
    ],
    { cancelable: false } // 사용자가 뒤로가기 버튼으로 알림을 닫을 수 없게 만드는 옵션
  );
};
