import { JSDOM } from "jsdom";

/**
 * Extracts and normalizes all URLs from anchor tags within a given HTML body.
 * This function parses the provided HTML, finds all anchor (`<a>`) elements, and
 * extracts the href attribute from each. It then normalizes these URLs, ensuring
 * they are absolute URLs based on the provided base URL.
 *
 * @param {string} htmlBody - The HTML content as a string from which URLs are to be extracted.
 * @param {string} baseURL - The base URL used to resolve relative URLs to absolute URLs.
 * @returns {string[]} An array of absolute URLs extracted and normalized from the HTML content.
 */
export const getURLsFromHTML = (
  htmlBody: string,
  baseURL: string
): string[] => {
  let absoluteUrls: string[] = [];
  const dom = new JSDOM(htmlBody);
  const aTags = dom.window.document.querySelectorAll("a");

  aTags.forEach((aTag) => {
    // Check if the URL is already absolute; if not, prepend the base URL.
    const url = aTag.href.startsWith(baseURL)
      ? aTag.href
      : new URL(aTag.href, baseURL).href;
    absoluteUrls.push(url);
  });

  return absoluteUrls;
};
