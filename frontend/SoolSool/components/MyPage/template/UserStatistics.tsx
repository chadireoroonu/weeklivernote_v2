import { StyleSheet, View } from "react-native";
import React from "react";
import WeeklyStatistics from "../WeeklyStatistics";
import MonthlyStatistics from "../MonthlyStatistics";
import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import {
  fetchWeeklyStatistics,
  fetchYearlyStatistics,
} from "../../../api/statisticsApi";
import { useFocusEffect } from "@react-navigation/native";

function UserStatistics() {
  const [weeklyBarData, setWeeklyBarData] = useState(null);
  const [lineData, setLineData] = useState(null);
  const [monthlyBarData, setMonthlyBarData] = useState(null);
  const queryClient = useQueryClient();

  const {
    data: weeklyStatisticsData,
    isLoading: isWeeklyLoading,
    isError: isWeeklyError,
  } = useQuery(
    "weeklyStatisticsData",
    async () => await fetchWeeklyStatistics()
  );

  const {
    data: monthlyStatisticsData,
    isLoading: isMonthlyLoading,
    isError: isMonthlyError,
  } = useQuery(
    "monthlyStatisticsData",
    async () => await fetchYearlyStatistics()
  );

  useEffect(() => {
    if (!isWeeklyLoading && weeklyStatisticsData) {
      setWeeklyBarData(weeklyStatisticsData.weekly.bar);
      setLineData(weeklyStatisticsData.weekly.line);
    }

    if (!isMonthlyLoading && monthlyStatisticsData) {
      // console.log("왜?", monthlyStatisticsData);
      setMonthlyBarData(monthlyStatisticsData.yearly);
    }
  }, [
    weeklyStatisticsData,
    isWeeklyLoading,
    monthlyStatisticsData,
    isMonthlyLoading,
  ]);

  useFocusEffect(
    React.useCallback(() => {
      // console.log("데이터확인1", weeklyBarData);
      // console.log("데이터확인22", monthlyBarData);
      queryClient.invalidateQueries("weeklyStatisticsData");
      queryClient.invalidateQueries("monthlyStatisticsData");
    }, [])
  );

  return (
    <View style={styles.mainContainer}>
      <WeeklyStatistics barData={weeklyBarData} lineData={lineData} />
      <MonthlyStatistics barData={monthlyBarData} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "column",
    gap: 15,
    marginBottom: "5%",
  },
});

export default UserStatistics;
