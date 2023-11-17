"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_process_1 = require("node:process");
const crawl_1 = require("./lib/crawl");
const report_1 = require("./lib/report");
/**
 * The main function of the web crawling application.
 * It expects a single command-line argument: the base URL to start crawling from.
 * The function initiates the crawling process and then generates a report
 * based on the crawled pages.
 */
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // Validate command-line arguments.
        if (node_process_1.argv.length < 3) {
            throw new Error("No website provided.");
        }
        if (node_process_1.argv.length > 3) {
            throw new Error("Too many arguments provided.");
        }
        const baseURL = node_process_1.argv[2];
        console.log(`----- Starting crawl of: ${baseURL} -----`);
        // Start the web crawling process.
        const crawledPages = (0, crawl_1.crawlPage)(baseURL);
        // Generate and print the report.
        (0, report_1.printReport)(yield crawledPages, baseURL);
    });
}
main();
