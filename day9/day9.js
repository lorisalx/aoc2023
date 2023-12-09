const { parse } = require('path');

const input = require('fs').readFileSync('input.txt', 'utf8');

// PART 1
const input1 = require('fs').readFileSync('part1.txt', 'utf8');


const lines = input.split('\n').map(x =>  x.split(' ').map(y => parseInt(y)));
let extrapolateNumbers = [];
for (let i = 0; i < lines.length; i++) {
  let line = lines[i];
  let differences = [];
  let currentDiff = line;
  while (true) {
    let diffStep = [];
    for (let j = 0; j < currentDiff.length - 1; j++) {
      diffStep.push(currentDiff[j+1] - currentDiff[j]);
    }
    differences.push(diffStep);
    if (diffStep.every(x => x === 0)) {
      break;
    }
    else {
      currentDiff = diffStep;
    }
  }
  let extrapolateNumber = 0;
  for (let k = differences.length - 1; k >= 0; k--) {
    extrapolateNumber += differences[k][differences[k].length - 1];
  }
  extrapolateNumber += line[line.length - 1];
  extrapolateNumbers.push(extrapolateNumber);
}

console.log(extrapolateNumbers.reduce((a, b) => a + b));
