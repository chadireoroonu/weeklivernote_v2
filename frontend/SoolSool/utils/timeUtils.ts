// 새벽 5시를 기준으로 날짜를 판단
export function getAdjustedDate(date) {
  const now = new Date(date);

  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  if (currentHour < 5 || (currentHour === 5 && currentMinute === 0)) {
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);

    return yesterday;
  }

  return now;
}

// 관념적 날짜 문자열 반환
export function getToday(): string {
  const today = new Date();
  const adjustedToday = getAdjustedDate(today);
  const year = adjustedToday.getFullYear();
  const month = (adjustedToday.getMonth() + 1).toString().padStart(2, "0");
  const day = adjustedToday.getDate().toString().padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}

// 진짜 오늘 날짜 문자열 반환
export function getRealToday(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const day = today.getDate().toString().padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}

// 오늘 새벽 5시 타임스탬프 반환
export function getTodayAt5(): string {
  const today = new Date();

  const year = today.getFullYear();
  const month = today.getMonth();
  const day = today.getDate();

  const todayAt5 = new Date(year, month, day, 5, 0, 0, 0).toISOString();
  return todayAt5;
}

// 목표 시간과의 차이 계산
export function calculateTimeDifference(targetDate: Date): number {
  const currentTime = new Date();
  const differenceInMilliseconds = currentTime.getTime() - targetDate.getTime();

  const millisecondsInOneHour = 1000 * 60 * 60;
  const hoursDifference = differenceInMilliseconds / millisecondsInOneHour;

  const roundedHoursDifference = Math.round(hoursDifference * 10) / 10;

  return roundedHoursDifference;
}

// n시간 후의 시간 계산
export function calculateTimeAfterHours(hoursToAdd: number): string {
  const now = new Date();
  const newTime = new Date(now.getTime() + hoursToAdd * 3600000);

  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const currentDay = now.getDate();

  const newYear = newTime.getFullYear();
  const newMonth = newTime.getMonth();
  const newDay = newTime.getDate();

  const hours = newTime.getHours();
  const minutes = newTime.getMinutes();

  const timeDifference = newTime.getTime() - now.getTime();
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  if (daysDifference > 1) {
    return `${daysDifference}일 후 ${hours < 10 ? `0${hours}` : hours}:${
      minutes < 10 ? `0${minutes}` : minutes
    }`;
  } else if (
    currentYear === newYear &&
    currentMonth === newMonth &&
    currentDay === newDay
  ) {
    return `오늘 ${hours < 10 ? `0${hours}` : hours}:${
      minutes < 10 ? `0${minutes}` : minutes
    }`;
  } else {
    return `내일 ${hours < 10 ? `0${hours}` : hours}:${
      minutes < 10 ? `0${minutes}` : minutes
    }`;
  }
}
