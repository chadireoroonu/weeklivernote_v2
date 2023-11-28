import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
  ImageBackground,
  Dimensions,
} from "react-native";
import {
  Checkbox,
  Button,
  DefaultTheme,
  PaperProvider,
} from "react-native-paper";
import { mainbackground } from "../assets";
import terms from "../data/terms.json";

const TermsScreen = ({ navigation, route }) => {
  const socialId = route?.params?.socialId;
  const screenHeight = Dimensions.get("window").height;
  const [isTermsChecked, setIsTermsChecked] = useState(
    new Array(terms.length).fill(false)
  );

  const handleAgree = () => {
    if (isTermsChecked.every((checked) => checked)) {
      navigation.navigate("AddInfo", { socialId: socialId });
    } else {
      Alert.alert("약관 동의", "모든 이용약관에 동의해야 합니다.");
    }
  };

  const toggleCheckbox = (index: number) => {
    const updatedCheckboxes = [...isTermsChecked];
    updatedCheckboxes[index] = !updatedCheckboxes[index];
    setIsTermsChecked(updatedCheckboxes);
  };

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "#FFDE68",
      accent: "#FFFFFF",
    },
  };

  return (
    <PaperProvider theme={theme}>
      <ImageBackground
        source={mainbackground}
        style={[{ height: screenHeight }, styles.mainContainer]}
      >
        <ScrollView>
          <View style={styles.container}>
            {terms.map((term, index) => (
              <View key={term.id} style={styles.termContainer}>
                <Text style={styles.termTitle}>{term.title}</Text>
                <ScrollView style={styles.scrollView}>
                  <Text style={styles.termContent}>{term.content}</Text>
                </ScrollView>
                <Checkbox.Item
                  status={isTermsChecked[index] ? "checked" : "unchecked"}
                  onPress={() => toggleCheckbox(index)}
                  label={`${term.title}에 동의합니다.`}
                  labelStyle={{ color: "white" }}
                />
              </View>
            ))}
            <Button
              mode="contained"
              onPress={handleAgree}
              buttonColor={
                isTermsChecked.every((checked) => checked)
                  ? "#FFDE68"
                  : "#9E9E9E"
              }
              textColor={"#000000"}
            >
              모든 약관에 동의합니다.
            </Button>
          </View>
        </ScrollView>
      </ImageBackground>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
  },
  container: {
    flex: 1,
    padding: 20,
    margin: 20,
    justifyContent: "space-between",
  },
  scrollView: {
    height: 280,
    borderWidth: 1,
    borderColor: "#9E9E9E",
    borderRadius: 15,
    padding: 4,
  },
  termContainer: {
    marginBottom: 20,
  },
  termTitle: {
    fontSize: 25,
    marginBottom: 10,
    color: "white",
  },
  termContent: {
    fontSize: 16,
    lineHeight: 24,
    color: "white",
    marginBottom: 20,
  },
});

export default TermsScreen;
