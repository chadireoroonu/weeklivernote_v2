import React from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { Badge } from "react-native-paper";
import { getDrinkImageById } from "../../utils/drinkUtils";

interface CurrentDrinksProps {
  currentDrinkData: Record<number, number>;
  allDrinkData: Drink[];
  onClickItem: (drink: Drink) => void;
}

const CurrentDrinks: React.FC<CurrentDrinksProps> = ({
  currentDrinkData,
  allDrinkData,
  onClickItem,
}) => {
  const data = Object.entries(currentDrinkData).map(([id, quantity]) => ({
    id: Number(id),
    quantity: quantity,
  }));

  const getDrinkInfo = (id: number): Drink | undefined => {
    return allDrinkData.find((drink) => drink.id === id);
  };

  return (
    <FlatList
      data={data}
      horizontal={true}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => {
            const drink = getDrinkInfo(item.id);
            onClickItem(drink);
          }}
          style={styles.drinkItemContainer}
        >
          <View>
            <Badge
              theme={{ colors: { error: "#0477BF" } }}
              style={styles.drinkBadgeContainer}
            >
              {item.quantity}
            </Badge>
            <Image
              source={getDrinkImageById(item.id)}
              style={styles.drinkImageContainer}
            />
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  drinkItemContainer: {
    display: "flex",
    paddingHorizontal: 8,
    paddingTop: 14,
    paddingBottom: 4,
  },
  drinkBadgeContainer: {
    position: "absolute",
    bottom: 30,
    right: -10,
    margin: 4,
  },
  drinkImageContainer: {
    width: 40,
    height: 40,
    marginHorizontal: 4,
    resizeMode: "contain",
    borderColor: "transparent",
  },
});

export default CurrentDrinks;
