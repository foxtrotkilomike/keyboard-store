import { IProduct, IFiltersState, IRangeObj, ICheckboxObj, IBooleanObj, SortingOptions } from "./types";

export function filterProducts(products: IProduct[], filters: IFiltersState): IProduct[] {
  return products.filter((product) => {
    return (
      filterSearch(product, filters.searchQuery) &&
      filterRange(product, filters.range) &&
      filterCheckbox(product, filters.checkbox) &&
      filterBoolean(product, filters.boolean)
    );
  });
}

export function filterSearch(product: IProduct, query: string): boolean {
  return product.name.toLowerCase().includes(query);
}

export function filterRange(product: IProduct, rangeFilters: IRangeObj): boolean {
  const filterKeys = Object.keys(rangeFilters);
  return filterKeys.every((key: string) => {
    return (
      product[key as keyof IProduct] >= rangeFilters[key].min && product[key as keyof IProduct] <= rangeFilters[key].max
    );
  });
}

export function filterCheckbox(product: IProduct, checkboxFilters: ICheckboxObj): boolean {
  const filterKeys = Object.keys(checkboxFilters);
  return filterKeys.every((key: string) => {
    if (!checkboxFilters[key].length) return true;
    // Loops again if product[key] is an array
    if (Array.isArray(product[key as keyof IProduct])) {
      return (product[key as keyof IProduct] as string[]).some((property) => checkboxFilters[key].includes(property));
    }

    return checkboxFilters[key].includes(product[key as keyof IProduct] as string);
  });
}

export function filterBoolean(product: IProduct, booleanFilters: IBooleanObj): boolean {
  const filterKeys = Object.keys(booleanFilters);
  return filterKeys.every((key: string) => {
    if (booleanFilters[key] === false) {
      return true;
    }

    return product[key as keyof IProduct] === booleanFilters[key];
  });
}

function sortItem(itemA: string | number, itemB: string | number, sortingOption: "increase" | "decrease"): -1 | 1 | 0 {
  if (itemA < itemB) {
    return {
      increase: 1 as 1,
      decrease: -1 as -1,
    }[sortingOption];
  }
  if (itemA > itemB) {
    return {
      increase: -1 as -1,
      decrease: 1 as 1,
    }[sortingOption];
  }

  return 0;
}

export function sortProducts(products: IProduct[], option: SortingOptions) {
  return products.sort((productA, productB) => {
    return {
      "name-decrease": sortItem(productA.name, productB.name, "decrease"),
      "name-increase": sortItem(productA.name, productB.name, "increase"),
      "year-decrease": sortItem(productA.year, productB.year, "increase"),
      "year-increase": sortItem(productA.year, productB.year, "decrease"),
    }[option];
  });
}
