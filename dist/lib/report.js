"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printReport = void 0;
const fs_1 = __importDefault(require("fs"));
const printReport = (pages) => {
    console.log("----- Printing Report ------");
    try {
        fs_1.default.writeFileSync(`./reports/${Date.now()}.json`, JSON.stringify(pages), "utf8");
        console.log("----- Report printed succesfully! ------");
    }
    catch (error) {
        console.error(error);
    }
};
exports.printReport = printReport;
