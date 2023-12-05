const input = require('fs').readFileSync('input.txt', 'utf8');

// PART 1
const input1 = require('fs').readFileSync('part1.txt', 'utf8');

// find the line in the input where there is "seeds:"
const seeds = input.split('\n').filter(x => x.includes('seeds:'));
console.log(seeds);