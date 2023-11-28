import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { PieChart } from "react-native-gifted-charts";

const categoryColors = {
  소주: "#009FFF",
  맥주: "#93FCF8",
  와인: "#BDB2FA",
  소맥: "#FFA5BA",
  "칵테일(약)": "#FA6E68",
  "칵테일(강)": "#D5E794",
  막걸리: "#FDF2D9",
  위스키: "#FDA515",
  하이볼: "#53A5D7",
};

const AlcoholPieChart = ({ data }) => {
  const [chartType, setChartType] = useState("drink");
  const [selectedItem, setSelectedItem] = useState(0);
  const isDrinkChart = chartType === "drink";

  const transformedData = data.map((item, index) => ({
    value: isDrinkChart ? item.drinkPercent : item.alcPercent,
    title: item.category,
    color: categoryColors[item.category],
    focused: index === 0 ? true : false,
  }));

  const handleSectionPress = (index) => {
    setSelectedItem(index);
  };

  const toggleChartType = () => {
    setChartType(chartType === "drink" ? "alcohol" : "drink");
  };

  return (
    <View style={styles.rootContainer}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={toggleChartType} disabled={isDrinkChart}>
          <Text
            style={[
              styles.buttonLabel,
              { color: !isDrinkChart ? "#9E9E9E" : "#FFDE68" },
            ]}
          >
            음주량
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleChartType} disabled={!isDrinkChart}>
          <Text
            style={[
              styles.buttonLabel,
              { color: isDrinkChart ? "#9E9E9E" : "#FFDE68" },
            ]}
          >
            알코올양
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ padding: 20, alignItems: "center" }}>
        <PieChart
          data={transformedData}
          donut
          showGradient
          sectionAutoFocus
          focusOnPress
          radius={90}
          innerRadius={60}
          innerCircleColor={"#121B33"}
          onPress={(item, index) => handleSectionPress(index)}
          centerLabelComponent={() => {
            return (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text
                  style={{ fontSize: 22, color: "white", fontWeight: "bold" }}
                >
                  {`${transformedData[selectedItem].value}%`}
                </Text>
                <Text style={{ fontSize: 14, color: "white" }}>
                  {transformedData[selectedItem].title}
                </Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    margin: "2%",
    paddingHorizontal: "4%",
    paddingTop: "2%",
    borderRadius: 5,
    backgroundColor: "#121B33",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: "2%",
  },
});

export default AlcoholPieChart;
