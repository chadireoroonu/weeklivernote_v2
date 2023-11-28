import { StyleSheet, View } from "react-native";
import SubwayRoute from "./SubwayRoute";
import BusRoute from "./BusRoute";
import WalkRoute from "./WalkRoute";
import RouteSummary from "./RouteSummary";
import { ScrollView } from "react-native-gesture-handler";

function HomeRouteDetail({ pathType, info, subPath }) {
  // const {
  //   totalWalk,
  //   totalTime,
  //   payment,
  //   firstStartStation,
  //   lastEndStation,
  //   busStationCount,
  //   subwayStationCount,
  // } = info;

  return (
    <View style={styles.mainContainer}>
      <View style={styles.routeSummaryContainer}>
        <RouteSummary info={info} subPath={subPath} />
      </View>
      <View style={styles.routeDetailContainer}>
        <ScrollView>
          {subPath?.map((pathInfo, index) => {
            if (pathInfo.trafficType == 1) {
              return <SubwayRoute key={index} pathInfo={pathInfo} />;
            }

            if (pathInfo.trafficType == 2) {
              return <BusRoute key={index} pathInfo={pathInfo} />;
            }

            if (pathInfo.trafficType == 3) {
              return <WalkRoute key={index} pathInfo={pathInfo} />;
            }
          })}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 5,
    width: "90%",
    // backgroundColor: "green",
    marginRight: "auto",
    marginLeft: "auto",
  },
  routeSummaryContainer: {
    width: "100%",
  },
  routeDetailContainer: {
    width: "100%",
    marginBottom: 470,
  },
});

export default HomeRouteDetail;
