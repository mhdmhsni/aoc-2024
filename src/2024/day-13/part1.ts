import fs from "fs";

const input = fs.readFileSync(__dirname + "/input.txt", "utf-8");

type Equation = {
  a: number;
  b: number;
  c: number;
};

type EquationPair = {
  eq1: Equation;
  eq2: Equation;
};

function solveEquations(equations: EquationPair) {
  const { eq1, eq2 } = equations;
  let smallestSolution = null;

  for (let b = 0; b < 100; b++) {
    const a1 = (eq1.c - eq1.b * b) / eq1.a;
    const a2 = (eq2.c - eq2.b * b) / eq2.a;

    if (Number.isInteger(a1) && Number.isInteger(a2) && a1 === a2) {
      if (
        !smallestSolution ||
        Math.abs(a1) + Math.abs(b) <
          Math.abs(smallestSolution.a) + Math.abs(smallestSolution.b)
      ) {
        smallestSolution = { a: a1, b: b };
      }
    }
  }
  return smallestSolution;
}

function main() {
  console.time("day 13 part 1");
  const equations = input.split("\n\n").map((block) => {
    const lines = block.split("\n");
    const buttonA = lines[0].match(/X\+(\d+), Y\+(\d+)/)!;
    const buttonB = lines[1].match(/X\+(\d+), Y\+(\d+)/)!;
    const prize = lines[2].match(/X=(\d+), Y=(\d+)/)!;
    return {
      eq1: {
        a: parseInt(buttonA[1]),
        b: parseInt(buttonB[1]),
        c: parseInt(prize[1]),
      },
      eq2: {
        a: parseInt(buttonA[2]),
        b: parseInt(buttonB[2]),
        c: parseInt(prize[2]),
      },
    } as EquationPair;
  });

  let r = 0;
  for (const equationPair of equations) {
    const ans = solveEquations(equationPair);
    if (ans) {
      r += ans.a * 3 + ans.b;
    }
  }

  console.log(r);
  console.timeEnd("day 13 part 1");
}

main();
