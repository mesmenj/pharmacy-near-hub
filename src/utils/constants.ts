// Données simulées pour les pharmacies

import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";

export const COLLECTIONS_NAMES = {
  USERS: "USERS",
  CUSTOMERS: "CUSTOMERS",
  PHARMACY: "PHARMACY",
  ADMIN_USER: "ADMIN_USER",
  SALES: "SALES",
  LOGS: "LOGS",
};

export const TabTextDisable = [
  "text_min",
  "one_number",
  "one_lower_case",
  "one_capital",
  "special_character",
];

export const initial_last_fetch_date = dayjs()
  .year(2024)
  .startOf("year")
  .toDate();

export default function createID() {
  return uuidv4();
}
