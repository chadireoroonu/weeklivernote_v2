import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Icon, MD3Colors } from "react-native-paper";
import { calculateTimeAfterHours, getTodayAt5 } from "../../utils/timeUtils";

interface SafeDriveInfoProps {
  bloodAlcoholContent: number;
  requiredTimeToDrive: number;
}

const SafeDriveInfo: React.FC<SafeDriveInfoProps> = ({
  bloodAlcoholContent,
  requiredTimeToDrive,
}) => {
  let canDriveFrom: string;
  if (requiredTimeToDrive > 0) {
    canDriveFrom = calculateTimeAfterHours(requiredTimeToDrive);
  } else {
    canDriveFrom = "passed";
  }

  return (
    <View style={styles.rootContainer}>
      <View style={styles.chipsContainer}>
        <Icon source="blood-bag" color={MD3Colors.error50} size={32} />
        <Text style={styles.chipText}>{bloodAlcoholContent} %</Text>
      </View>
      <View style={styles.chipsContainer}>
        {canDriveFrom === "passed" ? (
          <>
            <Icon source="car" color="#6A9C89" size={32} />
            <Text style={styles.chipText}>안전 운전</Text>
          </>
        ) : (
          <>
            <Icon source="car-off" color={MD3Colors.error50} size={32} />
            <Text style={styles.chipText}>{canDriveFrom} 까지</Text>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    paddingBottom: 2,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  chipsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "48%",
    padding: 8,
    borderRadius: 5,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  chipText: {
    fontSize: 15,
    color: "white",
  },
});

export default SafeDriveInfo;
