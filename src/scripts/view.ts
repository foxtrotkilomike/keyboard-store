import { IProduct } from "./types";
import { createElemWithClass } from "./utils";
import { imageAssets } from "./imageAssets";
import textConfig from "./textConfig";

export function createProductCards(allProducts: IProduct[]) {
  const productElements: HTMLElement[] = [];
  allProducts.forEach((product) => {
    const productItem = createProductCard(product);
    productElements.push(productItem);
  });

  return productElements;
}

export function renderProductCards(
  sortedProducts: IProduct[],
  productElements: HTMLElement[],
  container: HTMLUListElement
) {
  sortedProducts.forEach((product: IProduct) => {
    const productItem = productElements[product.id] as HTMLElement;
    const productCard = productItem.querySelector(".product-card") as HTMLElement;
    if (product.isInCart) {
      productCard.classList.add("product-card--in-cart");
    } else {
      productCard.classList.remove("product-card--in-cart");
    }
    container.append(productItem);
  });
}

export function renderEmptyProductContainer(container: HTMLUListElement) {
  const emptySubstituteBlock = createElemWithClass("p", "empty-substitute");
  emptySubstituteBlock.textContent = textConfig.nothingFound;
  container.append(emptySubstituteBlock);
}

export function createProductCard(product: IProduct): HTMLElement {
  const listItem = createElemWithClass("li", "products-list__item");
  const productCard = createElemWithClass("article", "product-card");
  productCard.id = String(product.id);

  if (product.isPopular) {
    const productTop = createCardTopSticker();
    productCard.append(productTop);
  }

  const productImageContainer = createCardImage(product);
  productCard.append(productImageContainer);

  const productDescription = createCardDescription(product);
  productCard.append(productDescription);

  const productFooter = createCardFooter(product);
  productCard.append(productFooter);

  listItem.append(productCard);

  return listItem;
}

export function clearContainer(container: HTMLElement) {
  container.innerHTML = "";
}

export function createCardTopSticker(): HTMLElement {
  const productTop = createElemWithClass("div", "product-top", "product-top--active");
  const productTopSticker = createImageElement(imageAssets.upArrow, textConfig.topProduct);
  productTop.append(productTopSticker);
  return productTop;
}

export function createCardImage(product: IProduct): HTMLElement {
  const productImageContainer = createElemWithClass("div", "product-card__image");
  const productImage = createImageElement(imageAssets[product.id], product.name);
  productImageContainer.append(productImage);
  return productImageContainer;
}

export function createCardDescription(product: IProduct): HTMLElement {
  const productDescription = createElemWithClass("div", "product-card__description");
  const productHeading = createElemWithClass("h3", "product-name");
  productHeading.textContent = product.name;
  productDescription.append(productHeading);

  const productSpecsList = createElemWithClass("ul", "product-specs");
  productDescription.append(productSpecsList);

  createCardListItem("product-specs__item", `${product.type} keyboard`, productSpecsList);
  createCardListItem("product-specs__item", `${product.keysNumber} keys`, productSpecsList);
  createCardListItem("product-specs__item", `${product.year} model`, productSpecsList);

  return productDescription;
}

export function createCardListItem(className: string, textContent: string, container: HTMLElement) {
  const listItem = createElemWithClass("li", className);
  listItem.textContent = textContent;
  container.append(listItem);
}

export function createCardFooter(product: IProduct): HTMLElement {
  const productFooter = createElemWithClass("div", "product-card__footer");
  const productPrice = createElemWithClass("div", "product__price");
  productPrice.innerHTML = `$${product.price}`;
  productFooter.append(productPrice);

  const addCartButton = createElemWithClass("button", "button-add-cart", "button");
  const addCartImg = createImageElement(imageAssets.shoppingCart, textConfig.addCartButton, "button-add-cart__svg");
  addCartButton.append(addCartImg);
  productFooter.append(addCartButton);

  return productFooter;
}

export function createImageElement(src: string, alt: string, className?: string) {
  const imageElement = document.createElement("img");
  imageElement.src = src;
  imageElement.alt = alt;
  if (!className) {
    imageElement.classList.add(className as string);
  }

  return imageElement;
}
