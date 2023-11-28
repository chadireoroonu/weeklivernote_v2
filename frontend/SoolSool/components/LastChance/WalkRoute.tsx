import { StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";

function WalkRoute({ pathInfo }) {
  const { trafficType, distance, sectionTime } = pathInfo;

  return (
    <View style={styles.mainContainer}>
      <View style={styles.leftContainer}>
        <View style={styles.leftmarginContainer}>
          <Text>{sectionTime}분</Text>
        </View>
      </View>
      <View style={[styles.routhGraphContainer, { height: sectionTime * 20 }]}>
        <View style={styles.marginHorizonalContainer}></View>
      </View>
      <View style={styles.rightContainer}>
        <View style={styles.rightmarginContainer}>
          <Text>총 {distance}m 이동</Text>
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
    backgroundColor: "lightgray",
  },
  rightContainer: {
    width: "75%",
    // backgroundColor: "green",
    display: "flex",
    justifyContent: "center",
  },
  leftmarginContainer: {
    height: "auto",
    marginRight: "auto",
    marginLeft: "auto",
    // backgroundColor: "black",
  },
  rightmarginContainer: {
    width: "95%",
    height: "auto",
    marginRight: "auto",
    marginLeft: "auto",
    // backgroundColor: "black",
  },
  marginHorizonalContainer: {},
});

export default WalkRoute;
