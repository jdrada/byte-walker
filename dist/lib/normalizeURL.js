"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeURL = void 0;
/**
 * Normalizes a URL by removing the trailing slash from the pathname if it exists.
 * This function constructs a URL object from the given string and then processes
 * the pathname to ensure it does not end with a slash. It then returns a string
 * combining the host and the processed pathname.
 *
 * @param {string} url - The URL to be normalized.
 * @returns {string} The normalized URL, combining the host and the pathname without a trailing slash.
 * @throws {Error} Throws an error if the provided string is not a valid URL.
 */
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
