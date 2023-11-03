package com.ohyes.soolsool.user.application;

import com.ohyes.soolsool.drink.dao.DiaryRepository;
import com.ohyes.soolsool.drink.dao.DrinkRepository;
import com.ohyes.soolsool.drink.domain.Diary;
import com.ohyes.soolsool.user.dao.UserRepository;
import com.ohyes.soolsool.user.domain.User;
import com.ohyes.soolsool.user.dto.ChartDataDto;
import com.ohyes.soolsool.user.dto.UserStatChartResponseDto;
import com.ohyes.soolsool.user.dto.UserStatResponseDto;
import com.ohyes.soolsool.user.dto.WeeklyCharDto;
import com.ohyes.soolsool.user.dto.YearlyChartDataDto;
import com.ohyes.soolsool.util.UserDetailsImpl;
import com.ohyes.soolsool.util.UserUtils;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserStatService {

    private final UserRepository userRepository;
    private final DrinkRepository drinkRepository;
    private final DiaryRepository diaryRepository;

    public UserStatResponseDto getUserStat(UserDetailsImpl userDetails) {
        // 유저 정보 인증
        User user = UserUtils.getUserFromToken(userDetails);

        // 유저의 현재 논 알코올 기간
        LocalDate now = LocalDate.now();
        LocalDate startNonAlcDate = user.getStartNonalcoholDate();
        int nowNonAlcPeriod = Math.abs((int) ChronoUnit.DAYS.between(startNonAlcDate, now));

        // 유저의 최장 논 알코올 기간
        int maxNonAlcPeriod = user.getMaxNonalcoholPeriod();

        if (maxNonAlcPeriod < nowNonAlcPeriod) {    // 현재 논 알코올 기간이 더 길다면 최장 논 알코올 기간 업데이트
            maxNonAlcPeriod = nowNonAlcPeriod;
            user.setMaxNonalcoholPeriod(maxNonAlcPeriod);
            userRepository.save(user);
        }

        // 유저의 올해 음주량
        int year = now.getYear();
        long totalInGlass = drinkRepository.getTotalDrinkAmountInGlass(user.getSocialId(), year);
        long totalInBottle = drinkRepository.getTotalDrinkAmountInBottle(user.getSocialId(), year);

        return UserStatResponseDto.builder()
            .nowNonAlcPeriod(nowNonAlcPeriod)
            .maxNonAlcPeriod(maxNonAlcPeriod)
            .drinkYearAmount(totalInGlass + totalInBottle)
            .build();
    }


    public UserStatChartResponseDto getUserStatChart(UserDetailsImpl userDetails) {
        User user = UserUtils.getUserFromToken(userDetails);

        LocalDate now = LocalDate.now();
        LocalDate startDate = now.minusDays(6);

        // weekly 술 총량
        Map<LocalDate, ChartDataDto> drinkDataMap = getChartDataMap(startDate);
        List<ChartDataDto> drinkData = drinkRepository.getDrinkData(user.getSocialId(), startDate,
            now);
        updateChartDataMap(drinkDataMap, drinkData);

        ArrayList<ChartDataDto> sortedDrinkList = getSortedChartDataList(drinkDataMap);

        // weekly 알코올 총량
        Map<LocalDate, ChartDataDto> alcDataMap = getChartDataMap(startDate);
        List<ChartDataDto> alcData = drinkRepository.getAlcData(user.getSocialId(), startDate, now);
        updateChartDataMap(alcDataMap, alcData);

        ArrayList<ChartDataDto> sortedAlcList = getSortedChartDataList(alcDataMap);

        // weekly bar/line data 반환 객체 생성
        WeeklyCharDto weeklyChart = new WeeklyCharDto();
        weeklyChart.setBar(sortedDrinkList);
        weeklyChart.setLine(sortedAlcList);

        // yearly 술 총량
        Map<Integer, YearlyChartDataDto> yearlyDrinkDataMap = getYearlyChartDataMap();
        List<YearlyChartDataDto> yearlyData = drinkRepository.getYearlyData(user.getSocialId(),
            now.getYear());
        updateYearlyChartDataMap(yearlyDrinkDataMap, yearlyData);

        ArrayList<YearlyChartDataDto> sortedYearlyList = getSortedYearlyChartDataList(
            yearlyDrinkDataMap);

        // weekly + yearly 그래프 반환 객체 생성
        UserStatChartResponseDto response = new UserStatChartResponseDto();
        response.setWeekly(weeklyChart);
        response.setYearly(sortedYearlyList);

        return response;
    }

    public void updateStartNonAlcDate(User user, LocalDate drinkDate) {
        if (drinkDate != null) {   // 실시간 일기 작성시 작성 날짜로 업데이트
            user.setStartNonalcoholDate(drinkDate);
            userRepository.save(user);
        } else {    // 기록 삭제 시 유저의 최근 일기 drinkDate 로 업데이트
            List<Diary> diaries = diaryRepository.findByUserOrderByDrinkDateDesc(user);
            user.setStartNonalcoholDate(diaries.get(0).getDrinkDate());
            userRepository.save(user);
        }
    }

    public void updateMaxNonAlcPeriod(User user) {
        List<Diary> diaries = diaryRepository.findByUserOrderByDrinkDateDesc(user);
        int maxDayDiff = 0;

        for (int i = 0; i < diaries.size() - 1; i++) {
            LocalDate currentDrinkDate = diaries.get(i).getDrinkDate();
            LocalDate nextDrinkDate = diaries.get(i + 1).getDrinkDate();

            // 두 날짜의 차이 구하기
            int dayDiff = Math.abs((int) ChronoUnit.DAYS.between(currentDrinkDate, nextDrinkDate));

            if (dayDiff > maxDayDiff) {
                maxDayDiff = dayDiff;
            }
        }
        user.setMaxNonalcoholPeriod(maxDayDiff);
        userRepository.save(user);
    }

    // weekly 차트 빈 값 0으로 채우기
    private Map<LocalDate, ChartDataDto> getChartDataMap(LocalDate startDate) {
        Map<LocalDate, ChartDataDto> dataMap = new HashMap<>();
        for (int i = 0; i < 7; i++) {
            LocalDate date = startDate.plusDays(i);
            dataMap.put(date, new ChartDataDto(date, 0.0));
        }
        return dataMap;
    }

    // weekly 차트 불러온 데이터 채우기
    private void updateChartDataMap(Map<LocalDate, ChartDataDto> dataMap,
        List<ChartDataDto> newData) {
        for (ChartDataDto data : newData) {
            dataMap.put(data.getDate(), data);
        }
    }

    // weekly 차트 정렬
    private ArrayList<ChartDataDto> getSortedChartDataList(Map<LocalDate, ChartDataDto> dataMap) {
        ArrayList<ChartDataDto> sortedList = new ArrayList<>(dataMap.values());
        sortedList.sort(Comparator.comparing(ChartDataDto::getDate));
        return sortedList;
    }

    // yearly 차트 0인 경우 채우기
    private Map<Integer, YearlyChartDataDto> getYearlyChartDataMap() {
        Map<Integer, YearlyChartDataDto> dataMap = new HashMap<>();
        for (int i = 1; i <= 12; i++) {
            dataMap.put(i, new YearlyChartDataDto(i, 0));
        }
        return dataMap;
    }

    // yearly 차트 불러온 데이터 채우기
    private void updateYearlyChartDataMap(Map<Integer, YearlyChartDataDto> dataMap,
        List<YearlyChartDataDto> newData) {
        for (YearlyChartDataDto data : newData) {
            dataMap.put(data.getMonth(), data);
        }
    }

    // yearly 차트 정렬
    private ArrayList<YearlyChartDataDto> getSortedYearlyChartDataList(
        Map<Integer, YearlyChartDataDto> dataMap) {
        ArrayList<YearlyChartDataDto> sortedList = new ArrayList<>(dataMap.values());
        sortedList.sort(Comparator.comparing(YearlyChartDataDto::getMonth));
        return sortedList;
    }
}
