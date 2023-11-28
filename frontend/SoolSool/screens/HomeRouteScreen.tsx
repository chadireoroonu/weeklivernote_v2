import * as React from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { useRef, useMemo, useCallback } from "react";
import { Button } from "react-native-paper";
import { PROVIDER_GOOGLE } from "react-native-maps";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchHomeRoute } from "../api/mapApi";
import { HomeMarker, NowMarker } from "../assets";
import HomeRouteDetail from "../components/LastChance/HomeRouteDetail";
import AsyncStorage from "@react-native-async-storage/async-storage";

function HomeRouteScreen({ navigation }) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [region, setRegion] = useState({
    latitude: 35.1110783,
    longitude: 128.8798523,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [pathType, setPathType] = useState(null);
  const [info, setInfo] = useState(null);
  const [subPath, setSubPath] = useState(null);
  const [passStops, setPassStops] = useState(null);
  // const [locations, setLocations] = useState(null);

  // 지도의 영역이 변경될 때 실행되는 함수
  const onRegionChange = (newRegion) => {
    console.log("New Region:", newRegion);
    // 여기에서 새로운 지도의 영역을 처리하거나 상태를 업데이트할 수 있다!
    // setRegion(newRegion);  // 예를 들어, 지도 영역을 업데이트하려면 이런식으로.
  };

  const {
    data: RouteData,
    isLoading,
    isError,
  } = useQuery("RouteDataQuery", async () => await fetchHomeRoute());

  useEffect(() => {
    if (!isLoading && RouteData) {
      setPathType(RouteData.shortRoute.pathType);
      setInfo(RouteData.shortRoute.info);
      setSubPath(RouteData.shortRoute.subPath);
      setPassStops(RouteData.subPaths);

      const fetchLocation = async () => {
        try {
          const tempLocation = await AsyncStorage.getItem("nowLocation");
          // console.log("위치확인", JSON.parse(tempLocation).latitude);
          // console.log("위치확인", JSON.parse(tempLocation).longitude);

          setRegion((prev) => ({
            ...prev,
            latitude: JSON.parse(tempLocation).latitude,
            longitude: JSON.parse(tempLocation).longitude,
          }));
        } catch (err) {
          console.error("을 꺼내오다 에러 발생", err);
        }
      };
      fetchLocation();
    }
  }, [RouteData, isLoading]);

  useEffect(() => {
    // 컴포넌트가 마운트되면 bottomSheet를 초기에 보이도록 설정
    bottomSheetModalRef.current?.present();
    console.log("지금 어디인지", region);
  }, [region]);

  const snapPoints = useMemo(() => ["20%", "80%"], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {}, []);

  const filteredData = passStops?.filter(
    (item) => Object.keys(item).length !== 0
  );

  const processedCoordinates = filteredData?.map((item) => {
    return Object.values(item).map(([longitude, latitude]) => ({
      latitude,
      longitude,
    }));
  });

  const flattenedCoordinates = processedCoordinates?.flat();

  if (isLoading) {
    return (
      <View>
        <Text>잠시만 기다려주세요</Text>
      </View>
    );
  }
  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <MapView
          // provider={PROVIDER_GOOGLE}
          style={styles.mapStyle}
          region={region}
          onRegionChange={onRegionChange}
        >
          <Marker
            coordinate={{
              latitude: region?.latitude || 0,
              longitude: region?.longitude || 0,
            }}
            title="현재 위치"
            // image={{ uri: NowMarker }}
          />
          <Polyline
            coordinates={flattenedCoordinates}
            strokeColor="#023758"
            strokeColors={[
              "#7F0000",
              "#00000000",
              "#B24112",
              "#E5845C",
              "#238C23",
              "#7F0000",
            ]}
            strokeWidth={6}
          />
        </MapView>
        <Button
          mode="elevated"
          onPress={handlePresentModalPress}
          style={styles.button}
        >
          상세 경로 확인하기
        </Button>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          <View style={styles.contentContainer}>
            <HomeRouteDetail
              pathType={pathType}
              info={info}
              subPath={subPath}
            />
          </View>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 24,
    justifyContent: "center",
    backgroundColor: "lightblue",
  },
  contentContainer: {
    // display: "flex",
    // flexDirection: "column",
    // backgroundColor: "red",
    // width: "90%",
    // marginRight: "auto",
    // marginLeft: "auto",
  },
  mapStyle: {
    width: "100%",
    height: "100%",
  },
  button: {
    position: "absolute",
    top: 16, // 원하는 위치로 조정
    left: 16, // 원하는 위치로 조정
    zIndex: 1,
  },
});

export default HomeRouteScreen;
