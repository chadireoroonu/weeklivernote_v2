import {
  ImageBackground,
  View,
  Text,
  Dimensions,
  StyleSheet,
  ScrollView,
} from "react-native";
import { subbackground } from "../assets";
import { Button, ProgressBar, MD3Colors } from "react-native-paper";
import { useState, useEffect } from "react";

function WelcomeScreen({ navigation }) {
  const screenHeight = Dimensions.get("window").height;
  const [progress, setProgress] = useState(0);

  const handleStartButtonClick = () => {
    navigation.navigate("BottomTab");
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setProgress((prevProgress) => prevProgress + 0.1);
    }, 200);

    const timeoutId = setTimeout(() => {
      navigation.navigate("BottomTab");
    }, 2500);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [navigation]);

  return (
    <ImageBackground
      source={subbackground}
      style={[{ height: screenHeight }, styles.mainContainer]}
    >
      <ScrollView>
        <View style={styles.subContainer}>
          <ProgressBar
            progress={progress}
            color="#000000"
            style={{ width: 300, height: 5 }}
          />
          <Text style={styles.titleText}>어서오세요 주간일기에</Text>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
  },
  subContainer: {
    display: "flex",
    height: "100%",
    flexDirection: "column",
    marginVertical: 370,
    alignItems: "center",
    gap: 15,
    // backgroundColor: "red",
  },
  titleText: {
    fontFamily: "LineRegular",
    fontSize: 28,
    textAlign: "center",
    color: "white",
  },
});

export default WelcomeScreen;
