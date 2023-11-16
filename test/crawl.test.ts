import { describe, expect, test } from "@jest/globals";
import { normalizeURL } from "../lib/crawl";
import { faker } from "@faker-js/faker";

describe("normalizeURL should", () => {
  const mockURL = faker.internet.url();
  test("Should normalize a given URL", () => {
    expect(normalizeURL(mockURL)).toBe(mockURL);
  });
});
