import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Calendar } from "react-native-calendars";
import React, { useState, useEffect } from "react";

let isSelectDay: boolean = false;
let selectDay: string;
let today = new Date();

function CalendarMain({}) {
  const { height, width } = Dimensions.get("window");
  const [today, setToday] = useState(new Date());
  const [totalWeeks, setTotalWeeks] = useState(0);

  useEffect(() => {
    calculateWeeks(); // 초기 주 수 계산
  }, [today]); // 'today' 상태가 변경될 때 실행

  const calculateWeeks = () => {
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let lastDay = new Date(year, month, 0).getDate();
    let firstDayOfWeek = new Date(year, month - 1, 1).getDay();
    let lastDayOfWeek = new Date(year, month - 1, lastDay).getDay();
    let weeks = 0;

    for (let day = 1; day <= lastDay; day++) {
      if ((day + firstDayOfWeek - 1) % 7 === firstDayOfWeek) {
        weeks += 1;
      }
    }
    if (lastDayOfWeek < firstDayOfWeek) {
      weeks += 1;
    }

    setTotalWeeks(weeks);
    return weeks;
  };

  console.log(`오늘 날짜는? ${today}`);
  console.log(`이번 달은 몇 주? ${totalWeeks}주`);

  console.log(`높이는? ${height}, 높이 90%는? ${height * 0.9} `);
  console.log(`한 주 높이는? ${height / (totalWeeks + 1)}`);

  let weekHeight: number = 0;

  if (totalWeeks < 5) {
    weekHeight = (height * 0.9) / 6;
  } else if (totalWeeks > 5) {
    weekHeight = (height * 0.9) / 10;
  } else {
    weekHeight = (height * 0.9) / 7.8;
  }

  if (totalWeeks) {
    return (
      <View style={{ height: height * 0.9 }}>
        <>
          <Calendar
            style={{ height: "100%" }}
            theme={{
              "stylesheet.day.basic": {
                // container: {
                //   flexDirection: "column",
                //   justifyContent: "space-between",
                // },
                //   baseGroup: {
                //     flexDirection: "row",
                //     justifyContent: "space-between",
                //     width: "100%",
                //   },
                base: {
                  height: weekHeight,
                },
              },
            }}
            onDayPress={(day) => {
              isSelectDay = true;
              selectDay = `${day.year}-${day.month}-${day.day}`;
              console.log(`누른 날짜는? ${selectDay}일!`);
            }}
            onPressArrowLeft={(goToPreviousMonth) => {
              const previousMonth = new Date(
                today.getFullYear(),
                today.getMonth() - 1,
                1
              );
              setToday(previousMonth); // 'today' 상태 업데이트
              goToPreviousMonth();
            }}
            onPressArrowRight={(goToNextMonth) => {
              const NextMonth = new Date(
                today.getFullYear(),
                today.getMonth() + 1,
                1
              );
              setToday(NextMonth); // 'today' 상태 업데이트
              goToNextMonth();
            }}
          />
        </>
      </View>
    );
  } else {
    return (
      <View>
        <Text>아직 주 계산이 안됐어요.</Text>
      </View>
    );
  }
}

export default CalendarMain;
