import { argv } from "node:process";
import { crawlPage } from "./lib/crawl";
import { printReport } from "./lib/report";

async function main() {
  if (argv.length < 3) throw new Error("No website provided.");
  if (argv.length > 3) throw new Error("Too many arguments provided.");
  const baseURL = argv[2];
  console.log(`----- Starting crawl of: ${baseURL} -----`);
  const crawledPages = crawlPage(baseURL);
  printReport(await crawledPages);
}
main();
