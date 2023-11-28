import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { fetchDailyDrink, removeDrink } from "../../api/drinkRecordApi";
import { useFocusEffect } from "@react-navigation/native";

import {
  getDrinkImageById,
  getIdByOnlyCategory,
  getShotAmountByDrinkCOunt,
} from "../../utils/drinkUtils";
import { ImageBackground } from "expo-image";
import { Button, Icon, MD3Colors, Modal, Portal } from "react-native-paper";
import { useQuery } from "react-query";

import DailyDetail from "./DailyDetail";
import Toast from "react-native-root-toast";

interface DailyDrink {
  count: number;
  drink: string;
}

interface DailyInfo {
  date: string;
  drinks: DailyDrink[];
  topConc: number;
  totalDrink: number;
}

function DailySummary(props) {
  const { queryDate, navigation } = props;
  const [dailyInfo, setDailyInfo] = useState<DailyInfo>({
    date: "",
    drinks: [],
    topConc: 0,
    totalDrink: 0,
  });
  const [isModal, setIsModal] = useState<boolean>(false);

  const {
    data: DailyDrinkData,
    isLoading: DailyDrinkLoading,
    isError: DailyDrinkError,
  } = useQuery(
    ["DailyDrinkQuery", queryDate], // 두번째에 의존성 추가 가능
    async () => await fetchDailyDrink(queryDate)
  );

  useFocusEffect(
    React.useCallback(() => {
      if (DailyDrinkData) {
        setDailyInfo(DailyDrinkData);
      }
    }, [DailyDrinkData, navigation])
  );

  // 글 삭제 모달 및 삭제
  const openDeleteModal = () => {
    setIsModal(true);
  };
  const hideDeleteModal = () => {
    setIsModal(false);
  };

  // @@@@@@@@@@@@@@@@@@@@@@현재 문제 있음@@@@@@@@@@@@@@@@@@@@@@
  // 삭제 실패의 경우, 일부 데이터만 삭제 됨
  const confirmDelete = async () => {
    try {
      await removeDrink(queryDate);
      hideDeleteModal();
      navigation.navigate("Calendar");
    } catch (error) {
      Toast.show("잠시후다시 시도해주세요.", {
        duration: Toast.durations.SHORT,
      });
      console.error("삭제 에러:", error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.box}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("RecordCreate", {
                date: queryDate,
                isAlcohol: true,
              });
            }}
          >
            <Text style={styles.buttonText}>수정</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#363C4B" }]}
            onPress={openDeleteModal}
          >
            <Text style={[styles.buttonText, { color: "white" }]}>삭제</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.total}>
          <View style={styles.informations}>
            <View style={styles.category}>
              {dailyInfo.drinks.slice(0, 3).map((alcohol, index) => (
                <View style={styles.eachAlcohol} key={index}>
                  <View style={styles.eachAlcoholIcon}>
                    <ImageBackground
                      source={getDrinkImageById(
                        getIdByOnlyCategory(alcohol.drink)
                      )}
                      style={styles.imageContainer}
                      resizeMode="contain"
                    />
                    <Text style={styles.drinkStyle}>
                      {getShotAmountByDrinkCOunt(alcohol.drink, alcohol.count)}
                      잔
                    </Text>
                  </View>
                </View>
              ))}
            </View>
            <View style={styles.textInformations}>
              <View style={styles.iconAndTextBox}>
                <Icon source="cup-water" size={24} color="#0477BF" />
                <Text style={styles.totalText}>
                  {` ${dailyInfo.totalDrink.toLocaleString()}`}
                  <Text style={styles.unit}> ml</Text>
                </Text>
              </View>
              <View style={styles.iconAndTextBox}>
                <Icon source="blood-bag" size={24} color={MD3Colors.error50} />
                <Text style={styles.totalText}>
                  {` ${dailyInfo.topConc.toFixed(3)}`}
                  <Text style={styles.unit}> %</Text>
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.detail}>
        <DailyDetail queryDate={queryDate} />
      </View>

      <Portal>
        <Modal
          visible={isModal}
          onDismiss={hideDeleteModal}
          contentContainerStyle={{
            backgroundColor: "white",
            padding: 20,
            width: "90%",
            height: "20%",
            borderRadius: 5,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <View style={styles.mainContainer}>
            <Text style={styles.alertTitle}>주간일기</Text>
            <Text>정말 삭제하시겠습니까?</Text>
            <View style={styles.buttonContainer}>
              <Button
                mode="outlined"
                onPress={hideDeleteModal}
                style={{ marginHorizontal: "1%" }}
              >
                취소
              </Button>
              <Button
                mode="contained"
                buttonColor={"#363C4B"}
                onPress={confirmDelete}
                style={{ marginHorizontal: "1%" }}
              >
                삭제
              </Button>
            </View>
          </View>
        </Modal>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    height: "20%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    height: "40%",
    top: "-5%",
    marginRight: "3%",
  },
  button: {
    width: "15%",
    height: "auto",
    top: "-1.5%",
    alignItems: "center",
    justifyContent: "center",
    margin: "1%",
    paddingHorizontal: "1%",
    paddingVertical: "0.5%",
    borderWidth: 1,
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 15,
  },
  total: {
    height: "80%",
    borderRadius: 5,
    backgroundColor: "#ffffff",
    width: "95%",
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: "-5%",
    borderWidth: 1,
    borderColor: "#d2d2d2",
  },
  informations: {
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  category: {
    width: "50%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
  },
  eachAlcohol: {
    height: "80%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  eachAlcoholIcon: {
    height: "80%",
    justifyContent: "center",
  },
  textInformations: {
    width: "50%",
    height: "90%",
    padding: 5,
    flexDirection: "column",
    justifyContent: "space-around",
    marginBottom: "3%",
    marginLeft: "5%",
  },
  iconAndTextBox: {
    flexDirection: "row",
  },
  New: {
    width: 70,
    height: 70,
    backgroundColor: "#363C4B",
    borderRadius: 50,
    marginRight: "auto",
    marginLeft: "auto",
  },
  plus: {
    fontSize: 50,
    color: "#FFFFFF",
    textAlign: "center",
    textAlignVertical: "center", // Android
    // flex: 1, // iOS
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  closeButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  imageContainer: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  drinkStyle: {
    textAlign: "center",
    fontSize: 15,
  },
  totalText: {
    fontSize: 20,
  },
  unit: {
    fontSize: 16,
  },
  detail: {
    height: "80%",
    // backgroundColor: "yellow",
  },
  mainContainer: {
    gap: 15,
    paddingHorizontal: "5%",
  },
  alertTitle: {
    fontSize: 20,
  },
});

export default DailySummary;
