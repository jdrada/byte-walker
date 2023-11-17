import fetch from "node-fetch";
import { normalizeURL } from "./normalizeURL";
import { getURLsFromHTML } from "./getURLsFromHTML";

type PageObjectType = Record<string, number>;

export const crawlPage = async (
  baseURL: string,
  currentURL: string = baseURL,
  pages: PageObjectType = {}
): Promise<PageObjectType> => {
  let crawledPages = pages;
  try {
    const baseURLObject = new URL(baseURL);
    const currentURLObject = new URL(currentURL);

    if (baseURLObject.hostname !== currentURLObject.hostname) return pages;

    const normalizedCurrentURL = normalizeURL(currentURL!);

    if (pages[normalizedCurrentURL] > 0) {
      pages[normalizedCurrentURL]++;
      return pages;
    }

    if (currentURL === baseURL) {
      pages[normalizedCurrentURL] = 0;
    } else {
      pages[normalizedCurrentURL] = 1;
    }

    console.log(`crawling ${currentURL}`);
    const response = await fetch(currentURL);
    const contentType = response.headers.get("content-type");

    if (contentType?.includes("text/html")) {
      const newURLs = getURLsFromHTML(await response.text(), baseURL);
      for (const nextURL of newURLs) {
        crawledPages = await crawlPage(baseURL, nextURL, pages);
      }
    } else {
      throw new Error("Response is not text/html");
    }
  } catch (error) {
    console.log(`Something went wrong! ${error}`);
  }
  return crawledPages;
};
