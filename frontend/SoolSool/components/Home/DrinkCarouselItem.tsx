import {
  Dimensions,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { getDrinkImageById } from "../../utils/drinkUtils";

interface Drink {
  id: number;
  name: string;
  volume: number;
  unit: string;
  alcoholPercentage: number;
  alcoholAmount: number;
}

type DrinkCarouselItemProps = {
  item: Drink;
  index: number;
  contentOffset: Animated.SharedValue<number>;
  onPress?: () => void;
};

const { width: windowWidth } = Dimensions.get("window");

export const ListItemWidth = windowWidth / 4;

const DrinkCarouselItem: React.FC<DrinkCarouselItemProps> = ({
  item,
  index,
  contentOffset,
  onPress,
}) => {
  const imageSource = getDrinkImageById(item.id);
  const rStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 2) * ListItemWidth,
      (index - 1) * ListItemWidth,
      index * ListItemWidth,
      (index + 1) * ListItemWidth,
      (index + 2) * ListItemWidth,
    ];

    const translateYOutputRange = [
      0,
      -ListItemWidth / 3,
      -ListItemWidth / 2,
      -ListItemWidth / 3,
      0,
    ];

    const opacityOutputRange = [0.7, 0.9, 1, 0.9, 0.7];

    const scaleOutputRange = [0.7, 0.8, 1, 0.8, 0.7];

    const translateY = interpolate(
      contentOffset.value,
      inputRange,
      translateYOutputRange,
      Extrapolate.CLAMP
    );

    const opacity = interpolate(
      contentOffset.value,
      inputRange,
      opacityOutputRange,
      Extrapolate.CLAMP
    );

    const scale = interpolate(
      contentOffset.value,
      inputRange,
      scaleOutputRange,
      Extrapolate.CLAMP
    );

    return {
      opacity,
      transform: [
        {
          translateY: translateY,
        },
        {
          scale,
        },
      ],
    };
  });

  return (
    <TouchableOpacity onPress={onPress}>
      <Animated.View
        style={[
          {
            width: ListItemWidth,
            aspectRatio: 1,
            elevation: 5,
            shadowOpacity: 0.2,
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowRadius: 20,
          },
          rStyle,
        ]}
      >
        <Image
          source={imageSource}
          style={{
            margin: 3,
            height: ListItemWidth,
            width: ListItemWidth,

            borderRadius: 200,
            borderWidth: 2,
            borderColor: "white",
          }}
        />
        <Text style={styles.text}>
          {item.name} ({item.unit})
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: "LineRegular",
  },
});

export { DrinkCarouselItem };
