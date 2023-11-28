import * as MailComposer from "expo-mail-composer";
import Toast from "react-native-root-toast";

export const sendEmail = async () => {
  let options = {
    subject: "문의사항 제목을 입력해주세요",
    recipients: ["official.ohyes@gmail.com"],
    body: "문의사항 내용을 입력해주세요",
  };

  let promise = new Promise((resolve, reject) => {
    MailComposer.composeAsync(options)
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });

  let statusText = (type: MailComposer.MailComposerStatus) => {
    switch (type) {
      case "cancelled":
        return "문의 메일이 임시저장되지 않았습니다";
      case "saved":
        return "문의 메일이 임시저장되었습니다";
      case "sent":
        return "문의 메일이 전송되었습니다";
      case "undetermined":
        return "오류가 발생했습니다";
    }
  };

  promise.then(
    (result: MailComposer.MailComposerResult) => {
      const message = statusText(result.status);
      Toast.show(message, {
        duration: Toast.durations.SHORT,
      });
    },
    (err) => {
      console.log(err);
    }
  );
};
