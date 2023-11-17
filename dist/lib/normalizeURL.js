"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeURL = void 0;
const normalizeURL = (url) => {
    try {
        const urlObject = new URL(url);
        let path = urlObject.pathname;
        if (path.endsWith("/")) {
            path = path.slice(0, -1);
        }
        return urlObject.host + path;
    }
    catch (error) {
        throw new Error("Provided URL is not valid.");
    }
};
exports.normalizeURL = normalizeURL;
