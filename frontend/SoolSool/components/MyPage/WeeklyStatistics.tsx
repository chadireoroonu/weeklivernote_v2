import { Text, View, StyleSheet } from "react-native";
import React from "react";
import { BarChart, LineChart } from "react-native-gifted-charts";
import { fetchWeeklyStatistics } from "../../api/statisticsApi";

function WeeklyStatistics({ lineData, barData }) {
  // console.log("확인", lineData);
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.text}>지난 7일간 이만큼 마셨어요!</Text>
      <View style={styles.graphBox}>
        <View style={styles.chartContainer}>
          <View style={styles.barchart}>
            <BarChart
              data={barData}
              barWidth={29}
              height={180}
              barBorderRadius={5}
              stepValue={400}
              maxValue={1600}
              initialSpacing={0}
              yAxisLabelWidth={7}
              hideAxesAndRules
              frontColor="#FFCC4A"
              isAnimated
              roundedTop
            />
          </View>
          <View style={styles.linechart}>
            <LineChart
              data={lineData}
              // width={300}
              // height={150}
              yAxisThickness={0}
              xAxisThickness={0}
              stepValue={10}
              maxValue={200}
              yAxisLabelWidth={0}
              hideAxesAndRules
              color="#363C4B"
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    // backgroundColor: "#FFFF",
    flexDirection: "column",
    gap: 10,
    borderRadius: 20,
  },
  graphBox: {
    width: "100%",
    height: 240,
    backgroundColor: "rgba(255,255,255,0.9)",
    marginHorizontal: "auto",
    borderRadius: 20,
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
  chartContainer: {
    width: "100%",
    height: "100%",
    position: "absolute",
    margin: 20,
  },
  barchart: {
    position: "absolute",
    top: 0,
    right: 10,
    width: "100%",
    height: "100%",
  },
  linechart: {
    position: "absolute",
    bottom: 120,
    right: 10,
    width: "100%",
    height: "100%",
  },
  text: {
    fontSize: 15,
    fontFamily: "LineRegular",
    color: "white",
  },
});

export default WeeklyStatistics;
