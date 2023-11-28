import { StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import RouteMotion from "./RouteMotion";

function RouteSummary({ info, subPath }) {
  const sectionTimeArr = subPath?.map((path, index) => {
    return {
      trafficType: path.trafficType,
      sectionTime: path.sectionTime,
    };
  });

  const {
    totalWalk,
    totalTime,
    payment,
    firstStartStation,
    lastEndStation,
    busStationCount,
    subwayStationCount,
  } = info;

  return (
    <View style={styles.mainContainer}>
      <View style={styles.title}>
        <Text style={styles.titleText}>최단 경로</Text>
        <Text style={styles.contentText}>소요시간 총 {totalTime}분</Text>
        <Text style={styles.contentText}>{payment}원</Text>
      </View>
      <View style={styles.summaryInfo}>
        <Text style={styles.contentText}>도보 총{totalWalk}걸음</Text>
        <Text style={styles.contentText}>버스 {busStationCount}개 정류장</Text>
        <Text style={styles.contentText}>
          지하철 {subwayStationCount}개 정류장
        </Text>
      </View>
      <View style={styles.routeGraph}>
        <View style={styles.startPointer}></View>
        <View style={styles.marginContainer}>
          <RouteMotion sectionTimeArr={sectionTimeArr} />
        </View>
        <View style={styles.endPointer}></View>
      </View>
      <View style={styles.summaryInfoBottom}>
        <Text style={styles.contentText}>{firstStartStation}</Text>
        <Text style={styles.contentText}>{lastEndStation}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    height: 140,
    // backgroundColor: "lightgrey",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: 12,
    marginVertical: 5,
  },
  title: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 5,
    color: "green",
  },
  contentText: {
    marginRight: 5,
  },
  summaryInfo: {
    display: "flex",
    flexDirection: "row",
  },
  summaryInfoBottom: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  routeGraph: {
    display: "flex",
    flexDirection: "row",
  },
  marginContainer: {
    display: "flex",
    flexDirection: "row",
    width: "90%",
    marginRight: "auto",
    marginLeft: "auto",
  },
  startPointer: {
    width: 15,
    height: 15,
    borderRadius: 20,
    backgroundColor: "red",
  },
  endPointer: {
    width: 15,
    height: 15,
    borderRadius: 20,
    backgroundColor: "green",
  },
});

export default RouteSummary;
