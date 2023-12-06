const input = require('fs').readFileSync('input.txt', 'utf8');

// PART 1
const input1 = require('fs').readFileSync('part1.txt', 'utf8');

let times = [];
let distances = [];

input.split('\n').map(x => {
  if (x.includes('Time')) {
    times = (x.split(':')[1].split(' ').filter(x => x !== ''));
  }
  if (x.includes('Distance')) {
    distances = (x.split(':')[1].split(' ').filter(x => x !== ''));
  }
})

time = parseInt(times.join(''));
distance = parseInt(distances.join(''));

let possibilities = 0;

for (let j = 0; j < time; j++) {
  let distanceDone = j * (time - j);
  if (distanceDone > distance) {
    possibilities += 1;
  }
}

console.log(possibilities)