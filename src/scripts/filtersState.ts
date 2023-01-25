import { IFiltersState } from "./types";

export const filtersStateInit: IFiltersState = {
  range: {
    price: {
      min: 0,
      max: 10000,
    },
    year: {
      min: 2010,
      max: 2022,
    },
  },
  checkbox: {
    brand: [],
    color: [],
    keysNumber: [],
  },
  boolean: {
    isPopular: false,
  },
  sorting: "name-decrease",
  searchQuery: "",
  productsInCart: [],
};
