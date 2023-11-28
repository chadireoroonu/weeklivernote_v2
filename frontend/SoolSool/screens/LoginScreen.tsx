import {
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
  Text,
  ImageBackground,
  Dimensions,
} from "react-native";
import { Button } from "react-native-paper";
import { characterSet, kakaoLoginButton, mainbackground } from "../assets";

function LoginScreen({ navigation }) {
  const handleLogin = () => {
    console.log("카카오버튼을 클릭했습니다");
    navigation.navigate("KakaoLoginScreen");
  };

  const screenHeight = Dimensions.get("window").height;

  return (
    <ImageBackground
      source={mainbackground}
      style={[{ height: screenHeight }, styles.background]}
    >
      <View style={styles.mainContainer}>
        <View style={styles.ImageContainer}>
          <Image source={characterSet} style={styles.logoImage} />
          <View style={styles.shadow}></View>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>마신 술을 기록하고</Text>
          <Text style={styles.text}>내 상태를 확인해요</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleLogin}>
            <Image source={kakaoLoginButton} style={styles.kakaoLoginButton} />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {},
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 50,
    height: "100%",
    // backgroundColor: "red",
  },
  ImageContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // backgroundColor: "green",
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
  },
  kakaoLoginButton: {
    width: 280,
    height: 60,
    marginTop: 20,
    marginRight: "auto",
    marginLeft: "auto",
    borderRadius: 15,
  },
  logoImage: {
    position: "relative",
    width: 350,
    height: 220,
    marginRight: "auto",
    marginLeft: "auto",
    zIndex: 2,
  },
  shadow: {
    width: 100,
    height: 80,
    position: "relative",
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255,0.3)",
    transform: [{ scaleX: 3 }],
    zIndex: 1,
    marginTop: -70,
  },
  text: {
    fontSize: 20,
    fontFamily: "LineRegular",
    color: "white",
  },
  temp: {
    display: "flex",
    flexDirection: "row",
  },
});

export default LoginScreen;
