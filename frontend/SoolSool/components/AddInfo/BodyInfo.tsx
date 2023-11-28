import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { Icon, MD3Colors } from "react-native-paper";
import BodyDetail from "./BodyDetail";

function BodyInfo({
  gender,
  setGender,
  height,
  setHeight,
  weight,
  setWeight,
  onNextClick,
}) {
  // useEffect(() => {
  //   console.log("현재 성별은", gender);
  // }, [gender]);

  const [selectedGender, setSelectedGender] = useState(""); // 초기값은 빈 문자열로 설정
  const handleGenderSelection = (gender) => {
    if (selectedGender === gender) {
      // 이미 선택된 버튼을 다시 누를 경우 선택 해제
      setSelectedGender("");
      setGender("");
    } else {
      // 다른 버튼을 선택한 경우 선택 상태로 변경
      setSelectedGender(gender);
      setGender(gender);
    }
  };

  // 스타일을 선택된 버튼에 따라 동적으로 적용
  const getButtonStyle = (gender) => {
    if (selectedGender === gender) {
      return [styles.button, styles.selectedButton];
    }
    return styles.button;
  };

  const getButtonTextStyle = (gender) => {
    if (selectedGender === gender) {
      return [styles.buttonText, styles.selectedButtonText];
    }
    return styles.buttonText;
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.titleContainer}>
        <View style={styles.titleSubContainer}>
          <Text style={styles.title}>신체정보</Text>
          <Icon
            source="lightbulb-on-outline"
            color={MD3Colors.error10}
            size={30}
          />
        </View>
        <Text style={styles.mainText}>
          ※ 신체정보를 기준으로 혈중 알코올 농도를 계산합니다.
        </Text>
      </View>
      <View style={styles.columnContainer}>
        <Text style={styles.text}>성별을 알려주세요</Text>
        <View style={styles.rowContainer}>
          <TouchableOpacity
            style={getButtonStyle("남자")}
            onPress={() => handleGenderSelection("남자")}
          >
            <Text style={getButtonTextStyle("남자")}>남자</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={getButtonStyle("여자")}
            onPress={() => handleGenderSelection("여자")}
          >
            <Text style={getButtonTextStyle("여자")}>여자</Text>
          </TouchableOpacity>
        </View>
      </View>
      <BodyDetail
        height={height}
        setHeight={setHeight}
        weight={weight}
        setWeight={setWeight}
        onNextClick={onNextClick}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    // backgroundColor: "#FFFF",
    flexDirection: "column",
    gap: 40,
    borderRadius: 20,
  },
  titleContainer: {
    flexDirection: "column",
    width: "100%",
    gap: 10,
    // justifyContent: "space-evenly",
  },
  titleSubContainer: {
    flexDirection: "row",
    width: "100%",
    // justifyContent: "space-evenly",
  },
  rowContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  columnContainer: {
    flexDirection: "column",
    gap: 10,
  },
  button: {
    backgroundColor: "rgba(255, 222, 104, 0.5)",
    borderRadius: 10,
    width: "48%",
    height: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 25,
    color: "white",
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    fontFamily: "LineRegular",
  },
  text: {
    fontSize: 20,
    fontFamily: "LineRegular",
    color: "white",
  },
  selectedButton: {
    backgroundColor: "#FFDE68",
  },
  selectedButtonText: {
    color: "#000000",
    fontFamily: "LineRegular",
  },
  mainText: {
    fontSize: 15,
    color: "white",
    fontFamily: "LineRegular",
  },
});

export default BodyInfo;
