import * as controller from "../scripts/controller";
import { SortingOptions } from "../scripts/types";
import { describe, test, expect } from "@jest/globals";

const filtersState = {
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
    color: ["gray"],
    keysNumber: [],
  },
  boolean: {
    isPopular: false,
  },
  sorting: "name-decrease" as SortingOptions,
  searchQuery: "",
  productsInCart: [],
};

describe("Controller tests", () => {
  describe("filterSearch tests", () => {
    test("should pass product with search query in its name", () => {
      const queryString = "keychron";
      const products = [
        {
          id: 0,
          name: "Keychron K3 RGB",
          brand: "Keychron",
          price: 180,
          type: "mechanical",
          year: 2021,
          color: ["gray", "black"],
          keysNumber: "87",
          isPopular: true,
          isInCart: false,
        },
        {
          id: 9,
          name: "HyperX Alloy Elite 2",
          brand: "HyperX",
          price: 200,
          type: "membrane",
          year: 2019,
          color: ["black"],
          keysNumber: "104",
          isPopular: false,
          isInCart: false,
        },
      ];

      const resultWithTrue = controller.filterSearch(products[0], queryString);
      expect(resultWithTrue).toBe(true);
    });

    test("should not pass product with search query not beeing part of its name", () => {
      const queryString = "keyboard";
      const products = [
        {
          id: 0,
          name: "Keychron K3 RGB",
          brand: "Keychron",
          price: 180,
          type: "mechanical",
          year: 2021,
          color: ["gray", "black"],
          keysNumber: "87",
          isPopular: true,
          isInCart: false,
        },
        {
          id: 9,
          name: "HyperX Alloy Elite 2",
          brand: "HyperX",
          price: 200,
          type: "membrane",
          year: 2019,
          color: ["black"],
          keysNumber: "104",
          isPopular: false,
          isInCart: false,
        },
      ];

      const resultWithFalse = controller.filterSearch(products[0], queryString);

      expect(resultWithFalse).toBe(false);
    });
  });

  describe("filterRange tests", () => {
    test("should pass product within range parameter", () => {
      const rangeWide = {
        price: {
          min: 0,
          max: 10000,
        },
      };
      const products = [
        {
          id: 0,
          name: "Keychron K3 RGB",
          brand: "Keychron",
          price: 180,
          type: "mechanical",
          year: 2021,
          color: ["gray", "black"],
          keysNumber: "87",
          isPopular: true,
          isInCart: false,
        },
        {
          id: 9,
          name: "HyperX Alloy Elite 2",
          brand: "HyperX",
          price: 200,
          type: "membrane",
          year: 2019,
          color: ["black"],
          keysNumber: "104",
          isPopular: false,
          isInCart: false,
        },
      ];

      const resultWithTrue = controller.filterRange(products[0], rangeWide);

      expect(resultWithTrue).toBe(true);
    });

    test("should not pass product not within range parameter", () => {
      const rangeNarrow = {
        price: {
          min: 200,
          max: 300,
        },
      };
      const products = [
        {
          id: 0,
          name: "Keychron K3 RGB",
          brand: "Keychron",
          price: 180,
          type: "mechanical",
          year: 2021,
          color: ["gray", "black"],
          keysNumber: "87",
          isPopular: true,
          isInCart: false,
        },
        {
          id: 9,
          name: "HyperX Alloy Elite 2",
          brand: "HyperX",
          price: 200,
          type: "membrane",
          year: 2019,
          color: ["black"],
          keysNumber: "104",
          isPopular: false,
          isInCart: false,
        },
      ];

      const resultWithFalse = controller.filterRange(products[0], rangeNarrow);

      expect(resultWithFalse).toBe(false);
    });

    test("should pass product within multiple range parameters", () => {
      const range = {
        price: {
          min: 100,
          max: 250,
        },
        year: {
          min: 2020,
          max: 2022,
        },
      };

      const products = [
        {
          id: 0,
          name: "Keychron K3 RGB",
          brand: "Keychron",
          price: 180,
          type: "mechanical",
          year: 2021,
          color: ["gray", "black"],
          keysNumber: "87",
          isPopular: true,
          isInCart: false,
        },
        {
          id: 9,
          name: "HyperX Alloy Elite 2",
          brand: "HyperX",
          price: 200,
          type: "membrane",
          year: 2019,
          color: ["black"],
          keysNumber: "104",
          isPopular: false,
          isInCart: false,
        },
      ];

      const resultWithTrue = controller.filterRange(products[0], range);

      expect(resultWithTrue).toBe(true);
    });
  });

  describe("filterCheckbox tests", () => {
    test("should pass product when no checkbox checked", () => {
      const checkboxState = {
        brand: [],
      };

      const products = [
        {
          id: 0,
          name: "Keychron K3 RGB",
          brand: "Keychron",
          price: 180,
          type: "mechanical",
          year: 2021,
          color: ["gray", "black"],
          keysNumber: "87",
          isPopular: true,
          isInCart: false,
        },
        {
          id: 9,
          name: "HyperX Alloy Elite 2",
          brand: "HyperX",
          price: 200,
          type: "membrane",
          year: 2019,
          color: ["black"],
          keysNumber: "104",
          isPopular: false,
          isInCart: false,
        },
      ];

      const resultWithTrue = controller.filterCheckbox(products[0], checkboxState);

      expect(resultWithTrue).toBe(true);
    });

    test("should pass product with checkbox checked and correspond with product", () => {
      const checkboxState = {
        brand: ["Keychron", "HyperX"],
      };

      const products = [
        {
          id: 0,
          name: "Keychron K3 RGB",
          brand: "Keychron",
          price: 180,
          type: "mechanical",
          year: 2021,
          color: ["gray", "black"],
          keysNumber: "87",
          isPopular: true,
          isInCart: false,
        },
        {
          id: 9,
          name: "HyperX Alloy Elite 2",
          brand: "HyperX",
          price: 200,
          type: "membrane",
          year: 2019,
          color: ["black"],
          keysNumber: "104",
          isPopular: false,
          isInCart: false,
        },
      ];

      const resultWithTrue = controller.filterCheckbox(products[0], checkboxState);

      expect(resultWithTrue).toBe(true);
    });

    test("should pass product with multiple checkbox checked", () => {
      const checkboxState = {
        brand: ["Keychron", "HyperX"],
        color: ["black", "red"],
      };

      const products = [
        {
          id: 0,
          name: "Keychron K3 RGB",
          brand: "Keychron",
          price: 180,
          type: "mechanical",
          year: 2021,
          color: ["gray", "black"],
          keysNumber: "87",
          isPopular: true,
          isInCart: false,
        },
        {
          id: 9,
          name: "HyperX Alloy Elite 2",
          brand: "HyperX",
          price: 200,
          type: "membrane",
          year: 2019,
          color: ["black"],
          keysNumber: "104",
          isPopular: false,
          isInCart: false,
        },
      ];

      const resultWithTrue = controller.filterCheckbox(products[0], checkboxState);

      expect(resultWithTrue).toBe(true);
    });

    test("should not pass product with checkbox checked and not correspond with product", () => {
      const checkboxState = {
        brand: ["HyperX"],
      };

      const products = [
        {
          id: 0,
          name: "Keychron K3 RGB",
          brand: "Keychron",
          price: 180,
          type: "mechanical",
          year: 2021,
          color: ["gray", "black"],
          keysNumber: "87",
          isPopular: true,
          isInCart: false,
        },
        {
          id: 9,
          name: "HyperX Alloy Elite 2",
          brand: "HyperX",
          price: 200,
          type: "membrane",
          year: 2019,
          color: ["black"],
          keysNumber: "104",
          isPopular: false,
          isInCart: false,
        },
      ];

      const resultWithFalse = controller.filterCheckbox(products[0], checkboxState);

      expect(resultWithFalse).toBe(false);
    });
  });

  describe("filterBoolean tests", () => {
    test("should pass all products when no boolean checkbox checked", () => {
      const checkboxState = {
        isPopular: false,
      };

      const products = [
        {
          id: 0,
          name: "Keychron K3 RGB",
          brand: "Keychron",
          price: 180,
          type: "mechanical",
          year: 2021,
          color: ["gray", "black"],
          keysNumber: "87",
          isPopular: true,
          isInCart: false,
        },
        {
          id: 9,
          name: "HyperX Alloy Elite 2",
          brand: "HyperX",
          price: 200,
          type: "membrane",
          year: 2019,
          color: ["black"],
          keysNumber: "104",
          isPopular: false,
          isInCart: false,
        },
      ];

      const resultFirstTrue = controller.filterBoolean(products[0], checkboxState);
      const resultSecondTrue = controller.filterBoolean(products[1], checkboxState);

      expect(resultFirstTrue).toBe(true);
      expect(resultSecondTrue).toBe(true);
    });

    test("should pass certain products when boolean checkbox checked", () => {
      const checkboxState = {
        isPopular: true,
      };

      const products = [
        {
          id: 0,
          name: "Keychron K3 RGB",
          brand: "Keychron",
          price: 180,
          type: "mechanical",
          year: 2021,
          color: ["gray", "black"],
          keysNumber: "87",
          isPopular: true,
          isInCart: false,
        },
        {
          id: 9,
          name: "HyperX Alloy Elite 2",
          brand: "HyperX",
          price: 200,
          type: "membrane",
          year: 2019,
          color: ["black"],
          keysNumber: "104",
          isPopular: false,
          isInCart: false,
        },
      ];

      const resultFirstTrue = controller.filterBoolean(products[0], checkboxState);
      const resultSecondFalse = controller.filterBoolean(products[1], checkboxState);

      expect(resultFirstTrue).toBe(true);
      expect(resultSecondFalse).toBe(false);
    });
  });

  describe("sortProducts tests", () => {
    test("should sort products by name - decrease", () => {
      const products = [
        {
          id: 0,
          name: "Keychron K3 RGB",
          brand: "Keychron",
          price: 180,
          type: "mechanical",
          year: 2021,
          color: ["gray", "black"],
          keysNumber: "87",
          isPopular: true,
          isInCart: false,
        },
        {
          id: 9,
          name: "HyperX Alloy Elite 2",
          brand: "HyperX",
          price: 200,
          type: "membrane",
          year: 2019,
          color: ["black"],
          keysNumber: "104",
          isPopular: false,
          isInCart: false,
        },
      ];
      const productsToSort = [...products];
      const sortingOption = "name-decrease";

      const resultSorted = controller.sortProducts(productsToSort, sortingOption);

      expect(resultSorted).toEqual([products[1], products[0]]);
    });

    test("should sort products by name - increase", () => {
      const products = [
        {
          id: 0,
          name: "Keychron K3 RGB",
          brand: "Keychron",
          price: 180,
          type: "mechanical",
          year: 2021,
          color: ["gray", "black"],
          keysNumber: "87",
          isPopular: true,
          isInCart: false,
        },
        {
          id: 9,
          name: "HyperX Alloy Elite 2",
          brand: "HyperX",
          price: 200,
          type: "membrane",
          year: 2019,
          color: ["black"],
          keysNumber: "104",
          isPopular: false,
          isInCart: false,
        },
      ];
      const productsToSort = [...products];
      const sortingOption = "name-increase";

      const resultSorted = controller.sortProducts(productsToSort, sortingOption);

      expect(resultSorted).toEqual([products[0], products[1]]);
    });

    test("should sort products by tear - increase", () => {
      const products = [
        {
          id: 0,
          name: "Keychron K3 RGB",
          brand: "Keychron",
          price: 180,
          type: "mechanical",
          year: 2021,
          color: ["gray", "black"],
          keysNumber: "87",
          isPopular: true,
          isInCart: false,
        },
        {
          id: 9,
          name: "HyperX Alloy Elite 2",
          brand: "HyperX",
          price: 200,
          type: "membrane",
          year: 2019,
          color: ["black"],
          keysNumber: "104",
          isPopular: false,
          isInCart: false,
        },
      ];
      const productsToSort = [...products];
      const sortingOption = "year-decrease";

      const resultSorted = controller.sortProducts(productsToSort, sortingOption);

      expect(resultSorted).toEqual([products[0], products[1]]);
    });

    test("should sort products by year - increase", () => {
      const products = [
        {
          id: 0,
          name: "Keychron K3 RGB",
          brand: "Keychron",
          price: 180,
          type: "mechanical",
          year: 2021,
          color: ["gray", "black"],
          keysNumber: "87",
          isPopular: true,
          isInCart: false,
        },
        {
          id: 9,
          name: "HyperX Alloy Elite 2",
          brand: "HyperX",
          price: 200,
          type: "membrane",
          year: 2019,
          color: ["black"],
          keysNumber: "104",
          isPopular: false,
          isInCart: false,
        },
      ];
      const productsToSort = [...products];
      const sortingOption = "year-increase";

      const resultSorted = controller.sortProducts(productsToSort, sortingOption);

      expect(resultSorted).toEqual([products[1], products[0]]);
    });
  });

  describe("filterProducts tests", () => {
    test("should filter (remain) products using filters state", () => {
      const products = [
        {
          id: 0,
          name: "Keychron K3 RGB",
          brand: "Keychron",
          price: 180,
          type: "mechanical",
          year: 2021,
          color: ["gray", "black"],
          keysNumber: "87",
          isPopular: true,
          isInCart: false,
        },
        {
          id: 9,
          name: "HyperX Alloy Elite 2",
          brand: "HyperX",
          price: 200,
          type: "membrane",
          year: 2019,
          color: ["black"],
          keysNumber: "104",
          isPopular: false,
          isInCart: false,
        },
      ];
      const resultWithProduct = controller.filterProducts(products, filtersState);

      expect(resultWithProduct).toEqual(expect.arrayContaining([products[0]]));
    });

    test("should filter (remove) products using filters state", () => {
      const products = [
        {
          id: 0,
          name: "Keychron K3 RGB",
          brand: "Keychron",
          price: 180,
          type: "mechanical",
          year: 2021,
          color: ["gray", "black"],
          keysNumber: "87",
          isPopular: true,
          isInCart: false,
        },
        {
          id: 9,
          name: "HyperX Alloy Elite 2",
          brand: "HyperX",
          price: 200,
          type: "membrane",
          year: 2019,
          color: ["black"],
          keysNumber: "104",
          isPopular: false,
          isInCart: false,
        },
      ];
      const resultWithoutProduct = controller.filterProducts(products, filtersState);

      expect(resultWithoutProduct).not.toEqual(expect.arrayContaining([products[1]]));
    });
  });
});
