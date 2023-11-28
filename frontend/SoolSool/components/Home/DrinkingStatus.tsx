import { StyleSheet, View, Image, Text, ImageProps } from "react-native";

interface DrinkingStatusProps {
  drinkInVolume: number;
  drinkingFor: number | undefined;
  imageSource: ImageProps["source"];
}

function DrinkingStatus({
  drinkInVolume,
  drinkingFor,
  imageSource,
}: DrinkingStatusProps) {
  return (
    <View style={styles.statusContainer}>
      <View>
        <Text style={styles.titleContainer}>
          {drinkInVolume.toLocaleString()}ml
        </Text>
        {drinkingFor === undefined ? (
          <Text style={styles.subtitleContainer}>
            <Text style={styles.periodContainer}>
              술을 마셨다면 기록해볼까요?
            </Text>
          </Text>
        ) : (
          <Text style={styles.subtitleContainer}>
            마신 지{"  "}
            <Text style={styles.periodContainer}>{drinkingFor}</Text>
            시간 째
          </Text>
        )}
      </View>
      <View style={styles.imageContainer}>
        <View style={styles.shadowContainer} />
        <Image source={imageSource} style={styles.image} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  statusContainer: {
    width: "80%",
    marginTop: "20%",
    marginVertical: 24,
    padding: 4,
    display: "flex",
    alignItems: "center",
    gap: 30,
  },
  titleContainer: {
    fontSize: 30,
    fontFamily: "LineRegular",
    color: "white",
    textAlign: "center",
    marginBottom: 5,
  },
  subtitleContainer: {
    fontSize: 20,
    fontFamily: "LineRegular",
    color: "white",
    marginBottom: 20,
  },
  periodContainer: {
    fontSize: 20,
    fontFamily: "LineRegular",
    color: "white",
  },
  imageContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  shadowContainer: {
    position: "absolute",
    top: 150,
    width: 120,
    height: 80,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 80,
    transform: [{ scaleX: 2 }],
  },
  image: {
    position: "absolute",
    top: 0,
    width: 230,
    height: 230,
  },
});

export default DrinkingStatus;
