const input = require('fs').readFileSync('input.txt', 'utf8');

// PART 1
const input1 = require('fs').readFileSync('part1.txt', 'utf8');

const instructions = input1.split('\n\n')[0].split('');
console.log(instructions)

const paths = {};

const parsePaths = input1.split('\n\n')[1].split('\n').map(x => {
  let path = x.split(' = ')[0];
  let ways = x.split(' = ')[1].split(', ');
  let leftValue = ways[0].replace('(', '');
  let rightValue = ways[1].replace(')', '');
  paths[path] = {leftValue, rightValue};
})

console.log(paths)

const resolvePath = () => {
  let currentPath = 'AAA';
  let count = 0;
  while (currentPath !== 'ZZZ') {
    for (let i = 0; i < instructions.length; i++) {
      count += 1;
      if (instructions[i] === 'L') {
        currentPath = paths[currentPath].leftValue;
      } else if (instructions[i] === 'R') {
        currentPath = paths[currentPath].rightValue;
      }
    }
    if (count % 1000000 === 0) {
      console.log(count)
    }
  }
  return count;
}

console.log(resolvePath())