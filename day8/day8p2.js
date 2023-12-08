const input = require('fs').readFileSync('input.txt', 'utf8');

// PART 1
const input1 = require('fs').readFileSync('part1.txt', 'utf8');
const instructions = input.split('\n\n')[0].split('');
const pathStrings = input.split('\n\n')[1].split('\n');

const paths = {};
pathStrings.forEach(x => {
  const [path, ways] = x.split(' = ');
  const [leftValue, rightValue] = ways.split(', ').map(w => w.replace('(', '').replace(')', ''));
  paths[path] = { leftValue, rightValue };
});

const lcm = (a, b) => {
  const gcd = (x, y) => (!y ? x : gcd(y, x % y));
  return (a * b) / gcd(a, b);
};

const getCycleLength = (startPath) => {
  let currentPath = startPath;
  let count = 0;
  const seen = new Set();

  while (true) {
    if (seen.has(currentPath)) {
      break;
    }
    seen.add(currentPath);

    for (const dir of instructions) {
      count++;
      currentPath = dir === 'L' ? paths[currentPath].leftValue : paths[currentPath].rightValue;
      if (currentPath.endsWith('Z')) {
        return count;
      }
    }
  }

  return count;
};

const startPaths = Object.keys(paths).filter(p => p.endsWith('A'));
const cycleLengths = startPaths.map(getCycleLength);
const result = cycleLengths.reduce(lcm);

console.log(result);
