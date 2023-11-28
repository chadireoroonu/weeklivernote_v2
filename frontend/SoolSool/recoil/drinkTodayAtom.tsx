import { atom } from "recoil";
import { DrinkToday } from "../models/DrinkToday";

export const drinkTodayAtom = atom<DrinkToday>({
  key: "drinkToday",
  default: null,
});
