import { MD3LightTheme as DefaultTheme, useTheme } from "react-native-paper";

const theme = {
  ...DefaultTheme,

  custom: "property",

  colors: {
    ...DefaultTheme.colors,
    mainPink: "#F2A7C3",
    mainBlue: "#0477BF",
    mainGreen: "#03A678",
    mainYellow: "#F2D06B",
    mainRed: "#F25E5E",
  },
};

export type AppTheme = typeof theme;
export const useAppTheme = () => useTheme<AppTheme>();
