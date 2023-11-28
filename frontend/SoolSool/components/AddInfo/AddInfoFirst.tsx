import {
  StyleSheet,
  Image,
  View,
  ImageBackground,
  Text,
  Dimensions,
} from "react-native";
import { mainbackground } from "../../assets";
import BodyInfo from "./BodyInfo";
import { ScrollView } from "react-native-gesture-handler";

function AddInfoFirst({
  gender,
  setGender,
  height,
  setHeight,
  weight,
  setWeight,
  onNextClick,
}) {
  const screenHeight = Dimensions.get("window").height;

  return (
    <ImageBackground
      source={mainbackground}
      style={[{ height: screenHeight }, styles.mainContainer]}
    >
      <ScrollView>
        <View style={styles.subContainer}>
          <View style={styles.columnContainer}>
            <Text style={styles.infoText}>더 나은 주간일기를 위해</Text>
            <Text style={styles.infoText}>회원님의 정보를 알려주세요🙂</Text>
          </View>
          <BodyInfo
            gender={gender}
            setGender={setGender}
            height={height}
            setHeight={setHeight}
            weight={weight}
            setWeight={setWeight}
            onNextClick={onNextClick}
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
  },
  subContainer: {
    width: "90%",
    marginRight: "auto",
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
    gap: 50,
    marginTop: 110,
    paddingHorizontal: 10,
  },
  columnContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 3,
  },
  characterImage: {
    width: 400,
    height: 150,
    // resizeMode: "contain",
  },
  infoText: {
    fontSize: 24,
    color: "white",
    fontFamily: "LineRegular",
    textAlign: "center",
  },
});

export default AddInfoFirst;
