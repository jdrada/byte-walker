import { argv } from "node:process";
import { crawlPage } from "./lib/crawl";
import { printReport } from "./lib/report";

/**
 * The main function of the web crawling application.
 * It expects a single command-line argument: the base URL to start crawling from.
 * The function initiates the crawling process and then generates a report
 * based on the crawled pages.
 */
async function main() {
  // Validate command-line arguments.
  if (argv.length < 3) {
    throw new Error("No website provided.");
  }
  if (argv.length > 3) {
    throw new Error("Too many arguments provided.");
  }

  const baseURL = argv[2];
  console.log(`----- Starting crawl of: ${baseURL} -----`);

  // Start the web crawling process.
  const crawledPages = crawlPage(baseURL);

  // Generate and print the report.
  printReport(await crawledPages, baseURL);
}

main();
