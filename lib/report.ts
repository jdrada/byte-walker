import fs from "fs";

/**
 * Writes a report to a file in the 'reports' directory. The report contains
 * data from the 'pages' object, which is serialized into JSON format. The
 * filename is generated based on the current timestamp to ensure uniqueness.
 *
 * @param {Record<string, number>} pages - An object containing page-related data,
 *                                         where the key is the page identifier and
 *                                         the value is some numeric data (e.g., page views).
 */
export const printReport = (pages: Record<string, number>) => {
  console.log("----- Printing Report ------");
  try {
    // Write the report to a file in the 'reports' directory.
    fs.writeFileSync(
      `./reports/${Date.now()}.json`,
      JSON.stringify(pages),
      "utf8"
    );
    console.log("----- Report printed successfully! ------");
  } catch (error) {
    // Log any errors encountered during file writing.
    console.error(error);
  }
};
