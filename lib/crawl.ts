import fetch from "node-fetch";
import { normalizeURL } from "./normalizeURL";
import { getURLsFromHTML } from "./getURLsFromHTML";

type PageObjectType = Record<string, number>;

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
export const crawlPage = async (
  baseURL: string,
  currentURL: string = baseURL,
  pages: PageObjectType = {}
): Promise<PageObjectType> => {
  let crawledPages = pages;
  try {
    const baseURLObject = new URL(baseURL);
    const currentURLObject = new URL(currentURL);

    // Check if the current URL is from the same domain as the base URL.
    if (baseURLObject.hostname !== currentURLObject.hostname) return pages;

    const normalizedCurrentURL = normalizeURL(currentURL);

    // Increment the count if the page has been visited before, or set it to 1.
    if (pages[normalizedCurrentURL] > 0) {
      pages[normalizedCurrentURL]++;
      return pages;
    } else {
      pages[normalizedCurrentURL] = 1;
    }

    console.log(`Crawling ${currentURL}`);
    const response = await fetch(currentURL);
    const contentType = response.headers.get("content-type");

    // Process only if the content type is HTML.
    if (contentType?.includes("text/html")) {
      const newURLs = getURLsFromHTML(await response.text(), baseURL);
      for (const nextURL of newURLs) {
        crawledPages = await crawlPage(baseURL, nextURL, pages);
      }
    } else {
      console.log("Response is not text/html -- Ommiting");
    }
  } catch (error) {
    console.error(`Something went wrong! ${error}`);
  }
  return crawledPages;
};
