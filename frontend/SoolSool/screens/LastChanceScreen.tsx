import { StyleSheet, Dimensions, View } from "react-native";
import * as Location from "expo-location";
import { useEffect } from "react";

import PagerView from "react-native-pager-view";
import LastChanceFirst from "../components/LastChance/LastChanceFirst";
import LastChanceSecond from "../components/LastChance/LastChanceSecond";
import LastChanceThird from "../components/LastChance/LastChanceThird";

function LastChanceScreen({ navigation }) {
  useEffect(() => {}, []);

  const screenHeight = Dimensions.get("window").height;
  return (
    <PagerView style={styles.pagerView} initialPage={0}>
      <View key="1" style={[{ height: screenHeight }, styles.pageView]}>
        <LastChanceFirst navigation={navigation} />
      </View>
      <View key="2" style={[{ height: screenHeight }, styles.pageView]}>
        <LastChanceSecond navigation={navigation} />
      </View>
      <View key="3" style={[{ height: screenHeight }, styles.pageView]}>
        <LastChanceThird navigation={navigation} />
      </View>
    </PagerView>
  );
}

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
  },
  pageView: {
    width: "100%",
    // backgroundColor: "red",
  },
});

export default LastChanceScreen;
