import React, { useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  ImageBackground,
} from "react-native";
import { Portal, Modal, Button } from "react-native-paper";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { mainbackground } from "../../assets";
import AddressSearch from "./AddressSearch";
import Postcode from "@actbase/react-daum-postcode";
import { ScrollView, TextInput } from "react-native-gesture-handler";

function AddInfoSecond({ address, setAddress, onNextClick }) {
  const screenHeight = Dimensions.get("window").height;
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const getAddressData = (data) => {
    let defaultAddress = "";

    if (data.buildingName === "") {
      defaultAddress = "";
    } else if (data.buildingName === "N") {
      defaultAddress = "(" + data.apartment + ")";
    } else {
      defaultAddress = "(" + data.buildingName + ")";
    }
    // this.props.navigation.navigate('Drawers',{screen:'Deliver', params:{zonecode:data.zonecode, address:data.address, defaultAddress:defaultAddress}});
    // console.log("여기에 정보가 담기겠지?", data);
    setAddress(data.address);
    hideModal();
  };
  return (
    <ImageBackground
      source={mainbackground}
      style={[{ height: screenHeight }, styles.mainContainer]}
    >
      <ScrollView>
        <View style={styles.subContainer}>
          <View style={styles.questionContainer}>
            <Text style={styles.titleText}>술자리 후</Text>
            <Text style={styles.titleText}>어디로 길을 안내해드릴까요?</Text>
          </View>
          <View style={styles.AddressContainer}>
            <View style={styles.rowContainer}>
              <TextInput
                placeholder="주소지를 검색해주세요"
                value={address}
                style={styles.textInput}
                editable={false}
              />
              <Button
                mode="contained-tonal"
                buttonColor="#FFDE68"
                style={styles.searchButton}
                onPress={showModal}
              >
                검색하기
              </Button>
            </View>
            {/* <AddressSearch setAddress={setAddress} /> */}
          </View>
          <Button
            mode="contained"
            buttonColor={"#FFDE68"}
            textColor={"#000000"}
            onPress={onNextClick}
          >
            다음 단계로 가기
          </Button>
        </View>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={{
              backgroundColor: "white",
              padding: 20,
              width: "90%",
              borderRadius: 5,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <View style={styles.modalContainer}>
              <Postcode
                style={{ width: "100%", height: 400 }}
                jsOptions={{ animation: true }}
                onSelected={(data) => getAddressData(data)}
                onError={(error) => console.error(error)}
              />
            </View>
          </Modal>
        </Portal>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    // justifyContent: "center",
  },
  subContainer: {
    width: "90%",
    marginRight: "auto",
    marginLeft: "auto",
    display: "flex",
    flexDirection: "column",
    // alignItems: "center",
    gap: 40,
    marginTop: 90,
    justifyContent: "center",
    paddingHorizontal: 10,
    // borderWidth: 1,
    // borderColor: "green",
  },
  text: {
    fontSize: 16,
    color: "white",
    fontFamily: "LineRegular",
  },
  questionContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  AddressText: {
    fontSize: 16,
    color: "yellow",
    fontFamily: "LineRegular",
  },
  titleText: {
    fontSize: 28,
    color: "white",
    fontFamily: "LineRegular",
    textAlign: "center",
  },
  AddressContainer: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    gap: 10,
  },
  rowContainer: {
    display: "flex",
    flexDirection: "row",
  },
  textInput: {
    backgroundColor: "rgba(255,255,255,0.5)",
    color: "black",
    height: 50,
    borderRadius: 10,
    flex: 4,
  },
  searchButton: {
    flex: 1,
    // backgroundColor: "lightgrey",
  },
  modalContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
  },
});

export default AddInfoSecond;
