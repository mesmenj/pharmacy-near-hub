import { toast } from "sonner";
import { capitalizeFirstLetter } from "./capitalize";

export default function notifySuccess(message?: string) {
  toast.success(message || "Operation successful", {
    style: {
      backgroundColor: "#C8E6C9",
      color: "#1B5E20",
    },
    duration: 2000,
    position: "top-center",
  });
}
export function notifyError(message?: string) {
  toast.error(message || "An error occurred", {
    style: {
      backgroundColor: "#FFCDD2",
      color: "#B71C1C",
    },
    duration: 2000,
    position: "top-center",
  });
}
export function notifyPermission(message?: string) {
  toast.warning(capitalizeFirstLetter(message || "access refusé"));
}
