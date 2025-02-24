import { Competition } from "@/enums/competition";
import { CarFuel } from "@/enums/fuel-enum";
import { Travel } from "@/types/travel";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TravelStoreInterface {
  travels: Travel[];
  addTravel: () => void;
  getTravels: () => Travel[];
  removeTravel: () => void;
}
const TRAVELS_DATA = [
  {
    id: 1,
    name: "Business Trip to Paris",
    competition: Competition.CRITERIUM,
    startDate: new Date("2025-03-10"),
    endDate: new Date("2025-07-15"),
    isReturnTrip: true,
    startingAddress: "123 Main St, Lyon",
    destinationAddress: "456 Champs Elysees, Paris",
    distance: "500km",
    tollPrice: 50,
    totalPrice: 50,
    carFuel: CarFuel.DIESEL,
    createdAt: new Date(),
    updated: new Date(),
    userId: "user123",
    tollTickets: [],
  },
  {
    id: 2,
    name: "Weekend Getaway to Nice",
    competition: Competition.CRITERIUM,
    startDate: new Date("2025-04-01"),
    endDate: new Date("2025-04-03"),
    isReturnTrip: true,
    startingAddress: "789 Rue de Provence, Marseille",
    destinationAddress: "101 Promenade des Anglais, Nice",
    distance: "200km",
    tollPrice: 30,
    totalPrice: 50,
    carFuel: CarFuel.DIESEL,
    createdAt: new Date(),
    updated: new Date(),
    userId: "user456",
    tollTickets: [],
  },
  {
    id: 3,
    name: "Conference in Berlin",
    competition: Competition.CRITERIUM,
    startDate: new Date("2025-05-15"),
    endDate: new Date("2025-05-20"),
    isReturnTrip: true,
    startingAddress: "555 Avenue des Champs, Paris",
    destinationAddress: "789 Alexanderplatz, Berlin",
    distance: "1050km",
    tollPrice: 80,
    totalPrice: 50,
    carFuel: CarFuel.DIESEL,
    createdAt: new Date(),
    updated: new Date(),
    userId: "user789",
    tollTickets: [],
  },
];

export const useTravelStore = create<TravelStoreInterface>()(
  persist(
    (set, get) => ({
      travels: TRAVELS_DATA,
      addTravel: () => {},
      getTravels: () => {
        return get().travels;
      },
      removeTravel: () => {},
    }),
    {
      name: "bard-travels",
    }
  )
);
