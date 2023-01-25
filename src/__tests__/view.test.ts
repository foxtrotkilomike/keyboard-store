import { describe, test, expect } from "@jest/globals";
import { JSDOM } from "jsdom";

import * as View from "../scripts/view";

describe("View tests", () => {
  beforeEach((done) => {
    JSDOM.fromFile("src/index.html")
      .then((dom) => {
        global.document = dom.window.document;
      })
      .then(done, done);
  });

  describe("renderEmptyProductContainer tests", () => {
    test("should create 'p' element", () => {
      const productsContainer = document.querySelector("#products-list") as HTMLUListElement;
      View.renderEmptyProductContainer(productsContainer);

      expect(document.querySelectorAll("#products-list p")?.length).toBe(1);
    });

    test("should add class name to 'p' element", () => {
      const productsContainer = document.querySelector("#products-list") as HTMLUListElement;
      View.renderEmptyProductContainer(productsContainer);

      const expectedClass = "empty-substitute";
      expect(document.querySelector("#products-list p")?.classList.contains(expectedClass)).toBe(true);
    });

    test("should add substitute text to 'p' element", () => {
      const productsContainer = document.querySelector("#products-list") as HTMLUListElement;
      View.renderEmptyProductContainer(productsContainer);

      const expectedResult = "Sorry, nothing was found";
      expect(document.querySelector("#products-list p")?.textContent).toBe(expectedResult);
    });
  });

  describe("clearContainer tests", () => {
    test("should clear contaier", () => {
      const productsContainer = document.querySelector("#products-list") as HTMLUListElement;
      const liElement = document.createElement("li");
      productsContainer.append(liElement);
      View.clearContainer(productsContainer);

      expect(productsContainer.innerHTML).toEqual("");
    });
  });

  describe("createCardListItem tests", () => {
    test("should create 'li' element", () => {
      const productsContainer = document.querySelector("#products-list") as HTMLUListElement;
      View.createCardListItem("class-name", "description", productsContainer);

      expect(document.querySelectorAll("#products-list li")?.length).toBe(1);
    });

    test("should add class name to 'li' element", () => {
      const productsContainer = document.querySelector("#products-list") as HTMLUListElement;
      View.createCardListItem("class-name", "description", productsContainer);

      const expectedClass = "class-name";
      expect(document.querySelector("#products-list li")?.classList.contains(expectedClass)).toBe(true);
    });

    test("should add discription text to 'li' element", () => {
      const productsContainer = document.querySelector("#products-list") as HTMLUListElement;
      View.createCardListItem("class-name", "description", productsContainer);

      const expectedResult = "description";
      expect(document.querySelector("#products-list li")?.textContent).toBe(expectedResult);
    });
  });
});
