import React, { useRef, useState, useEffect } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { DrinkCarouselItem, ListItemWidth } from "./DrinkCarouselItem";
import { useSharedValue } from "react-native-reanimated";
import { useAppTheme } from "../../hooks/useAppTheme";
import SwipeMotion from "./SwipeMotion";

type DrinkCarouselProps = {
  data: Drink[];
  sendData: (drink: Drink) => void;
  onClose: () => void;
};

const DrinkCarousel: React.FC<DrinkCarouselProps> = ({
  data,
  sendData,
  onClose,
}) => {
  const {
    colors: { mainBlue },
  } = useAppTheme();
  const [centeredItem, setCenteredItem] = useState({
    id: 1,
    name: "소주",
    volume: 360,
    unit: "병",
    alcoholPercentage: 19,
    alcoholAmount: 54.6,
  });
  const [showInstruction, SetShowInstruction] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      SetShowInstruction(false);
    }, 1500);

    return () => {
      SetShowInstruction(true);
    };
  }, []);

  const contentOffset = useSharedValue(0);
  const flatListRef = useRef(null);

  const getCenterItemIndex = () => {
    const itemWidth = ListItemWidth;
    const centerOffsetX = contentOffset.value + itemWidth / 2;

    return Math.floor(centerOffsetX / itemWidth);
  };

  const handleMomentumScrollEnd = () => {
    const centerItemIndex = getCenterItemIndex();
    setCenteredItem(data[centerItemIndex]);
  };

  const handleSelect = () => {
    sendData(centeredItem);
    onClose();
  };

  const handleClick = (index) => {
    setCenteredItem(data[index]);
    const targetOffset = index * ListItemWidth;
    flatListRef.current.scrollToOffset({
      offset: targetOffset,
      animated: true,
    });
  };

  return (
    <View style={styles.rootcontainer}>
      {showInstruction && <SwipeMotion />}
      <FlatList
        data={data}
        ref={flatListRef}
        keyExtractor={(_, index) => index.toString()}
        scrollEventThrottle={16} // 60fps -> 16ms (1000ms / 60fps)
        onScroll={(event) => {
          contentOffset.value = event.nativeEvent.contentOffset.x;
        }}
        pagingEnabled
        snapToInterval={ListItemWidth}
        style={{
          position: "absolute",
          bottom: 0,
          height: 300,
        }}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 1.5 * ListItemWidth,
        }}
        horizontal
        renderItem={({ item, index }) => (
          <DrinkCarouselItem
            contentOffset={contentOffset}
            item={item}
            index={index}
            onPress={() => handleClick(index)}
          />
        )}
        onMomentumScrollEnd={handleMomentumScrollEnd}
      />
      <Button
        onPress={handleSelect}
        mode="text"
        textColor="white"
        buttonColor={mainBlue}
        style={styles.selectButton}
        labelStyle={styles.buttonText}
      >
        선택하기
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  rootcontainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 200,
  },
  selectButton: {
    padding: 5,
  },
  buttonText: {
    fontSize: 16,
  },
});

export { DrinkCarousel };
