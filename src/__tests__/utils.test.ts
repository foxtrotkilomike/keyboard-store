import { describe, test, expect } from "@jest/globals";
import { JSDOM } from "jsdom";

import * as Utils from "../scripts/utils";

const dom = new JSDOM('<html><body id="root"></body></html>');
global.document = dom.window.document;

describe("Utils tests", () => {
  test("should create element", () => {
    const result = Utils.createElemWithClass("p", "class-name");

    const expectedResult = "P";
    expect(result.tagName).toEqual(expectedResult);
  });

  test("should create element with class", () => {
    const result = Utils.createElemWithClass("p", "class-name");

    const expectedClass = "class-name";
    expect(result.classList.contains(expectedClass)).toBe(true);
  });
});
