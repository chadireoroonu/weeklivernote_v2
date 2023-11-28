import * as React from "react";
import { View } from "react-native";

const CustomSlider = ({ value, onValueChange }) => {
  const totalWidth = 100;

  const handleDrag = (event) => {
    const newValue = event.nativeEvent.locationX / totalWidth;
    onValueChange(newValue);
  };

  return (
    <View
      style={{
        width: 350,
        height: 15,
        backgroundColor: "#DBEBF5",
        borderRadius: 10,
        overflow: "hidden",
      }}
      onTouchMove={handleDrag}
    >
      <View
        style={{
          width: value * 350, // 프로그레스 값에 따른 너비
          height: 15,
          backgroundColor: "#363C4B",
        }}
      />
    </View>
  );
};

export default CustomSlider;
