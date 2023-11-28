import React, { useEffect, useState } from "react";
import {
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ImageBackground,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { adaptiveIcon, drink01, drink04, mainbackground } from "../../assets";
import { Button } from "react-native-paper";
import { saveUserInfo } from "../../api/addInfoApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showErrorAndRetry } from "../../utils/showErrorUtils";

function AddInfoThird({
  gender,
  height,
  weight,
  address,
  socialId,
  navigation,
  drinkCategory,
  setDrinkCategory,
  drinkUnit,
  setDrinkUnit,
  drinkAmount,
  setDrinkAmount,
}) {
  const [selectedDrinkKind, setSelectedDrinkKind] = useState(null);
  const handleDrinkKindSelection = (drinkKind) => {
    if (selectedDrinkKind === drinkKind) {
      // 이미 선택된 버튼을 다시 누를 경우 선택 해제
      setSelectedDrinkKind("");
      setDrinkCategory("");
    } else {
      // 다른 버튼을 선택한 경우 선택 상태로 변경
      setSelectedDrinkKind(drinkKind);
      setDrinkCategory(drinkKind);
    }
  };

  // 스타일을 선택된 버튼에 따라 동적으로 적용
  const getButtonStyle = (drinkKind) => {
    if (selectedDrinkKind === drinkKind) {
      return styles.selectedButton;
    }
    return styles.drinkButton;
  };

  const getButtonTextStyle = (drinkKind) => {
    if (selectedDrinkKind === drinkKind) {
      return styles.selectedButtonText;
    }
    return styles.ButtonText;
  };

  const getImageURL = () => {
    if (selectedDrinkKind === null) {
      return adaptiveIcon;
    } else if (selectedDrinkKind === "소주") {
      return drink01;
    } else {
      return drink04;
    }
  };

  const handleSubmitInfo = () => {
    if (!drinkCategory || drinkAmount == 0) {
      showErrorAndRetry("알림", "모든 항목을 정확히 입력해주세요");
      return;
    }
    const drinkInfo = {
      category: drinkCategory,
      drinkUnit: drinkUnit,
      drinkAmount: drinkAmount,
    };

    saveUserInfo(socialId, weight, height, gender, address, drinkInfo)
      .then(async (res) => {
        console.log("제출 성공", res.tokenInfo.accessToken);
        const accessToken = res.tokenInfo.accessToken;
        await AsyncStorage.setItem("accessToken", accessToken);
        const destLocation = res.gpsInfo;
        await AsyncStorage.setItem("destLocation", JSON.stringify(destLocation));
        const alcoholLimit: number = res.alcoholLimit;
				const roundedAlcoholLimit = alcoholLimit.toFixed(1);
				await AsyncStorage.setItem("alcoholLimit", roundedAlcoholLimit);
        // navigation.navigate("BottomTab");
        navigation.navigate("Welcome");
      })
      .catch((error) => {
        // console.error("추가정보 입력 실패", error);
        showErrorAndRetry(
          "다음에 다시 시도하세요",
          "알 수 없는 오류가 발생했습니다. 나중에 다시 시도하세요."
        );
      });
  };

  const screenHeight = Dimensions.get("window").height;

  return (
    <ImageBackground
      source={mainbackground}
      style={[{ height: screenHeight }, styles.mainContainer]}
    >
      <View style={styles.subContainer}>
        <Text style={styles.title}>회원님의 주량을 알려주세요</Text>
        <View style={styles.lastContainer}>
          <Image source={getImageURL()} style={styles.imageBox} />
          <View style={styles.drinkSelection}>
            <TouchableOpacity
              style={getButtonStyle("맥주")}
              onPress={() => handleDrinkKindSelection("맥주")}
            >
              <Text style={getButtonTextStyle("맥주")}>맥주</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={getButtonStyle("소주")}
              onPress={() => handleDrinkKindSelection("소주")}
            >
              <Text style={getButtonTextStyle("소주")}>소주</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.rowContainer}>
            {/* 주량 입력 */}
            <TextInput
              style={styles.amountInput}
              placeholder="주량을 입력하세요"
              value={drinkAmount}
              onChangeText={(text) => setDrinkAmount(text)}
              keyboardType="numeric"
            />

            {/* 주량 단위 선택 */}
            <Picker
              selectedValue={drinkUnit}
              onValueChange={(itemValue) => setDrinkUnit(itemValue)}
              style={styles.unitPicker}
              mode="dropdown"
            >
              <Picker.Item label="병" value="병" />
              <Picker.Item label="잔" value="잔" />
            </Picker>
          </View>
          {selectedDrinkKind && (
            <Text style={styles.selectedDrink}>
              {selectedDrinkKind} {drinkAmount}
              {drinkUnit}의 주량을 갖고계시는군요!
            </Text>
          )}
        </View>
        <Button
          mode="contained"
          onPress={handleSubmitInfo}
          buttonColor={"#FFDE68"}
          textColor={"#000000"}
        >
          모든 작성을 완료했어요!
        </Button>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
  },
  subContainer: {
    width: "90%",
    marginRight: "auto",
    marginLeft: "auto",
    display: "flex",
    // alignItems: "center",
    gap: 60,
    marginTop: 130,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginRight: "auto",
    marginLeft: "auto",
    color: "white",
    fontFamily: "LineRegular",
  },
  lastContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  drinkSelection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
    gap: 10,
  },
  drinkButton: {
    backgroundColor: "rgba(255, 222, 104, 0.5)",
    // padding: 5,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 60,
  },
  selectedButton: {
    backgroundColor: "#FFDE68",
    // padding: 5,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 60,
  },
  selectedButtonText: {
    fontSize: 17,
    color: "black",
    fontFamily: "LineRegular",
  },
  ButtonText: {
    fontSize: 17,
    color: "white",
  },
  selectedDrink: {
    fontSize: 18,
    textAlign: "center",
    color: "white",
    fontFamily: "LineRegular",
  },
  amountInput: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 8,
    // borderRadius: 8,
    color: "white",
    width: "60%",
  },
  unitPicker: {
    borderRadius: 8,
    width: "40%",
    backgroundColor: "rgba(255, 222, 104, 0.9)",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  imageBox: {
    width: 150,
    height: 150,
    marginRight: "auto",
    marginLeft: "auto",
    backgroundColor: "rgba(255, 222, 104, 0.1)",
    borderRadius: 500,
  },
  rowContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default AddInfoThird;
