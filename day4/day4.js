const input = require('fs').readFileSync('input.txt', 'utf8');

// PART 1
const input1 = require('fs').readFileSync('part1.txt', 'utf8');

let sum = 0;
const part1 = input.split('\n').map(x => {
  const game = x.split(':')[1];
  const winningNumbers = game.split('|')[0].split(' ').filter(x => x !== '');
  const myNumbers = game.split('|')[1].split(' ').filter(x => x !== '');
  const myWinningNumbers = winningNumbers.filter(x => myNumbers.includes(x));
  let score = 0;
  if (myWinningNumbers.length !== 0) {
    score = Math.pow(2,myWinningNumbers.length - 1);
  }
  sum += score;
  console.log(score);
})
  
console.log(sum);