import fs from "fs";
export const printReport = (pages: Record<string, number>) => {
  console.log("----- Printing Report ------");
  try {
    fs.writeFileSync(
      `./reports/${Date.now()}.json`,
      JSON.stringify(pages),
      "utf8"
    );
    console.log("----- Report printed succesfully! ------");
  } catch (error) {
    console.error(error);
  }
};
