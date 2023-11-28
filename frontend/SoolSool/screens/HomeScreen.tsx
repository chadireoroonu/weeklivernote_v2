import React, { useState, useEffect } from "react";
import { DrinkToday } from "../models/DrinkToday";
import {
  StyleSheet,
  View,
  Text,
  BackHandler,
  Dimensions,
  ImageBackground,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { ActivityIndicator } from "react-native-paper";
import HomeCarousel from "../components/Home/HomeCarousel";
import SafeDriveInfo from "../components/Home/SafeDriveInfo";
import DrinkController from "../components/Home/DrinkController";
import { drinkTodayAtom } from "../recoil/drinkTodayAtom";
import { useRecoilState } from "recoil";
import { fetchDrink } from "../api/drinkRecordApi";
import { getToday } from "../utils/timeUtils";
import { getIdByCategoryAndUnit } from "../utils/drinkUtils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { mainbackground } from "../assets";

const HomeScreen = ({ navigation }) => {
  const [drinkToday, setDrinkToday] = useRecoilState(drinkTodayAtom);
  const [currentDrinks, setCurrentDrinks] = useState<Record<number, number>>(
    {}
  );
  const today = getToday();
  const [initialValue, setInitialValue] = useState(0);

  // 회원 정보 없을 시 로그인 화면으로 이동
  // useEffect(() => {
  //   const fetchToken = async () => {
  //     try {
  //       const token = await AsyncStorage.getItem("accessToken");
  //       if (token === null) {
  //         navigation.navigate("Login");
  //       }
  //     } catch (error) {
  //       console.error("토큰을 가져오는 중에 오류가 발생했습니다:", error);
  //     }
  //   };
  //   fetchToken();
  // }, []);

  // 메인에서 뒤로가기 방지
  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );

      return () => {
        backHandler.remove();
      };
    }, [])
  );

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const data = await fetchDrink(today);
          if (data) {
            const drinkTodayData = {
              drinkTotal: data.drinkTotal,
              alcoholAmount: data.alcoholAmount,
              drinkStartTime: data.drinkStartTime,
              height: data.height,
              weight: data.weight,
              gender: data.gender,
              bacAt5: data.todayBloodAlcohol,
              alcoholAt5: data.todayLiverAlcohol,
            };

            setDrinkToday(new DrinkToday(drinkTodayData));

            const currentDrinksObject = {};
            data.drinks.forEach((drink) => {
              const id = getIdByCategoryAndUnit(
                drink.category,
                drink.drinkUnit
              );
              if (id === 2) {
                setInitialValue(drink.drinkAmount);
              }

              if (currentDrinksObject.hasOwnProperty(id)) {
                currentDrinksObject[id] += drink.drinkAmount;
              } else {
                currentDrinksObject[id] = drink.drinkAmount;
              }
            });

            setCurrentDrinks(currentDrinksObject);
          }
        } catch (error) {
          console.error("데이터를 가져오는 동안 에러 발생:", error);
        }
      };

      fetchData();
    }, [])
  );

  const screenHeight = Dimensions.get("window").height;

  if (!drinkToday) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} color="#03174C" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.mainContainer}>
      <ImageBackground source={mainbackground} style={{ height: screenHeight }}>
        <View style={styles.subContainer}>
          <View>
            <HomeCarousel />
          </View>
          <View style={styles.controllerContainer}>
            <SafeDriveInfo
              bloodAlcoholContent={drinkToday.currentBloodAlcoholContent}
              requiredTimeToDrive={drinkToday.cannotDriveFor}
            />
            <DrinkController
              currentDrinks={currentDrinks}
              initialValue={initialValue}
            />
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
  },
  subContainer: {
    display: "flex",
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    // justifyContent: "space-between",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  controllerContainer: {
    margin: 24,
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  background: {
    height: "100%",
  },
});

export default HomeScreen;
