import React from "react";
import { useState, useRef, useMemo, useCallback } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { FAB } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import { useQuery, useQueryClient } from "react-query";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { ImageBackground } from "expo-image";
import { Calendar } from "react-native-calendars";
import "./LocaleConfig"; // 달력 서식

import DailySummary from "./DailySummary";
import { fetchMonthRecord } from "../../api/drinkRecordApi";
import { adaptiveIcon } from "../../assets";
import { getRealToday } from "../../utils/timeUtils";

function CalendarSixWeeks({ navigation }) {
  // 진짜 오늘 정보 저장
  const nowDate = getRealToday();

  const [currentDay, setCurrentDay] = useState("");
  const [isFuture, setIsFuture] = useState<boolean>(false);
  const [selectDay, setSelectDay] = useState("");
  const [alcoholDays, setAlcoholDays] = useState([]);
  const queryClient = useQueryClient();
  const [queryDate, setQueryDate] = useState(nowDate);

  const {
    data: MonthlyData,
    isLoading: isMonthlyDataLoading,
    isError: isMonthlyDataError,
  } = useQuery(
    ["monthlyDrinkLogs", queryDate],
    async () => await fetchMonthRecord(queryDate),
    {
      enabled: !!queryDate,
    }
  );

  useFocusEffect(
    React.useCallback(() => {
      queryClient.invalidateQueries("monthlyDrinkLogs");
      if (!isMonthlyDataLoading && MonthlyData) {
        const tempDays = [];
        for (let i = 0; i < MonthlyData.drinks.length; i++) {
          const tempDate = MonthlyData.drinks[i].date;
          tempDays.push(tempDate);
        }
        setAlcoholDays(tempDays);
      }
    }, [isMonthlyDataLoading, MonthlyData])
  );

  // 특정일 클릭
  const handleDayPress = async (date) => {
    const clickDay = date.dateString;

    if (clickDay === selectDay) {
      setSelectDay("");
      return;
    } else {
      setSelectDay(clickDay);
      setCurrentDay(clickDay);

      handlePresentModalPress();
    }

    // 현재 날짜(nowDate)와 클릭한 날짜(clickDay) 비교
    const selectedTimeStamp = date.timestamp;
    const nowTimestamp = new Date(nowDate).getTime();

    if (nowTimestamp < selectedTimeStamp) {
      setIsFuture(true);
    } else {
      setIsFuture(false);
    }
  };

  const handleCreateRecordPressed = () => {
    navigation.navigate("RecordCreate", {
      date: selectDay,
      isAlcohol: alcoholDays.includes(selectDay),
    });
  };

  // Bottom Sheet
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const dynamicSnapPoints = useMemo(() => {
    const isToday = selectDay === nowDate;
    const snapPoints =
      isToday || !alcoholDays.includes(selectDay) ? ["25%"] : ["25%", "100%"];
    return snapPoints;
  }, [selectDay, alcoholDays]);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("Sheet Index:", index);
    if (index === -1) {
      setSelectDay("");
    }
  }, []);

  return (
    <BottomSheetModalProvider>
      <View style={styles.totalContainer}>
        <Calendar
          current={currentDay}
          style={styles.calenderStyle}
          onMonthChange={(date) => {
            setQueryDate(date.dateString);
          }}
          renderHeader={(date) => {
            return (
              <Text style={styles.calendarHeader}>
                {date.toString("yyyy년 MMMM")}
              </Text>
            );
          }}
          dayComponent={({ date, state }) => {
            const alcoholKey = date.dateString;
            const isDisabled = state === "disabled";
            const isActive = alcoholKey === selectDay;
            const isToday = alcoholKey === nowDate;

            return (
              <TouchableOpacity
                onPress={() => {
                  handleDayPress(date);
                }}
                style={[
                  styles.calendarCell,
                  isDisabled && {
                    opacity: 0.65,
                    paddingLeft: 0,
                  },
                ]}
              >
                <View style={styles.calendarCell}>
                  <Text
                    style={[
                      styles.calendarDate,
                      isToday && styles.todayDate,
                      isActive && styles.selectDate,
                    ]}
                  >
                    {date.day}
                  </Text>
                  {alcoholDays.includes(alcoholKey) ? (
                    <ImageBackground
                      source={adaptiveIcon}
                      style={styles.calendarStamp}
                    />
                  ) : null}
                </View>
              </TouchableOpacity>
            );
          }}
        />

        {selectDay !== "" ? (
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            snapPoints={dynamicSnapPoints}
            onChange={handleSheetChanges}
          >
            <View style={styles.dailySummaryComponent}>
              <View style={styles.tempBox}>
                <Text style={styles.headerText}>{selectDay}</Text>
                {alcoholDays.includes(selectDay) && nowDate !== selectDay ? (
                  <DailySummary navigation={navigation} queryDate={selectDay} />
                ) : nowDate === selectDay ? (
                  <Text style={styles.innerText}>
                    내일 새벽 5시에 업데이트 됩니다.
                  </Text>
                ) : isFuture ? (
                  <Text style={styles.innerText}>아직은 기록할 수 없어요.</Text>
                ) : (
                  <FAB
                    icon="plus"
                    style={styles.fab}
                    color="white"
                    onPress={handleCreateRecordPressed}
                  />
                )}
              </View>
            </View>
          </BottomSheetModal>
        ) : null}
      </View>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  totalContainer: {
    height: "100%",
    flexDirection: "column",
  },
  calenderStyle: {
    backgroundColor: "black",
    width: "95%",
    marginRight: "auto",
    marginLeft: "auto",
    borderRadius: 5,
    // 그림자 추가 (Android 및 iOS 모두에서 동작)
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // 안드로이드에서 그림자 효과 추가
  },
  calendarHeader: {
    fontSize: 18,
    fontFamily: "LineRegular",
    color: "#fff",
    textAlign: "center",
  },
  calendarCell: {
    alignItems: "center",
    height: 90, // 하드코딩 시 스크롤뷰 달아야 함. 다시 생각해보기
    width: "100%",
    backgroundColor: "#000",
    marginVertical: -7,
    paddingTop: 7,
    paddingLeft: 1,
  },
  calendarDate: {
    color: "white",
  },
  todayDate: {
    color: "#CA77FF",
  },
  selectDate: {
    color: "#FFDE68",
  },
  calendarStamp: {
    height: "83%",
    width: "83%",
  },
  dailySummaryComponent: {
    flex: 1,
    height: "100%",
  },
  tempBox: {
    height: "90%",
  },
  headerText: {
    marginHorizontal: "5%",
    fontSize: 18,
    color: "#363C4B",
    fontFamily: "LineRegular",
    textAlign: "left",
  },
  innerText: {
    height: "80%",
    fontSize: 20,
    fontFamily: "LineRegular",
    textAlign: "center",
    top: "40%",
  },
  fab: {
    alignSelf: "center",
    justifyContent: "center",
    margin: "1%",
    backgroundColor: "#121B33",
    top: "20%",
  },
});

export default CalendarSixWeeks;
