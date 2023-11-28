import "expo-dev-client";
import { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { preventAutoHideAsync, hideAsync } from "expo-splash-screen";
import { RootSiblingParent } from "react-native-root-siblings";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer, CommonActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Toast from "react-native-root-toast";

import LoginScreen from "./screens/LoginScreen";
import KakaoLoginScreen from "./screens/KakaoLoginScreen";
import TermsScreen from "./screens/TermsScreen";
import AddInfoScreen from "./screens/AddInfoScreen";

import HomeScreen from "./screens/HomeScreen";

import CalendarScreen from "./screens/CalendarScreen";
import DailyDetailScreen from "./screens/DailyDetailScreen";
import RecordCreateScreen from "./screens/RecordCreateScreen";

import MyPageScreen from "./screens/MyPageScreen";
import SettingsScreen from "./screens/SettingsScreen";
import NotificationScreen from "./screens/SettingsScreen/NotificationScreen";
import ServiceTermsScreen from "./screens/SettingsScreen/ServiceTermsScreen";
import LocationTermsScreen from "./screens/SettingsScreen/LocationTermsScreen";
import PrivacyPolicyScreen from "./screens/SettingsScreen/PrivacyPolicyScreen";
import EditProfileScreen from "./screens/EditProfileScreen";

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();
const queryClient = new QueryClient();

import { Subscription } from "expo-modules-core";
import * as Notifications from "expo-notifications";
import {
  registerForPushNotificationsAsync,
  scheduleLastChanceNotification,
} from "./utils/notificationUtils";
import {
  registerResetTask,
  registerAlarmTimeResetTask,
} from "./utils/backgroundTaskUtils";

import HomeRouteScreen from "./screens/HomeRouteScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import LastChanceScreen from "./screens/LastChanceScreen";
import WelcomeScreen from "./screens/WelcomeScreen";

import {
  getFirstLocationPermission,
  resetAsyncStorage,
} from "./utils/gpsUtils";
import { err } from "react-native-svg/lib/typescript/xml";

// 막차 알림 임의 조정

// AsyncStorage.setItem("nowLocation", "{}");
// async function getStorageValue() {
// 	console.log("----------------");
// 	console.log("토큰", await AsyncStorage.getItem("accessToken"));
// 	console.log("사용자 주량", await AsyncStorage.getItem("alcoholLimit"));
// 	console.log("현재 위치", await AsyncStorage.getItem("nowLocation"));
// 	console.log("도착지 위치", await AsyncStorage.getItem("destLocation"));
// 	console.log("위치 조회 계속",	await AsyncStorage.getItem("keepUpdateLocation"));
// 	console.log("알람 시간", await AsyncStorage.getItem("alarmTime"));
// 	console.log("마지막post 시간", await AsyncStorage.getItem("todayPostDate"));
// 	console.log("마지막 alert 시간", await AsyncStorage.getItem("lastCheckedDate"));
// 	console.log("---==----------");
// }

// getStorageValue();

// 막차 알림이 활성화 되어있을 경우에만 TASK 수행
async function checkNotificationStatusAndExecuteTasks() {
  const drinkNotificationStatus = await AsyncStorage.getItem(
    "isLastNotificationEnabled"
  );

  if (drinkNotificationStatus !== null) {
    const isGranted = JSON.parse(drinkNotificationStatus);
    if (isGranted) {
      registerResetTask();
      registerAlarmTimeResetTask();

      const currentAlarmTime = await AsyncStorage.getItem("alarmTime");
      const currnetTodayPostDate = await AsyncStorage.getItem("todayPostDate");
      if (currentAlarmTime != null || currnetTodayPostDate != null) {
        resetAsyncStorage();
      }
    }
  }
}

checkNotificationStatusAndExecuteTasks();
preventAutoHideAsync();

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: "#363C4B" },
        headerTintColor: "white",
        headerTitleAlign: "center",
        tabBarShowLabel: false,
        tabBarInactiveTintColor: "#ffffff",
        tabBarActiveTintColor: "#FFDE68",
        tabBarStyle: { backgroundColor: "#000000", height: 60 },
      }}
      sceneContainerStyle={{
        backgroundColor: "#ffffff",
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="md-home-sharp" color={color} size={size} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="md-calendar-sharp" color={color} size={size} />
          ),
        }}
      />
      <BottomTab.Screen
        name="lastChance"
        component={LastChanceScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map-outline" color={color} size={size} />
          ),
        }}
      />
      <BottomTab.Screen
        name="MyPage"
        component={MyPageScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

const theme = {
  ...DefaultTheme,

  custom: "property",

  colors: {
    ...DefaultTheme.colors,
    mainPink: "#F2A7C3",
    mainBlue: "#363C4B",
    mainGreen: "#03A678",
    mainYellow: "#F2D06B",
    mainRed: "#F25E5E",
  },
};

export default function App() {
  const navigationRef = useRef(null);
  const notificationListener = useRef<Notifications.Subscription | undefined>();
  const responseListener = useRef<Notifications.Subscription | undefined>();
  const [notification, setNotification] =
    useState<Notifications.Notification | null>(null);

  let initialRoute: string;
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await AsyncStorage.getItem("accessToken");
        if (token === null) {
          initialRoute = "Login";
        } else {
          initialRoute = "BottomTab";
        }
      } catch (error) {
        // console.error("토큰을 가져오는 중에 오류가 발생했습니다:", error);
        Toast.show("잠시 후 다시 시도해주세요.", {
          duration: Toast.durations.SHORT,
        });
        throw error;
      }
    };
    fetchToken();
  }, []);

  useEffect(() => {
    // AsyncStorage.setItem("alarmTime", "17:56");

    getFirstLocationPermission();
    scheduleLastChanceNotification();

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const screen = response.notification.request.content.data.screen;
        if (screen) {
          navigationRef.current.dispatch(CommonActions.navigate(screen));
        }
      });

    return () => {
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const [fontsLoaded, fontError] = useFonts({
    "Yeongdeok-Sea": require("./assets/fonts/Yeongdeok-Sea.ttf"),
    LineRegular: require("./assets/fonts/LINESeedKR-Rg.ttf"),
    LineBold: require("./assets/fonts/LINESeedKR-Bd.ttf"),
    LineThin: require("./assets/fonts/LINESeedKR-Th.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // if (!fontsLoaded && !fontError) {
  //   return null;
  // }

  // 알림 관련..?
  // const notificationListener = useRef<Subscription>();
  // const responseListener = useRef<Subscription>();
  // useEffect(() => {
  //   registerForPushNotificationsAsync().then(async (token) => {
  //     if (token) {
  //       await AsyncStorage.setItem("expoPushToken", token);
  //     } else {
  //       return;
  //     }
  //   });

  //   notificationListener.current =
  //     Notifications.addNotificationReceivedListener((notification) => {
  //       // console.log("App.tsx 174: ", notification);
  //     });

  //   responseListener.current =
  //     Notifications.addNotificationResponseReceivedListener((response) => {
  //       console.log(response);
  //     });

  //   return () => {
  //     if (
  //       typeof notificationListener.current !== "undefined" &&
  //       typeof responseListener.current !== "undefined"
  //     ) {
  //       Notifications.removeNotificationSubscription(
  //         notificationListener.current
  //       );
  //       Notifications.removeNotificationSubscription(responseListener.current);
  //     }
  //   };
  // }, []);

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RecoilRoot>
        <SafeAreaProvider>
          <RootSiblingParent>
            <PaperProvider theme={theme}>
              <QueryClientProvider client={queryClient}>
                <SafeAreaView
                  style={styles.rootScreen}
                  onLayout={onLayoutRootView}
                >
                  <StatusBar style="auto" />
                  <NavigationContainer ref={navigationRef}>
                    <Stack.Navigator
                      screenOptions={{
                        headerShown: false,
                        contentStyle: { backgroundColor: "#fff" },
                      }}
                      // initialRouteName="BottomTab"
                      initialRouteName={initialRoute}
                    >
                      <Stack.Screen name="Login" component={LoginScreen} />
                      <Stack.Screen
                        name="KakaoLoginScreen"
                        component={KakaoLoginScreen}
                      />

                      <Stack.Screen name="Terms" component={TermsScreen} />
                      <Stack.Screen name="AddInfo" component={AddInfoScreen} />
                      <Stack.Screen
                        name="BottomTab"
                        component={BottomTabNavigator}
                      />
                      <Stack.Screen
                        name="Settings"
                        component={SettingsScreen}
                        options={{
                          headerShown: true,
                          headerStyle: { backgroundColor: "#363C4B" },
                          headerTintColor: "white",
                          headerTitleAlign: "center",
                          title: "설정",
                        }}
                      />
                      <Stack.Screen
                        name="EditProfile"
                        component={EditProfileScreen}
                        options={{
                          headerShown: false,
                          headerStyle: { backgroundColor: "#363C4B" },
                          headerTintColor: "white",
                          headerTitleAlign: "center",
                        }}
                      />
                      <Stack.Screen
                        name="Notification"
                        component={NotificationScreen}
                        options={{
                          headerShown: true,
                          headerStyle: { backgroundColor: "#363C4B" },
                          headerTintColor: "white",
                          headerTitleAlign: "center",
                          title: "공지사항",
                        }}
                      />
                      <Stack.Screen
                        name="ServiceTerms"
                        component={ServiceTermsScreen}
                        options={{
                          headerShown: true,
                          headerStyle: { backgroundColor: "#363C4B" },
                          headerTintColor: "white",
                          headerTitleAlign: "center",
                          title: "서비스 이용약관",
                        }}
                      />
                      <Stack.Screen
                        name="LocationTerms"
                        component={LocationTermsScreen}
                        options={{
                          headerShown: true,
                          headerStyle: { backgroundColor: "#363C4B" },
                          headerTintColor: "white",
                          headerTitleAlign: "center",
                          title: "위치정보 이용약관",
                        }}
                      />
                      <Stack.Screen
                        name="PrivacyPolicy"
                        component={PrivacyPolicyScreen}
                        options={{
                          headerShown: true,
                          headerStyle: { backgroundColor: "#363C4B" },
                          headerTintColor: "white",
                          headerTitleAlign: "center",
                          title: "개인정보 처리방침",
                        }}
                      />
                      <Stack.Screen
                        name="DailyDetail"
                        component={DailyDetailScreen}
                        options={{
                          headerShown: false,
                          headerStyle: { backgroundColor: "#363C4B" },
                          headerTintColor: "white",
                          title: "Calendar",
                        }}
                      />
                      <Stack.Screen
                        name="RecordCreate"
                        component={RecordCreateScreen}
                        options={{
                          headerShown: false,
                          headerStyle: { backgroundColor: "#363C4B" },
                          headerTintColor: "white",
                          title: "Calendar",
                        }}
                      />
                      <Stack.Screen
                        name="HomeRoute"
                        component={HomeRouteScreen}
                        options={{
                          headerShown: false,
                          headerStyle: { backgroundColor: "#363C4B" },
                          headerTintColor: "white",
                          title: "HomeRoute",
                        }}
                      />
                      <Stack.Screen
                        name="Welcome"
                        component={WelcomeScreen}
                        options={{
                          headerShown: false,
                          headerStyle: { backgroundColor: "#363C4B" },
                          headerTintColor: "white",
                          title: "Welcome",
                        }}
                      />
                    </Stack.Navigator>
                  </NavigationContainer>
                </SafeAreaView>
              </QueryClientProvider>
            </PaperProvider>
          </RootSiblingParent>
        </SafeAreaProvider>
      </RecoilRoot>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
});
