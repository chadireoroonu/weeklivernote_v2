import React, { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import UserStatistics from "../components/MyPage/template/UserStatistics";
import { fetchUserNonAlc, fetchUserProfile } from "../api/mypageApi";
import UserNonAlc from "../components/MyPage/template/UserNonAlc";
import SettingsIconButton from "../components/MyPage/SettingsIconButton";
import Profile from "../components/MyPage/template/Profile";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

interface DrinkInfo {
  category: string;
  drinkAmount: number;
  drinkUnit: string;
}

interface UserProfile {
  address: string;
  alcoholLimit: number;
  gender: string;
  height: number;
  nickname: string;
  profileImg: string | null;
  weight: number;
  drinkInfo?: DrinkInfo;
}

interface AlcoholStatistics {
  maxNonAlcPeriod: number; // 최장금주기간
  nowNonAlcPeriod: number; // 현재금주기간
  drinkYearAmount: number; // 올해음주량
}

// interface UserProfileProps {
//   userProfile: UserProfile;
//   alcoholStatistics: AlcoholStatistics;
//   navigation: any;
// }

function MyPageScreen({ navigation }) {
  const queryClient = useQueryClient();
  const [userProfile, setUserProfile] = useState<UserProfile>({
    nickname: "",
    profileImg: "",
    gender: "",
    height: 0,
    weight: 0,
    alcoholLimit: 0,
    address: "",
    drinkInfo: null,
  });

  const [alcoholStatistics, setAlcoholStatistics] = useState<AlcoholStatistics>(
    {
      maxNonAlcPeriod: 0, // 최장금주기간
      nowNonAlcPeriod: 0, // 현재금주기간
      drinkYearAmount: 0, // 올해음주량
    }
  );

  function handleclickSettingsIcon() {
    navigation.navigate("Settings");
  }

  const {
    data: userProfileData,
    isLoading: isProfileLoading,
    isError: isProfileError,
  } = useQuery("userProfileData", async () => await fetchUserProfile());

  const {
    data: userNonAlcData,
    isLoading: isNonAlcLoading,
    isError: isNonAlcError,
  } = useQuery("userNonAlcData", async () => await fetchUserNonAlc());

  useFocusEffect(
    React.useCallback(() => {
      console.log("userProfile이 바뀌면", userProfile);
      queryClient.invalidateQueries("userProfileData");
    }, [userProfile])
  );

  useEffect(() => {
    if (!isProfileLoading && userProfileData) {
      setUserProfile(userProfileData);
    }
    if (!isNonAlcLoading && userNonAlcData) {
      setAlcoholStatistics(userNonAlcData);
    }
  }, [userProfileData, userNonAlcData]);

  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <View style={styles.subContainer}>
          <View style={styles.upperBar}>
            <Text style={{ color: "white", textAlign: "center" }}>
              나의 페이지
            </Text>
            <Ionicons
              name="settings"
              size={20}
              color={"white"}
              onPress={handleclickSettingsIcon}
            />
          </View>
          <Profile
            navigation={navigation}
            userData={userProfile}
            setUserProfile={setUserProfile}
          />
          <UserNonAlc alcoholData={alcoholStatistics} />
          <UserStatistics />
        </View>
      </View>
    </ScrollView>
  );
}
//
const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    backgroundColor: "#121B33",
  },
  subContainer: {
    flexDirection: "column",
    gap: 15,
    marginHorizontal: 15,
    width: "90%",
    marginRight: "auto",
    marginLeft: "auto",
  },
  upperBar: {
    width: "100%",
    height: 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
});

export default MyPageScreen;
