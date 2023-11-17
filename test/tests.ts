import { describe, expect, test } from "@jest/globals";

import { faker } from "@faker-js/faker";
import { normalizeURL } from "../lib/normalizeURL";
import { getURLsFromHTML } from "../lib/getURLsfromHTML";

describe("normalizeURL should return the url host", () => {
  const mockURLs = [
    "https://host.test/path/",
    "https://host.test/path",
    "http://host.test/path/",
    "http://host.test/path",
  ];

  test("Should normalize a given URL", () => {
    for (const url of mockURLs) {
      expect(normalizeURL(url)).toBe("host.test/path");
    }
  });

  test("should throw an error for an invalid URL", () => {
    const invalidURL = [faker.string.alphanumeric()];
    for (const url of invalidURL) {
      expect(() => normalizeURL(url)).toThrow("Provided URL is not valid");
    }
  });
});

describe("normalizeURL should return the url host", () => {
  test("Should normalize a given URL", () => {
    const mockedHTML = [
      '<html><body><a href="https://host.test.dev"><span>Go to</span></a></body></html>',
      '<html><body><a href="/path"><span>Go to</span></a></body></html>',
    ];
    for (const html of mockedHTML) {
      getURLsFromHTML(html, "https://host.test.dev");
    }
  });
});
