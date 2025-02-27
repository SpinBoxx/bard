import { Competition } from "@/enums/competition";
import { CarFuel } from "@/enums/fuel-enum";
import { Travel } from "@/types/travel";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TravelStoreInterface {
  travels: Travel[];
  addTravel: (travel: Travel) => void;
  getTravels: () => Travel[];
  removeTravel: () => void;
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
      removeTravel: () => {},
    }),
    {
      name: "bard-travels",
    }
  )
);
