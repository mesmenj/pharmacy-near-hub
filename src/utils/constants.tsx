// Données simulées pour les pharmacies

import type { PharmacyModel } from "../models/pharmacyModel";

// console.log("place", place);
export const pharmacies: PharmacyModel[] = [
  {
    id: "1",
    name: "SAINTE ANNE",
    address: "123 Rue Principale, Paris 75001",
    distance: "0.5 km",
    openingHours: "08:30 - 19:30",
    phone: "+33 1 23 45 67 89",
    // rating: 4.8,
    isOpen: true,
    lat: 2,
    lng: 2,
  },
  {
    id: "2",
    name: "Pharmacie de Garde",
    address: "456 Avenue des Champs, Paris 75008",
    distance: "1.2 km",
    openingHours: "24/7",
    phone: "+33 1 98 76 54 32",
    // rating: 4.9,
    isOpen: true,
    lat: 2,
    lng: 2,
  },
  {
    id: "3",
    name: "Pharmacie Santé Plus",
    address: "789 Boulevard Voltaire, Paris 75011",
    distance: "2.1 km",
    openingHours: "09:00 - 20:00",
    phone: "+33 1 45 67 89 01",
    // rating: 4.6,
    isOpen: false,
    lat: 2,
    lng: 2,
  },
  {
    id: "4",
    name: "Pharmacie du Quartier",
    address: "321 Rue de Rivoli, Paris 75004",
    distance: "1.8 km",
    openingHours: "08:00 - 21:00",
    phone: "+33 1 34 56 78 90",
    // rating: 4.7,
    isOpen: true,
    lat: 2,
    lng: 2,
  },
];
