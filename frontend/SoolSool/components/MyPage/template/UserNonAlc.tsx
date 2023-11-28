import { Text, View, StyleSheet } from "react-native";
import React from "react";

interface AlcoholStatistics {
  maxNonAlcPeriod: number;
  nowNonAlcPeriod: number;
  drinkYearAmount: number;
}

interface UserNonAlcProps {
  alcoholData: AlcoholStatistics;
}

function UserNonAlc(props: UserNonAlcProps) {
  const { alcoholData } = props;
  return (
    <View style={styles.mainContainer}>
      <View style={styles.circleContainer}>
        <Text style={styles.stringText}>최근금주지속</Text>
        <Text style={styles.numberText}>{alcoholData.nowNonAlcPeriod}</Text>
      </View>
      <View style={styles.circleContainer}>
        <Text style={styles.stringText}>최장금주지속</Text>
        <Text style={styles.numberText}>{alcoholData.maxNonAlcPeriod}</Text>
      </View>
      <View style={styles.circleContainer}>
        <Text style={styles.stringText}>올해음주량</Text>
        <Text style={styles.numberText}>{alcoholData.drinkYearAmount}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    gap: 20,
    padding: 10,
  },
  circleContainer: {
    flexDirection: "column",
    flex: 1,
    width: 100,
    height: 100,
    backgroundColor: "#363C4B",
    gap: 5,
    alignItems: "center",
    justifyContent: "center",
    // borderRadius: 500,
    // 그림자 추가 (Android 및 iOS 모두에서 동작)
    shadowColor: "#ffffff",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // 안드로이드에서 그림자 효과 추가
  },
  stringText: {
    fontSize: 12,
    color: "white",
  },
  numberText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});

export default UserNonAlc;
