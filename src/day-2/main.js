"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const parseInputFile = () => {
    return fs_1.default.readFileSync('./input.txt', 'utf8');
};
const main = () => {
    const input = parseInputFile();
    const lines = input.split('\n');
    lines.map(line => line.split(/\s+/));
    console.log(lines);
};
