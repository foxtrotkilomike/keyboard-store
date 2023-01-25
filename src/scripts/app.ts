import keyboardData from "../keyboards.json";
import { filtersStateInit } from "./filtersState";
import * as Filter from "./controller";
import * as Render from "./view";
import { IProduct, IFiltersState, SortingOptions } from "./types";
import textConfig from "./textConfig";

const CART_ITEMS_LIMIT = 20;

const allProducts: IProduct[] = keyboardData.keyboards;
let filteredProducts: IProduct[] = allProducts;
let sortedProducts: IProduct[] = allProducts;
let filtersState: IFiltersState = { ...filtersStateInit };
const productCards: HTMLElement[] = Render.createProductCards(allProducts);

const sortingSelectElement = document.querySelector("#sorting") as HTMLSelectElement;
const resetFiltersButton = document.querySelector(".button-reset__filters") as HTMLButtonElement;
const resetLocalStorageButton = document.querySelector(".button-reset__storage") as HTMLButtonElement;
const inputSearchElement = document.querySelector(".input-search") as HTMLInputElement;
const inputRangeElements = document.querySelectorAll(".input-range") as NodeListOf<HTMLInputElement>;
const inputCheckboxElements = document.querySelectorAll(".input-checkbox") as NodeListOf<HTMLInputElement>;
const inputCheckboxSingleElements = document.querySelectorAll(
  ".input-checkbox-boolean"
) as NodeListOf<HTMLInputElement>;
const cartItemsCount = document.querySelector(".cart__items-count") as HTMLDivElement;
const productsContainer = document.querySelector("#products-list") as HTMLUListElement;

export function start() {
  const filtersStateRestored = getLocalStorage();
  if (filtersStateRestored) {
    filtersState = filtersStateRestored;
    setProductsInCart(filtersState);
    setInputElements(filtersState);
    filteredProducts = filterProducts(allProducts, filtersState);
    sortedProducts = sortProducts(filteredProducts, filtersState);
  }

  renderProducts(sortedProducts, productCards, productsContainer);
  addListeners(
    resetButtonHandler,
    resetLocalStorageFilters,
    inputSearchHandler,
    inputRangeHandler,
    inputCheckboxHandler,
    inputBooleanHandler,
    sortingHandler,
    addToCart
  );
}

function addListeners(
  resetButtonCallback: () => void,
  resetLocalStorageCallback: () => void,
  searchCallback: (event: Event) => void,
  rangeCallback: (event: Event) => void,
  checkboxCallback: (event: Event) => void,
  checkboxSingleCallback: (event: Event) => void,
  sortingCallback: (event: Event) => void,
  addToCartHandler: (event: Event) => void
) {
  resetFiltersButton.addEventListener("click", resetButtonCallback);
  resetLocalStorageButton.addEventListener("click", resetLocalStorageCallback);
  inputSearchElement.addEventListener("input", searchCallback);
  inputRangeElements.forEach((element) => element.addEventListener("input", rangeCallback));
  inputCheckboxElements.forEach((element) => element.addEventListener("change", checkboxCallback));
  inputCheckboxSingleElements.forEach((element) => element.addEventListener("change", checkboxSingleCallback));
  sortingSelectElement.addEventListener("input", sortingCallback);
  productCards.forEach((productCard) => {
    const cartButton = productCard.querySelector(".button-add-cart") as HTMLButtonElement;
    cartButton.addEventListener("click", addToCartHandler);
  });
}

function resetButtonHandler() {
  inputRangeElements.forEach((element) => (element.value = element.max));
  inputCheckboxElements.forEach((element) => (element.checked = false));
  inputCheckboxSingleElements.forEach((element) => (element.checked = false));
  // save products in cart and reset other filters
  const filtersStateCart = filtersState.productsInCart;
  filtersState = { ...filtersStateInit };
  filtersState.productsInCart = filtersStateCart;
  filteredProducts = allProducts;
  refreshDepictedProducts();
}

function inputSearchHandler(event: Event) {
  event.preventDefault();
  const query: string = (event.target as HTMLInputElement).value;
  filtersState.searchQuery = query.toLowerCase();
  filteredProducts = filterProducts(allProducts, filtersState);
  refreshDepictedProducts();
}

function inputRangeHandler(event: Event) {
  const name: string = (event.target as HTMLInputElement).name;
  const min = parseInt((event.target as HTMLInputElement).min);
  const max = parseInt((event.target as HTMLInputElement).value);
  filtersState.range[name].min = min;
  filtersState.range[name].max = max;
  filteredProducts = filterProducts(allProducts, filtersState);
  refreshDepictedProducts();
}

function inputCheckboxHandler(event: Event) {
  const name: string = (event.target as HTMLInputElement).name;
  const prop: string = (event.target as HTMLInputElement).dataset.name as string;
  if ((event.target as HTMLInputElement).checked) {
    filtersState.checkbox[name].push(prop);
  } else {
    filtersState.checkbox[name] = filtersState.checkbox[name].filter((property) => {
      return property !== prop;
    });
  }
  filteredProducts = filterProducts(allProducts, filtersState);
  refreshDepictedProducts();
}

function inputBooleanHandler(event: Event) {
  const name: string = (event.target as HTMLInputElement).name;
  if ((event.target as HTMLInputElement).checked) {
    filtersState.boolean[name] = true;
  } else {
    filtersState.boolean[name] = false;
  }
  filteredProducts = filterProducts(allProducts, filtersState);
  refreshDepictedProducts();
}

function sortingHandler(event: Event) {
  filtersState.sorting = (event.target as HTMLSelectElement).value as SortingOptions;
  refreshDepictedProducts();
}

function filterProducts(allProducts: IProduct[], filtersState: IFiltersState) {
  return Filter.filterProducts(allProducts, filtersState);
}

function sortProducts(filteredProducts: IProduct[], filtersState: IFiltersState) {
  return Filter.sortProducts(filteredProducts, filtersState.sorting);
}

function renderProducts(sortedProducts: IProduct[], productCards: HTMLElement[], productsContainer: HTMLUListElement) {
  Render.clearContainer(productsContainer);
  if (sortedProducts.length === 0) {
    Render.renderEmptyProductContainer(productsContainer);
  } else {
    Render.renderProductCards(sortedProducts, productCards, productsContainer);
  }
}

function setLocalStorage(filtersState: IFiltersState) {
  const filters = JSON.stringify(filtersState);
  localStorage.setItem("filters", filters);
}

function getLocalStorage(): IFiltersState | null {
  const filters = localStorage.getItem("filters");
  if (filters) {
    return JSON.parse(filters);
  }

  return null;
}

function resetLocalStorageFilters() {
  localStorage.removeItem("filters");
  alert(textConfig.storageReset);
}

function setInputElements(filtersState: IFiltersState) {
  const selectableOptions: NodeListOf<HTMLOptionElement> = sortingSelectElement.querySelectorAll("option");
  selectableOptions.forEach((element) => {
    if (element.value === filtersState.sorting) element.selected = true;
  });

  inputRangeElements.forEach((element) => {
    const rangeCategory = element.name as keyof typeof filtersState.range;
    element.value = filtersState.range[rangeCategory].max.toString();
  });

  inputCheckboxElements.forEach((element) => {
    const name = element.name;
    const prop = element.dataset.name as string;
    if (filtersState.checkbox[name].includes(prop)) {
      element.checked = true;
    } else {
      element.checked = false;
    }
  });

  inputCheckboxSingleElements.forEach((element) => {
    const name = element.name;
    if (filtersState.boolean[name]) {
      element.checked = true;
    } else {
      element.checked = false;
    }
  });
}

function addToCart(event: Event) {
  const button = event.target as HTMLButtonElement;
  const cardContainer = button.closest(".product-card") as HTMLElement;
  const productId = parseInt(cardContainer.id);
  if (cardContainer.classList.contains("product-card--in-cart")) {
    cardContainer.dataset.isInCart = "false";
    cardContainer.classList.remove("product-card--in-cart");
    allProducts[productId].isInCart = false;
    filtersState.productsInCart = filtersState.productsInCart.filter((element) => element !== productId);
  } else if (filtersState.productsInCart.length < CART_ITEMS_LIMIT) {
    cardContainer.dataset.isInCart = "true";
    cardContainer.classList.add("product-card--in-cart");
    allProducts[productId].isInCart = true;
    filtersState.productsInCart.push(productId);
  } else {
    alert(`The limit of products in cart was reached (${CART_ITEMS_LIMIT} items)`);
  }
  cartItemsCount.innerHTML = String(filtersState.productsInCart.length);
  setLocalStorage(filtersState);
}

function setProductsInCart(filtersState: IFiltersState) {
  allProducts.forEach((product) => {
    if (filtersState.productsInCart.includes(product.id)) {
      product.isInCart = true;
    }
  });
  cartItemsCount.innerHTML = String(filtersState.productsInCart.length);
}

function refreshDepictedProducts() {
  sortedProducts = sortProducts(filteredProducts, filtersState);
  renderProducts(sortedProducts, productCards, productsContainer);
  setLocalStorage(filtersState);
}
