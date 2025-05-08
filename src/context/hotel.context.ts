import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Stripe } from "@stripe/stripe-js";

export interface TSearch {
  destination: string;
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  hotelId?: string;
}
const minCheckOutDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
const defaultSearch: TSearch = {
  destination: "",
  checkIn: new Date(),
  checkOut: minCheckOutDate,
  adultCount: 1,
  childCount: 0,
  hotelId: "",
};

export interface SearchState {
  stripe: Promise<Stripe | null>;
  search: TSearch;
  setSearch: (search: TSearch) => void;
  setStripe: (stripe: Promise<Stripe | null>) => void;
  updateSearch: (partial: Partial<TSearch>) => void;
  resetSearch: () => void;
}

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
      stripe: Promise.resolve(null),
      setSearch: (search) => set({ search }),
      setStripe: (stripe) => set({ stripe }),
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
