import { StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import { lastIndexOf } from "lodash";

function SubwayRoute({ pathInfo }) {
  const {
    distance,
    endExitNo,
    endName,
    lane,
    passStopList: { stations },
    sectionTime, //왼쪽
    startExitNo,
    startName,
    stationCount,
    way,
    wayCode,
  } = pathInfo;

  const stationNames = stations?.map(function (station) {
    return station.stationName;
  });

  const chunkedStationNames = [];
  for (let i = 0; i < stationNames.length; i += 5) {
    chunkedStationNames.push(stationNames.slice(i, i + 5).join(" - "));
  }
  const concatenatedNames = chunkedStationNames.join("\n");
  // const concatenatedNames = stationNames.join(" - \n");
  // console.log("확인할거야", name);
  return (
    <View style={styles.mainContainer}>
      <View
        style={[
          styles.leftContainer,
          { height: sectionTime * 70, maxHeight: 350 },
        ]}
      >
        <View style={styles.leftmarginContainer}>
          <Text>{sectionTime}분</Text>
        </View>
      </View>
      <View
        style={[
          styles.routhGraphContainer,
          { height: sectionTime * 70, maxHeight: 350 },
        ]}
      ></View>
      <View
        style={[
          styles.rightContainer,
          { height: sectionTime * 70, maxHeight: 350 },
        ]}
      >
        <View style={styles.rightmarginContainer}>
          <View>
            <Text style={styles.startName}>{startName}역</Text>
            {startExitNo && (
              <Text style={styles.startExitNo}>{startExitNo}번 출구</Text>
            )}
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.wayCode}>{lane[0].name}</Text>
            <Text style={styles.way}>{way}역 방면</Text>
            <View>
              <Text style={styles.stationCount}>
                {stationCount}개 정류장 경유
              </Text>
              <Text style={styles.concatenatedNames}>{concatenatedNames}</Text>
            </View>
            <Text style={styles.distance}>총 {distance}m 이동</Text>
          </View>

          <View>
            <Text style={styles.endName}>{endName}역</Text>
            {endExitNo && (
              <Text style={styles.endExitNo}>{endExitNo}번 출구</Text>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    // backgroundColor: "blue",
    display: "flex",
    flexDirection: "row",
  },
  leftContainer: {
    width: "20%",
    // backgroundColor: "red",
    display: "flex",
    justifyContent: "center",
  },
  routhGraphContainer: {
    width: "5%",
    height: 100,
    backgroundColor: "#FF6D4D",
  },
  rightContainer: {
    width: "75%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    // backgroundColor: "green",
  },
  leftmarginContainer: {
    height: "auto",
    marginRight: "auto",
    marginLeft: "auto",
    // backgroundColor: "black",
  },
  rightmarginContainer: {
    width: "95%",
    height: "100%",
    marginRight: "auto",
    marginLeft: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    // backgroundColor: "black",
  },
  marginHorizonalContainer: {},
  name: {
    fontFamily: "LineRegular",
    fontSize: 14,
  },
  way: {
    fontFamily: "LineRegular",
    fontSize: 14,
  },
  wayCode: {
    fontFamily: "LineRegular",
    fontSize: 20,
    color: "#023758",
  },
  distance: {
    fontFamily: "LineRegular",
    fontSize: 14,
  },
  stationCount: {
    fontFamily: "LineRegular",
    fontSize: 14,
  },
  startExitNo: {
    fontFamily: "LineRegular",
    fontSize: 12,
    color: "gray",
  },
  endExitNo: {
    fontFamily: "LineRegular",
    fontSize: 12,
    color: "gray",
  },
  startName: {
    fontFamily: "LineRegular",
    fontSize: 14,
  },
  endName: {
    fontFamily: "LineRegular",
    fontSize: 14,
  },
  infoContainer: {
    display: "flex",
    gap: 10,
  },
  concatenatedNames: {
    fontFamily: "LineRegular",
    fontSize: 12,
    color: "gray",
    lineHeight: 15,
  },
});

export default SubwayRoute;
