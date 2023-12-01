const input = require('fs').readFileSync('input.txt', 'utf8');
// PART 1
const input1 = require('fs').readFileSync('part1.txt', 'utf8');

const part1 = input1
            .split('\n')
            .map(x => {
              const stringWithOnlyNumbers = x.match(/\d+/g).join('');
              const finalNumber = stringWithOnlyNumbers[0] + stringWithOnlyNumbers[stringWithOnlyNumbers.length - 1];
              return parseInt(finalNumber);
            }
              )
            .reduce((acc, curr) => acc + curr, 0);

console.log(part1);

// PART 2
const input2 = require('fs').readFileSync('part2.txt', 'utf8');

const digits = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

const replaceStringWithNumber = (string) => { 
  let firstDigitFound = false;
  let lastDigitFound = false;
  for (let i = 0; i < string.length; i++) {
    if (string[i] >= '0' && string[i] <= '9') {
      break;
    }
    const miniString = string.slice(0, i + 1);
    for (let j = 0; j < digits.length; j++) {
      if (miniString.includes(digits[j])) {
        miniStringReplaced = miniString.replace(digits[j], j + 1);
        string = miniStringReplaced + string.slice(i + 1, string.length);
        firstDigitFound = true;
      }
    }
    if (firstDigitFound) {
      break;
    }
  }

  for (let i = string.length; i >= 0; i--) {
    if (string[i] >= '0' && string[i] <= '9') {
      break;
    }
    const miniString = string.slice(i, string.length);
    for (let j = 0; j < digits.length; j++) {
      if (miniString.includes(digits[j])) {
        miniStringReplaced = miniString.replace(digits[j], j + 1);
        string = string.slice(0, i) + miniStringReplaced;
        lastDigitFound = true;
      }
    }
    if (lastDigitFound) {
      break;
    }
  }
  return string;
}

const part2 = input
            .split('\n')
            .map(x => {
              const replacedString = replaceStringWithNumber(x);
              const stringWithOnlyNumbers = replacedString.match(/\d+/g).join('');
              const finalNumber = stringWithOnlyNumbers[0] + stringWithOnlyNumbers[stringWithOnlyNumbers.length - 1];
              return parseInt(finalNumber);
            }
              )
            .reduce((acc, curr) => acc + curr, 0);

console.log(part2);

