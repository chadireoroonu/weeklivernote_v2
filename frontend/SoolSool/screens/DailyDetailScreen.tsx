import { StyleSheet, Text, View, ScrollView, Alert } from "react-native";
import { fetchDailyDetail } from "../api/drinkRecordApi";
import { useEffect, useState } from "react";
import DailySummary from "../components/Calendar/DailySummary";
import { Modal, Portal, Button } from "react-native-paper";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { removeDrink } from "../api/drinkRecordApi";
import { useQuery } from "react-query";
import AlcoholChart from "../components/Calendar/AlcoholChart";

function DailyDetailScreen({ route, navigation }) {
  const day = route.params.summaryText;
  console.log(`선택된 날짜의 정보를 확인합시다!!  날짜는 : ${day}`);
  const alcoholDays = route.params.alcoholDays;
  const isAlcohol = route.params.isAlcohol;
  const [isImg, setIsImg] = useState<boolean>(false);
  const [isModal, setIsModal] = useState<boolean>(false);

  const [info, setInfo] = useState({
    startTime: "",
    detoxTime: "",
    memo: "",
    img: "",
    hangover: "",
    drinks: {},
  });

  const {
    data: DailyDetailData,
    isLoading: dailyDetailLoading,
    isError: dailyDetailError,
  } = useQuery("DailyDetailQuery", async () => await fetchDailyDetail(day));

  // 해독시간
  const formatDetoxTime = (detoxTime) => {
    const totalMinutes = Math.round(detoxTime * 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}시간 ${minutes}분`;
  };

  useEffect(() => {
    if (DailyDetailData) {
      setInfo(DailyDetailData);
    }
  }, [DailyDetailData]);

  // 글 삭제 모달 및 삭제
  const openDeleteModal = () => {
    setIsModal(true);
  };
  const hideDeleteModal = () => {
    setIsModal(false);
  };
  const confirmDelete = () => {
    removeDrink(day);
    hideDeleteModal();
    navigation.navigate("Calendar");
  };

  return (
    <View style={styles.total}>
      <View style={styles.mainTextBox}>
        <Text style={styles.headerText}>술력</Text>
        <View style={styles.light}>
          <MaterialCommunityIcons
            name="lightbulb-on-outline"
            size={30}
            color="black"
            onPress={() => {
              Alert.alert("알림", "05시를 기준으로 하루를 초기화합니다.");
            }}
          />
        </View>
        <View style={styles.buttons}>
          <Button
            mode="outlined"
            onPress={() => {
              navigation.navigate("RecordCreate", {
                date: day,
                isAlcohol: true,
              });
            }}
            style={styles.botton}
          >
            수정
          </Button>
          <Button
            mode="contained"
            onPress={openDeleteModal}
            buttonColor={"#363C4B"}
            style={styles.botton}
          >
            삭제
          </Button>
        </View>
      </View>
      <View style={styles.summ}>
        <DailySummary
          summaryText={day}
          alcoholDays={alcoholDays}
          isAlcohol={isAlcohol}
        />
      </View>
      <View style={styles.contents}>
        <View style={styles.time}>
          <View style={styles.house}>
            <Text style={styles.smallHeaderText}>술 자리 시작 시간</Text>
            <Text>{info.startTime.substring(11, 16)}</Text>
          </View>
          <View style={styles.house}>
            <Text style={styles.smallHeaderText}>해독까지 걸린 시간</Text>
            <Text>{formatDetoxTime(info.detoxTime)}</Text>
          </View>
        </View>
        <View style={styles.house}>
          <View style={styles.chart}>
            <AlcoholChart drinks={info.drinks} />
          </View>
        </View>
        {/* <View style={styles.time}>
          <View style={styles.house}>
            <Text style={styles.smallHeaderText}>주종별 알코올 비율</Text>
            {Array.isArray(info.drinks) && info.drinks.length > 0 ? (
              info.drinks.map((drink, i) => (
                <Text key={i}>
                  {drink.category}: {drink.alcPercent}%
                </Text>
              ))
            ) : (
              <Text>음료 정보가 없습니다.</Text>
            )}
          </View>
          <View style={styles.house}>
            <Text style={styles.smallHeaderText}>주종별 음용 비율</Text>
            {Array.isArray(info.drinks) && info.drinks.length > 0 ? (
              info.drinks.map((drink, i) => (
                <Text key={i}>
                  {drink.category}: {drink.drinkPercent}%
                </Text>
              ))
            ) : (
              <Text>음료 정보가 없습니다.</Text>
            )}
          </View>
        </View> */}
        {isImg ? (
          <View style={styles.house}>
            <Text>사진</Text>
          </View>
        ) : null}
        <View style={styles.house}>
          <Text style={styles.smallHeaderText}>메모</Text>
          {info.memo ? (
            <Text style={styles.innerText}>{info.memo}</Text>
          ) : (
            <Text style={styles.innerText}>작성된 메모가 없어요</Text>
          )}
        </View>
      </View>
      {/* <Portal>
        <Modal
          visible={isModal}
          onDismiss={hideDeleteModal}
          style={styles.containerStyle}
        >
          <Text style={styles.deleteText}>
            {day} 음주 기록을 삭제하시겠습니까?
          </Text>
          <View style={styles.deleteButtons}>
            <Button
              mode="contained"
              onPress={confirmDelete}
              buttonColor={"#363C4B"}
            >
              삭제
            </Button>
            <Button
              mode="contained"
              onPress={hideDeleteModal}
              buttonColor={"#363C4B"}
            >
              취소
            </Button>
          </View>
        </Modal>
      </Portal> */}
      <Portal>
        <Modal
          visible={isModal}
          onDismiss={hideDeleteModal}
          contentContainerStyle={{
            backgroundColor: "white",
            padding: 20,
            width: "90%",
            borderRadius: 5,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <View style={styles.mainContainer}>
            <Text style={styles.alertTitle}>주간일기</Text>
            <View style={styles.textContainer}>
              <Text>정말 삭제하시겠습니까?</Text>
            </View>
            <View style={styles.buttonContainer}>
              <Button mode="outlined" onPress={hideDeleteModal}>
                취소
              </Button>
              <Button
                mode="contained"
                buttonColor={"#363C4B"}
                onPress={confirmDelete}
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
  total: {
    height: "80%",
    flex: 1,
  },
  mainBackground: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black",
  },
  mainTextBox: {
    height: "15%",
    padding: "5%",
    flexDirection: "row",
    alignItems: "flex-end",
    // backgroundColor: "pink",
  },
  headerText: {
    fontSize: 40,
    fontFamily: "LineRegular",
    verticalAlign: "bottom",
    textAlign: "center",
  },
  light: {
    height: "80%",
    // backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "2%",
  },
  buttons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  summ: {
    height: "20%",
    // backgroundColor: "pink",
  },
  contents: {
    height: "64%",
    margin: "1%",
    // backgroundColor: "black",
  },
  time: {
    flexDirection: "row",
  },
  chart: {
    height: "100%",
  },
  house: {
    flex: 1,
    // borderWidth: 2,
    // borderColor: "#363C4B",
    backgroundColor: "#ffffff",
    borderRadius: 5,
    margin: 5,
    marginTop: "5%",
    padding: "3%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // 안드로이드에서 그림자 효과 추가
  },
  containerStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
  },
  smallHeaderText: {
    fontSize: 17,
    marginBottom: "2%",
  },
  innerText: {
    fontSize: 15,
  },
  deleteText: {
    fontSize: 17,
    textAlign: "center",
  },
  deleteButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    margin: "15%",
  },
  botton: {
    margin: "1%",
  },
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 5,
  },
  alertTitle: {
    fontSize: 20,
  },
});

export default DailyDetailScreen;
