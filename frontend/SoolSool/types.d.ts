interface DrinkTodayData {
  drinkTotal: number;
  alcoholAmount: number;
  drinkStartTime: string | null;
  height: number;
  weight: number;
  gender: string;
  bacAt5: number;
  alcoholAt5: number;
}

interface Drink {
  id: number;
  name: string;
  volume: number;
  unit: string;
  alcoholPercentage: number;
  alcoholAmount: number;
}
