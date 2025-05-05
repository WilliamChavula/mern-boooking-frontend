import { create } from "zustand";

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

interface SearchState {
  search: TSearch;
  setSearch: (search: TSearch) => void;
  updateSearch: (partial: Partial<TSearch>) => void;
  resetSearch: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  search: {
    destination: "",
    checkIn: new Date(),
    checkOut: new Date(),
    adultCount: 1,
    childCount: 0,
    hotelId: "",
  },
  setSearch: (search) => set({ search }),
  updateSearch: (partial) =>
    set((state) => ({ search: { ...state.search, ...partial } })),
  resetSearch: () => set({ search: defaultSearch }),
}));
