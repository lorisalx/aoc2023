const input = require('fs').readFileSync('input.txt', 'utf8');

// PART 1
const input1 = require('fs').readFileSync('part1.txt', 'utf8');

let times = [];
let distances = [];

input.split('\n').map(x => {
  if (x.includes('Time')) {
    times = (x.split(':')[1].split(' ').filter(x => x !== '').map(x => parseInt(x)));
  }
  if (x.includes('Distance')) {
    distances = (x.split(':')[1].split(' ').filter(x => x !== '').map(x => parseInt(x)));
  }
})

let possibilities = [];
for (let i = 0; i < times.length; i++) {
  possibilities.push(0);
}
for (let i = 0; i < times.length; i++) {
  for (let j = 0; j < times[i]; j++) {
    let distanceDone = j * (times[i] - j);
    if (distanceDone > distances[i]) {
      possibilities[i] += 1;
    }
  }
}

// multiply all possibilities together
let res = 1;
possibilities.forEach(x => res *= x);

console.log(res);