"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.crawlPage = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const normalizeURL_1 = require("./normalizeURL");
const getURLsFromHTML_1 = require("./getURLsFromHTML");
/**
 * Recursively crawls web pages starting from a base URL. It keeps track of the number of visits
 * to each page. The function only crawls pages within the same domain as the base URL and fetches
 * new URLs from the HTML content of each page.
 *
 * @param {string} baseURL - The base URL to start crawling from.
 * @param {string} [currentURL=baseURL] - The current URL being crawled. Defaults to the base URL.
 * @param {PageObjectType} [pages={}] - An object to keep track of the number of visits to each page.
 * @returns {Promise<PageObjectType>} A promise that resolves to an object with the count of visits per page.
 */
const crawlPage = (baseURL, currentURL = baseURL, pages = {}) => __awaiter(void 0, void 0, void 0, function* () {
    let crawledPages = pages;
    try {
        const baseURLObject = new URL(baseURL);
        const currentURLObject = new URL(currentURL);
        // Check if the current URL is from the same domain as the base URL.
        if (baseURLObject.hostname !== currentURLObject.hostname)
            return pages;
        const normalizedCurrentURL = (0, normalizeURL_1.normalizeURL)(currentURL);
        // Increment the count if the page has been visited before, or set it to 1.
        if (pages[normalizedCurrentURL] > 0) {
            pages[normalizedCurrentURL]++;
            return pages;
        }
        else {
            pages[normalizedCurrentURL] = 1;
        }
        console.log(`Crawling ${currentURL}`);
        const response = yield (0, node_fetch_1.default)(currentURL);
        const contentType = response.headers.get("content-type");
        // Process only if the content type is HTML.
        if (contentType === null || contentType === void 0 ? void 0 : contentType.includes("text/html")) {
            const newURLs = (0, getURLsFromHTML_1.getURLsFromHTML)(yield response.text(), baseURL);
            for (const nextURL of newURLs) {
                crawledPages = yield (0, exports.crawlPage)(baseURL, nextURL, pages);
            }
        }
        else {
            console.log("Response is not text/html -- Ommiting");
        }
    }
    catch (error) {
        console.error(`Something went wrong! ${error}`);
    }
    return crawledPages;
});
exports.crawlPage = crawlPage;
