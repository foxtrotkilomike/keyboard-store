export interface IProduct {
  id: number;
  name: string;
  brand: string;
  price: number;
  type: string;
  year: number;
  color: string[];
  keysNumber: string;
  isPopular: boolean;
  isInCart: boolean;
}

export interface IAssets {
  [key: string]: string;
}

export interface IFiltersState {
  range: IRangeObj;
  checkbox: ICheckboxObj;
  boolean: IBooleanObj;
  sorting: SortingOptions;
  searchQuery: string;
  productsInCart: number[];
}

export interface IRangeObj {
  [key: string]: {
    max: number;
    min: number;
  };
}

export interface ICheckboxObj {
  [key: string]: string[];
}

export interface IBooleanObj {
  [key: string]: boolean;
}

export type SortingOptions = "name-decrease" | "name-increase" | "year-decrease" | "year-increase";
