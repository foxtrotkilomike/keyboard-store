export const createElemWithClass = (tagName: string, ...classNames: string[]): HTMLElement => {
  const newElement = document.createElement(tagName);
  newElement.classList.add(...classNames);

  return newElement;
};
