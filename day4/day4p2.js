const input = require('fs').readFileSync('input.txt', 'utf8');

// PART 1
const input1 = require('fs').readFileSync('part1.txt', 'utf8');

const cardMap = new Map();
for (let i = 0; i < 199; i++) {
  cardMap.set(i, 1);
}
console.log(Object.values(cardMap));

let sum = 0;
const part1 = input.split('\n').map(x => {
  const gameIdPart = x.split(':')[0].split(' ');
  const gameId = parseInt(gameIdPart[gameIdPart.length - 1]) - 1;
  const game = x.split(':')[1];
  const winningNumbers = game.split('|')[0].split(' ').filter(x => x !== '');
  const myNumbers = game.split('|')[1].split(' ').filter(x => x !== '');
  const myWinningNumbers = winningNumbers.filter(x => myNumbers.includes(x));
  const replicas = cardMap.get(gameId);
  for (let i = 0; i < replicas; i++) {
    for (let j = 0; j < myWinningNumbers.length; j++) {
      let nextGameId = gameId + j + 1;
      if (nextGameId < 200) {
        cardMap.set(nextGameId, cardMap.get(nextGameId) + 1);
      }
    }
  }
})
for (let i = 0; i < 199; i++) {
  sum += cardMap.get(i);
}
console.log(sum);