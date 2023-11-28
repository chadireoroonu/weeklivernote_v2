import React from "react";
import DrinkingStatus from "./DrinkingStatus";
import DetoxingStatus from "./DetoxingStatus";
import { calculateTimeDifference } from "../../utils/timeUtils";
import { useRecoilValue } from "recoil";
import { drinkTodayAtom } from "../../recoil/drinkTodayAtom";

interface UserStatusProps {
  identifier: string;
}

const UserStatus: React.FC<UserStatusProps> = ({ identifier }) => {
  const drinkToday = useRecoilValue(drinkTodayAtom);

  if (!drinkToday) {
    return;
  }

  const timeSinceDrink = drinkToday.drinkStartTime
    ? calculateTimeDifference(new Date(drinkToday.drinkStartTime))
    : undefined;

  return (
    <>
      {identifier === "0" && (
        <DrinkingStatus
          drinkInVolume={drinkToday.drinkTotal}
          drinkingFor={timeSinceDrink}
          imageSource={drinkToday.intoxicationImage}
        />
      )}
      {identifier === "1" && (
        <DetoxingStatus
          alcoholInGrams={drinkToday.alcoholAmount}
          requiredTimeForDetox={drinkToday.requiredTimeForDetox}
          alcoholAt5={drinkToday.alcoholAt5}
          currentAlcohol={drinkToday.currentAlcoholAmount}
        />
      )}
    </>
  );
};

export default UserStatus;
