import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { fetchDailyDetail, removeDrink } from "../../api/drinkRecordApi";
import { useQuery } from "react-query";
// import AlcoholChart from "../../components/Calendar/AlcoholChart";
import AlcoholPieChart from "./AlcoholPieChart";
import { NativeViewGestureHandler } from "react-native-gesture-handler";

function DailyDetail({ queryDate }) {
  const [isImg, setIsImg] = useState<boolean>(false);

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
  } = useQuery(
    ["DailyDetailQuery", queryDate],
    async () => await fetchDailyDetail(queryDate)
  );

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

    return () =>
      setInfo({
        startTime: "",
        detoxTime: "",
        memo: "",
        img: "",
        hangover: "",
        drinks: {},
      });
  }, [DailyDetailData, queryDate]);

  const format12HourTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    const parsedHours = parseInt(hours, 10);
    const period = parsedHours >= 12 ? "PM" : "AM";
    const formattedHours = parsedHours % 12 || 12; // Convert 0 to 12
    return `${formattedHours}:${minutes} ${period}`;
  };

  return (
    <NativeViewGestureHandler disallowInterruption={true}>
      <ScrollView>
        <View style={styles.total}>
          {info.startTime && (
            <View style={styles.contents}>
              <AlcoholPieChart data={info.drinks} />
              {/* <View style={styles.house}>
              <View style={styles.chart}>
                <AlcoholChart drinks={info.drinks} />
              </View>
            </View> */}
              <View style={styles.time}>
                <View style={styles.timeContainer}>
                  <Text style={styles.smallHeaderText}>시작 시간</Text>
                  <Text style={styles.valueText}>
                    {format12HourTime(info.startTime.substring(11, 16))}
                  </Text>
                </View>
                <View style={styles.timeContainer}>
                  <Text style={styles.smallHeaderText}>해독 시간</Text>
                  <Text style={styles.valueText}>
                    {formatDetoxTime(info.detoxTime)}
                  </Text>
                </View>
              </View>

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
          )}
        </View>
      </ScrollView>
    </NativeViewGestureHandler>
  );
}

const styles = StyleSheet.create({
  total: {
    flex: 1,
    marginTop: "5%",
  },
  light: {
    height: "80%",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "2%",
  },
  buttons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  contents: {
    height: "64%",
    margin: "1%",
  },
  time: {
    flexDirection: "row",
    marginHorizontal: "5%",
    justifyContent: "space-around",
  },
  timeContainer: {
    alignItems: "center",
    width: "100%",
    margin: "2%",
  },
  chart: {
    height: "100%",
  },
  house: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#d2d2d2",
    backgroundColor: "#ffffff",
    borderRadius: 5,
    margin: 5,
    marginTop: "5%",
    padding: "3%",
  },
  containerStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
  },
  smallHeaderText: {
    fontSize: 15,
    marginBottom: "5%",
  },
  valueText: {
    fontSize: 20,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#d2d2d2",
    borderRadius: 10,
    padding: "2%",
    paddingHorizontal: "7%",
  },
  innerText: {
    fontSize: 20,
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

export default DailyDetail;
