"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const parseInputFile = () => {
    return fs_1.default.readFileSync('./input.txt', 'utf8');
};
const sortAscending = (array) => {
    return array.sort((a, b) => a - b);
};
const separateLeftAndRightLists = (parsedInputFile) => {
    const leftList = [];
    const rightList = [];
    const lines = parsedInputFile.split('\n');
    lines.forEach(line => {
        // split the line by spaces in between, push the left side value into `leftList` and right side value into `rightList`
        const [left, right] = line.split(/\s+/);
        leftList.push(parseInt(left, 10));
        rightList.push(parseInt(right, 10));
    });
    return { leftList, rightList };
};
const findTheDistances = (leftList, rightList) => {
    const sortedLeftList = sortAscending(leftList);
    const sortedRightList = sortAscending(rightList);
    const distances = [];
    for (let i = 0; i < sortedLeftList.length; i++) {
        const left = sortedLeftList[i];
        const right = sortedRightList[i];
        // calculate the distance
        distances.push(Math.abs(left - right));
    }
    return distances.reduce((a, b) => a + b);
};
const calculateTheSimilarityScore = (leftList, rightList) => {
    const numberOfAppearances = [];
    for (let i = 0; i < leftList.length; i++) {
        const currentNumber = leftList[i];
        let count = 0;
        rightList.forEach((item) => {
            if (item === currentNumber)
                count++;
        });
        numberOfAppearances.push(currentNumber * count);
    }
    return numberOfAppearances.reduce((a, b) => a + b);
};
const main = () => {
    const inputFile = parseInputFile();
    const { leftList, rightList } = separateLeftAndRightLists(inputFile);
    const distances = findTheDistances(leftList, rightList);
    const similarityScore = calculateTheSimilarityScore(leftList, rightList);
    console.log("The total distances: ", distances);
    console.log("The similarity score: ", similarityScore);
};
main();
