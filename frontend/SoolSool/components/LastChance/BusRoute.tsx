import { StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";

function BusRoute({ pathInfo }) {
  const {
    distance, //오른쪽
    endID, //오른쪽
    endName, //오른쪽
    lane: [{ busNo }], //오른쪽
    passStopList: { stations },
    sectionTime, //왼쪽
    startID, //오른쪽
    startName, //오른쪽
    stationCount, //오른쪽
  } = pathInfo;

  const stationNames = stations?.map(function (station) {
    return station.stationName;
  });

  const chunkedStationNames = [];
  for (let i = 0; i < stationNames.length; i += 5) {
    chunkedStationNames.push(stationNames.slice(i, i + 5).join(" - "));
  }
  const concatenatedNames = chunkedStationNames.join("\n");

  // const concatenatedNames = stationNames.join("-");
  // console.log("버스경유지", concatenatedNames);

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
            <Text style={styles.startName}>{startName}</Text>
            <Text style={styles.startID}>{startID}</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.busNo}>{busNo}번 버스</Text>
            <View>
              <Text style={styles.stationCount}>
                {stationCount}개 정류장 경유
              </Text>
              <Text style={styles.concatenatedNames}>{concatenatedNames}</Text>
            </View>
            <Text style={styles.distance}>총 {distance}m 이동</Text>
          </View>

          <View>
            <Text style={styles.endName}>{endName}</Text>
            <Text style={styles.endID}>{endID}</Text>
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
    // height: "100%",
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
    backgroundColor: "#6878FF",
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
    // backgroundColor: "black",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  marginHorizonalContainer: {},
  busNo: {
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
  startName: {
    fontFamily: "LineRegular",
    fontSize: 14,
  },
  startID: {
    fontFamily: "LineRegular",
    fontSize: 12,
    color: "grey",
  },
  endName: {
    fontFamily: "LineRegular",
    fontSize: 14,
  },
  endID: {
    fontFamily: "LineRegular",
    fontSize: 12,
    color: "grey",
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

export default BusRoute;
