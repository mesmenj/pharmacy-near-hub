import dayjs from "dayjs";

import { capitalizeFirstLetter } from "./capitalize";
export function fromFirebaseToJs(date: any): Date {
  if (date?.seconds) {
    const milliseconds = date.seconds * 1000 + date.nanoseconds / 1000000;
    return dayjs(milliseconds).toDate();
  }
  return date as any;
}

export const formatTime = (date: Date | number) => {
  const toDay = dayjs(new Date()).startOf("day");
  const incomeDay = dayjs(date).startOf("day");
  if (toDay.isSame(incomeDay)) {
    return `${capitalizeFirstLetter("to_day")} , ${dayjs(date).format(
      "HH:mm"
    )}`;
  }
  return dayjs(date).format("DD MMM YYYY , HH:mm");
};

export function formatDate(
  date: Date | number | string | null,
  formater = "DD MMM YYYY",
  local = "fr"
): string {
  if (!date) return "";
  return dayjs(date).locale(local).format(formater);
}

export const getFormatedDate = (start: any, end: any, local = "fr") => {
  const day1 = dayjs(start || new Date())
    .locale(local)
    .format("DD MMM YYYY");
  const day2 = dayjs(end || new Date())
    .locale(local)
    .format("DD MMM YYYY");
  const toDay = dayjs(new Date()).locale(local).format("DD MMM YYYY");
  if (day1 === day2) {
    if (toDay === day1) {
      return toDay + " (" + "today" + ")";
    }
    return day1;
  }
  return `${day1} - ${day2}`;
};
