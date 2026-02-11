import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/state";
import { useEffect } from "react";
import { list_pharmacy_async } from "../store/pharmacy";

export default function use_init() {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(list_pharmacy_async());
  }, [dispatch]);

  return { loading: false };
}
