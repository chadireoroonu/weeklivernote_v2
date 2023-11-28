import { View, Text, StyleSheet } from "react-native";
import Postcode from "@actbase/react-daum-postcode";

function AddressSearch({ setAddress }) {
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
  };

  return (
    <View style={styles.mainContainer}>
      <Postcode
        style={{ width: "100%", height: "100%" }}
        jsOptions={{ animation: true }}
        onSelected={(data) => getAddressData(data)}
        onError={(error) => console.error(error)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    height: 500,
    backgroundColor: "red",
  },
  text: {
    color: "white",
  },
});

export default AddressSearch;
