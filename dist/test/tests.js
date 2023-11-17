"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const getURLsfromHTML_1 = require("../lib/getURLsfromHTML");
const faker_1 = require("@faker-js/faker");
const normalizeURL_1 = require("../lib/normalizeURL");
(0, globals_1.describe)("normalizeURL should return the url host", () => {
    const mockURLs = [
        "https://host.test/path/",
        "https://host.test/path",
        "http://host.test/path/",
        "http://host.test/path",
    ];
    (0, globals_1.test)("Should normalize a given URL", () => {
        for (const url of mockURLs) {
            (0, globals_1.expect)((0, normalizeURL_1.normalizeURL)(url)).toBe("host.test/path");
        }
    });
    (0, globals_1.test)("should throw an error for an invalid URL", () => {
        const invalidURL = [faker_1.faker.string.alphanumeric()];
        for (const url of invalidURL) {
            (0, globals_1.expect)(() => (0, normalizeURL_1.normalizeURL)(url)).toThrow("Provided URL is not valid");
        }
    });
});
(0, globals_1.describe)("normalizeURL should return the url host", () => {
    (0, globals_1.test)("Should normalize a given URL", () => {
        const mockedHTML = [
            '<html><body><a href="https://host.test.dev"><span>Go to</span></a></body></html>',
            '<html><body><a href="/path"><span>Go to</span></a></body></html>',
        ];
        for (const html of mockedHTML) {
            (0, getURLsfromHTML_1.getURLsFromHTML)(html, "https://host.test.dev");
        }
    });
});
