import { ImageProps } from "react-native";
import * as assets from "../assets";
import drinkData from "../data/drinks.json";

const IdImageMap: Record<number, ImageProps["source"]> = {};

for (let i = 1; i <= 15; i++) {
  IdImageMap[i] = assets[`drink${i.toString().padStart(2, "0")}`];
}

export const getDrinkImageById = (id: number): ImageProps["source"] => {
  const image = IdImageMap[id];
  if (image === undefined) {
    throw new Error(`Invalid drink ID: ${id}`);
  }
  return image;
};

export const getIdByCategoryAndUnit = (
  category: string,
  unit: string
): number | null => {
  const matchingDrink = drinkData.find(
    (item) => item.name === category && item.unit === unit
  );
  return matchingDrink ? matchingDrink.id : null;
};

export const getIdByOnlyCategory = (category: string): number | null => {
  const matchingDrink = drinkData.find(
    (item) => item.name === category && item.unit === "잔"
  );
  return matchingDrink ? matchingDrink.id : null;
};

// 마신 술 양을 잔 수로만 반환
export const getShotAmountByDrinkCOunt = (category: string, num: number) => {
  let amount = num;
  const shot = drinkData.find(
    (item) => item.name === category && item.unit === "잔"
  );
  return amount / shot.volume;
};

// 마신 술 양이 몇 병 몇 잔인지 반환
export const getAmountByDrinkCount = (category: string, num: number) => {
  let amount = num;
  const bottle = drinkData.find(
    (item) => item.name === category && item.unit === "병"
  );

  let bottleAmount = 0;
  if (bottle) {
    bottleAmount = Math.floor(amount / bottle.volume);
    amount -= bottleAmount * bottle.volume;
  }
  const shot = drinkData.find(
    (item) => item.name === category && item.unit === "잔"
  );
  let shotAmount = amount / shot.volume;
  return [bottleAmount, shotAmount];
};

export const getDrinkAndAlcoholAmountById = (
  targetId: number
): {
  drinkAmount: number;
  alcoholAmount: number;
} | null => {
  const matchingDrink = drinkData.find((item) => item.id === targetId);
  const drinkAmount = matchingDrink ? matchingDrink.volume : null;
  const alcoholAmount = matchingDrink ? matchingDrink.alcoholAmount : null;

  if (drinkAmount != null && alcoholAmount != null) {
    return { drinkAmount, alcoholAmount };
  } else {
    return null;
  }
};
