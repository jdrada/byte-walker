"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getURLsFromHTML = void 0;
const jsdom_1 = require("jsdom");
const getURLsFromHTML = (htmlBody, baseURL) => {
    let absoluteUrls = [];
    const dom = new jsdom_1.JSDOM(htmlBody);
    const aTags = dom.window.document.querySelectorAll("a");
    aTags.forEach((aTag) => {
        if (aTag.href.startsWith(baseURL))
            absoluteUrls.push(aTag.href);
        else
            absoluteUrls.push(baseURL + aTag.href);
    });
    return absoluteUrls;
};
exports.getURLsFromHTML = getURLsFromHTML;
