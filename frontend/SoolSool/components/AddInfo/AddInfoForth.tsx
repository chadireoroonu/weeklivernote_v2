import React from "react";
import {
  Dimensions,
  View,
  Text,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { mainbackground } from "../../assets";
import { Button } from "react-native-paper";

function AddInfoForth({
  gender,
  height,
  weight,
  address,
  drinkCategory,
  drinkUnit,
  drinkAmount,
  socialId,
  navigation,
}) {
  const screenHeight = Dimensions.get("window").height;

  return (
    <ImageBackground
      source={mainbackground}
      style={[{ height: screenHeight }, styles.mainContainer]}
    >
      <View style={styles.subContainer}>
        {/* <Text style={styles.questionText}>시작할까요?</Text> */}
        <Button mode="outlined" textColor="white">
          주간일기 시작하기
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
    justifyContent: "center",
  },
  subContainer: {
    width: "90%",
    marginRight: "auto",
    marginLeft: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 50,
    // marginTop: 130,
    justifyContent: "center",
    paddingHorizontal: 10,
    // borderWidth: 1,
    // borderColor: "green",
  },
  questionText: {
    color: "white",
    fontSize: 20,
  },
});

export default AddInfoForth;
