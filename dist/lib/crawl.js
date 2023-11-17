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
const getURLsfromHTML_1 = require("./getURLsfromHTML");
const crawlPage = (baseURL, currentURL = baseURL, pages = {}) => __awaiter(void 0, void 0, void 0, function* () {
    let crawledPages = pages;
    try {
        const baseURLObject = new URL(baseURL);
        const currentURLObject = new URL(currentURL);
        if (baseURLObject.hostname !== currentURLObject.hostname)
            return pages;
        const normalizedCurrentURL = (0, normalizeURL_1.normalizeURL)(currentURL);
        if (pages[normalizedCurrentURL] > 0) {
            pages[normalizedCurrentURL]++;
            return pages;
        }
        if (currentURL === baseURL) {
            pages[normalizedCurrentURL] = 0;
        }
        else {
            pages[normalizedCurrentURL] = 1;
        }
        console.log(`crawling ${currentURL}`);
        const response = yield (0, node_fetch_1.default)(currentURL);
        const contentType = response.headers.get("content-type");
        if (contentType === null || contentType === void 0 ? void 0 : contentType.includes("text/html")) {
            const newURLs = (0, getURLsfromHTML_1.getURLsFromHTML)(yield response.text(), baseURL);
            for (const nextURL of newURLs) {
                crawledPages = yield (0, exports.crawlPage)(baseURL, nextURL, pages);
            }
        }
        else {
            throw new Error("Response is not text/html");
        }
    }
    catch (error) {
        console.log(`Something went wrong! ${error}`);
    }
    return crawledPages;
});
exports.crawlPage = crawlPage;
