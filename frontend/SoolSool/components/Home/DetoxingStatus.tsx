import { StyleSheet, View, Text } from "react-native";
import Wave from "./Wave";

interface DetoxingStatusProps {
  alcoholInGrams: number;
  requiredTimeForDetox: number;
  alcoholAt5: number;
  currentAlcohol: number;
}

const DetoxingStatus = ({
  alcoholInGrams,
  alcoholAt5,
  currentAlcohol,
  requiredTimeForDetox,
}: DetoxingStatusProps) => {
  let detoxingInProgress: number;

  if (alcoholInGrams + alcoholAt5 !== 0) {
    detoxingInProgress = (currentAlcohol / (alcoholInGrams + alcoholAt5)) * 100;
  } else {
    detoxingInProgress = 0;
  }

  return (
    <View style={styles.statusContainer}>
      <View>
        <Text style={styles.titleContainer}>
          {currentAlcohol.toLocaleString()}g
        </Text>
        {currentAlcohol <= 0 ? (
          <Text style={styles.subtitleContainer}>
            <Text style={styles.periodContainer}>간 상태가 아주 깨끗해요!</Text>
          </Text>
        ) : (
          <Text style={styles.subtitleContainer}>
            해독까지{"  "}
            <Text style={styles.periodContainer}>
              {requiredTimeForDetox.toFixed(1)}
            </Text>
            시간
          </Text>
        )}
      </View>
      <View style={styles.detoxingInProgressContainer}>
        <Wave size={220} progress={detoxingInProgress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statusContainer: {
    width: "80%",
    marginTop: "20%",
    marginVertical: 24,
    padding: 4,
    display: "flex",
    alignItems: "center",
    gap: 20,
  },
  titleContainer: {
    fontSize: 30,
    fontFamily: "LineRegular",
    color: "white",
    textAlign: "center",
    marginBottom: 5,
  },
  subtitleContainer: {
    fontSize: 20,
    fontFamily: "LineRegular",
    color: "white",
    // marginTop: 20,
  },
  periodContainer: {
    fontSize: 20,
    fontFamily: "LineRegular",
    color: "white",
  },
  detoxingInProgressContainer: {
    marginTop: 50,
  },
});

export default DetoxingStatus;
