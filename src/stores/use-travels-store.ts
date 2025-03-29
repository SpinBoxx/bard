import { Competition } from "@/enums/competition";
import { CarFuel } from "@/enums/fuel-enum";
import type { Travel } from "@/types/travel";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TravelStoreInterface {
  travels: Travel[];
  addTravel: (travel: Travel) => void;
  getTravels: () => Travel[];
  removeTravel: (travelId: string) => void;
}

export const useTravelStore = create<TravelStoreInterface>()(
  persist(
    (set, get) => ({
      travels: [],
      addTravel: (travel: Travel) => {
        set({
          travels: [...get().travels, travel],
        });
      },
      getTravels: () => {
        return get().travels;
      },
      removeTravel: (travelId: string) => {
        set({
          travels: get().travels.filter((travel) => travel.id !== travelId),
        });
      },
    }),
    {
      name: "bard-travels",
    }
  )
);
