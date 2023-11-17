import { JSDOM } from "jsdom";

export const getURLsFromHTML = (
  htmlBody: string,
  baseURL: string
): string[] => {
  let absoluteUrls: string[] = [];
  const dom = new JSDOM(htmlBody);
  const aTags = dom.window.document.querySelectorAll("a");
  aTags.forEach((aTag) => {
    if (aTag.href.startsWith(baseURL)) absoluteUrls.push(aTag.href);
    else absoluteUrls.push(baseURL + aTag.href);
  });
  return absoluteUrls;
};
