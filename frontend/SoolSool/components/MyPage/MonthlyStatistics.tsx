import { Text, View, StyleSheet } from "react-native";
import React from "react";
import { BarChart, LineChart } from "react-native-gifted-charts";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { fetchYearlyStatistics } from "../../api/statisticsApi";

function MonthlyStatistics({ barData }) {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.text}>지난 12개월간 이만큼 마셨어요!</Text>
      <View style={styles.graphBox}>
        <View style={styles.chartContainer}>
          <View style={styles.barchart}>
            <BarChart
              data={barData}
              barWidth={12}
              height={180}
              stepValue={500}
              maxValue={2000}
              initialSpacing={5}
              yAxisLabelWidth={7}
              spacing={16}
              hideAxesAndRules
              frontColor="#FFCC4A"
              isAnimated
              roundedTop
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
    marginRight: "auto",
    marginLeft: "auto",
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
    right: 7,
    // left: "50%",
    width: "100%",
    height: "100%",
    // transform: [{ translateX: -50 }],
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

export default MonthlyStatistics;
