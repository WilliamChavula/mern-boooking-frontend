import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface TSearch {
  destination: string;
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  hotelId?: string;
}

const defaultSearch: TSearch = {
  destination: "",
  checkIn: new Date(),
  checkOut: new Date(),
  adultCount: 1,
  childCount: 0,
  hotelId: "",
};

export interface SearchState {
  search: TSearch;
  setSearch: (search: TSearch) => void;
  updateSearch: (partial: Partial<TSearch>) => void;
  resetSearch: () => void;
}

const minCheckOutDate = new Date(Date.now() + 24 * 60 * 60 * 1000);

export const useSearchStore = create(
  persist<SearchState>(
    (set) => ({
      search: {
        destination: "",
        checkIn: new Date(),
        checkOut: minCheckOutDate,
        adultCount: 1,
        childCount: 0,
        hotelId: "",
      },
      setSearch: (search) => set({ search }),
      updateSearch: (partial) =>
        set((state) => ({ search: { ...state.search, ...partial } })),
      resetSearch: () => set({ search: defaultSearch }),
    }),
    {
      name: "hotel-booking-data",
      storage: createJSONStorage(() => sessionStorage),
      merge: (persisted, current) => {
        const data = persisted as { search: Record<string, string> };
        return {
          ...current,
          ...data.search,
          checkIn: Date.parse(data.search["checkIn"]),
          checkOut: Date.parse(data.search["checkOut"]),
        };
      },
    },
  ),
);
