import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Dimensions,
  Alert,
} from "react-native";
import { Button } from "react-native-paper";
import { LCfirst } from "../../assets";
import AsyncStorage from "@react-native-async-storage/async-storage";

function LastChanceFirst({ navigation }) {
  const screenHeight = Dimensions.get("window").height;

  const goToHome = async () => {
    try {
      const destLocation = await AsyncStorage.getItem("destLocation");
      const alarmTime = await AsyncStorage.getItem("alarmTime");
      const nowLocation = await AsyncStorage.getItem("nowLocation");

      if (destLocation === '{"latitude":0,"longitude":0}') {
        Alert.alert("알림", "도착지를 입력해주세요.", [
          {
            text: "입력하러 가기",
            onPress: () => navigation.navigate("EditProfile"),
          },
        ]);
        return;
      }

      if (alarmTime === null && alarmTime === "{}") {
        Alert.alert("알림", "먼저 음주기록을 작성하세요.", [
          { text: "입력하러 가기", onPress: () => navigation.navigate("Home") },
        ]);
        return;
      }

      if (nowLocation === null && nowLocation === "{}") {
        Alert.alert("알림", "먼저 음주기록을 작성하세요.", [
          { text: "입력하러 가기", onPress: () => navigation.navigate("Home") },
        ]);
        return;
      }

      navigation.navigate("HomeRoute");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ImageBackground
      source={LCfirst}
      style={[{ height: screenHeight }, styles.mainContainer]}
    >
      <View style={styles.lastChanceContainer}>
        <Text style={styles.text}>집까지 가는 막차를 알려드릴게요</Text>
        <Button
          mode="contained"
          buttonColor="black"
          textColor="white"
          labelStyle={styles.button}
          rippleColor={"white"}
          loading={true}
          onPress={goToHome}
        >
          귀가 경로 조회하기
        </Button>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingTop: 100,
    paddingBottom: 100,
  },
  lastChanceContainer: {
    width: "80%",
    display: "flex",
    flexDirection: "column",
    // alignItems: "center",
    gap: 10,
    marginRight: "auto",
    marginLeft: "auto",
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize: 24,
  },
  button: {
    fontSize: 15,
  },
});

export default LastChanceFirst;
