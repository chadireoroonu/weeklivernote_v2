import { Text, View, StyleSheet, Alert } from "react-native";
import { Button, HelperText, TextInput } from "react-native-paper";
import React, { useState, useEffect } from "react";

function BodyDetail({ height, setHeight, weight, setWeight, onNextClick }) {
  // const goToNextStep = () => {
  //   if (gender && weight && height) {
  //     // gender가 null이 아니면 다음 단계로 이동
  //     if (weight < 30 || weight > 200 || height < 120 || height > 220) {
  //       Alert.alert("알림", "체중 및 신장 데이터가 적합하지 않습니다.");
  //     } else {
  //       navigation.navigate("AddInfoStep2", {
  //         height: parseInt(height),
  //         weight: parseInt(weight),
  //         gender: gender,
  //         socialId: socialId,
  //       });
  //     }
  //   } else {
  //     Alert.alert("알림", "모든 항목을 선택해주세요.");
  //   }
  // };

  const hasWeightErrors = () => {
    // console.log("durl", parseInt(weight));
    return parseInt(weight) < 30 && parseInt(weight) > 0;
  };

  const hasHeightErrors = () => {
    // console.log("durl", parseInt(weight));
    return parseInt(height) < 110 && parseInt(height) > 0;
  };

  // useEffect(() => {
  //   console.log("체중", weight);
  //   console.log("신장", height);
  // }, [weight, height]);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.subContainer}>
        <View style={styles.contentContainer}>
          <Text style={styles.text}>신장을 알려주세요</Text>
          <View style={styles.rowContainer}>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={height}
              onChangeText={(value) => setHeight(value)}
            />
            <Text style={styles.text}>cm</Text>
          </View>
          <HelperText
            type="error"
            visible={hasHeightErrors()}
            style={styles.warningtext}
          >
            올바른 숫자를 입력해주세요
          </HelperText>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.text}>체중을 알려주세요</Text>
          <View style={styles.rowContainer}>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={weight}
              onChangeText={(value) => setWeight(value)}
            />
            <Text style={styles.text}>kg</Text>
          </View>
          <HelperText
            type="error"
            visible={hasWeightErrors()}
            style={styles.warningtext}
          >
            올바른 숫자를 입력해주세요
          </HelperText>
        </View>
      </View>
      <Button
        mode="contained"
        onPress={onNextClick}
        buttonColor={"#FFDE68"}
        textColor={"#000000"}
      >
        다음 단계로 가기
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    // backgroundColor: "#FFFF",
    flexDirection: "column",
    gap: 15,
    borderRadius: 20,
  },
  text: {
    fontSize: 20,
    fontFamily: "LineRegular",
    color: "white",
  },
  input: {
    height: 40,
    backgroundColor: "rgba(255, 222, 104, 0.5)",
    // borderColor: "gray",
    // borderWidth: 1,
    width: "90%",
    marginBottom: 10,
  },
  subContainer: {
    display: "flex",
    flexDirection: "column",
    // borderWidth: 1,
    // borderColor: "green",
    // justifyContent: "center",
    alignItems: "flex-start",
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    // borderWidth: 1,
    // borderColor: "blue",
    width: "100%",
  },
  rowContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    width: "100%",
    // borderWidth: 1,
    // borderColor: "red",
  },
  warningtext: {
    fontSize: 15,
    fontFamily: "LineRegular",
    color: "#FFDE68",
  },
});

export default BodyDetail;
