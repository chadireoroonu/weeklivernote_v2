import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Alert,
  Dimensions,
} from "react-native";
import React from "react";
import { IconButton, MD3Colors } from "react-native-paper";
// import CalendarMain from "../components/Calendar/CalendarMain";
import CalendarSixWeeks from "../components/Calendar/CalendarSixWeeks";
import { subbackground } from "../assets";

function CalendarScreen({ navigation }) {
  const screenHeight = Dimensions.get("window").height;
  return (
    <ImageBackground
      source={subbackground}
      style={[{ height: screenHeight }, styles.mainContainer]}
    >
      <View style={styles.mainBackground}>
        <View style={styles.mainTextBox}>
          <Text style={styles.headerText}>술력</Text>
          <IconButton
            icon="help-circle-outline"
            iconColor={MD3Colors.neutral60}
            size={20}
            onPress={() => {
              Alert.alert("알림", "05시를 기준으로 하루를 초기화합니다.");
            }}
            style={{ marginLeft: "-1%", marginTop: "7%" }}
          />
        </View>
        <View style={styles.calendar}>
          {/* 주 별 간격 조정 */}
          {/* <CalendarMain /> */}
          {/* 주 별 간격 미조정 */}
          <CalendarSixWeeks navigation={navigation} />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    height: "100%",
  },
  mainBackground: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#121B33",
  },
  mainTextBox: {
    // height: "10%",
    padding: "5%",
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontSize: 40,
    fontFamily: "LineRegular",
    verticalAlign: "bottom",
    color: "white",
    marginTop: "5%",
  },
  calendar: {
    height: "87%",
  },
});

export default CalendarScreen;
