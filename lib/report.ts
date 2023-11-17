import fs from "fs";
import path from "path";

/**
 * Writes a report to a file in the 'reports' directory. The report contains
 * data from the 'pages' object, sorted by the number of encounters and formatted
 * in a human-readable text format. The filename includes the base URL to indicate
 * the source of the report. The base URL is also included in the report's content.
 *
 * @param {Record<string, number>} pages - An object containing page-related data,
 *                                         where the key is the page identifier and
 *                                         the value is the number of encounters.
 * @param {string} baseURL - The base URL used for the crawling process.
 */
export const printReport = (pages: Record<string, number>, baseURL: string) => {
  console.log("----- Printing Report ------");

  try {
    // Sort the pages by the number of encounters.
    const sortedPages = Object.entries(pages).sort((a, b) => b[1] - a[1]);

    // Format the sorted results into a human-readable string.
    let reportContent = `Crawl Report for ${baseURL}\n\n`;
    sortedPages.forEach(([url, count]) => {
      reportContent += `Found ${count} internal links to ${url}\n`;
    });

    // Create a safe filename from the base URL.
    const safeBaseURL = baseURL.replace(/[^a-z0-9]/gi, "_").toLowerCase();
    const reportFilename = `report_${safeBaseURL}_${Date.now()}.txt`;

    // Ensure the reports directory exists.
    const reportsDir = "./reports";
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir);
    }

    // Write the report to a file in the 'reports' directory.
    fs.writeFileSync(
      path.join(reportsDir, reportFilename),
      reportContent,
      "utf8"
    );
    console.log("----- Report printed successfully! ------");
  } catch (error) {
    console.error(`Error while printing report: ${error}`);
  }
};
