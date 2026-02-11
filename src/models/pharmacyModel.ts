import type { BaseModel } from ".";

export interface PharmacyModel extends BaseModel {
  name: string;
  lat: number;
  lng: number;
  address: string;
  isOpen: boolean;
  phone: string;
  openingHours: string;
  distance: string;
}
