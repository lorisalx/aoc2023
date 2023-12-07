const input = require('fs').readFileSync('input.txt', 'utf8');

// PART 1
const input1 = require('fs').readFileSync('part1.txt', 'utf8');

/* SCORE SYSTEM
HIGH CARD = 0
ONE PAIR = 100
TWO PAIR = 200
THREE OF A KIND = 300
FULL HOUSE = 400
FOUR OF A KIND = 500
FIVE OF A KIND = 600
*/

function computeScore(cards) {
  let score = 0;
  let cardArray = cards.split('');
  for (let i = 0; i < cardArray.length; i++) {
    cardArray[i] = transformCard(cardArray[i]);
  }
  let cardCount = {};
  for (let i = 0; i < cardArray.length; i++) {
    if (cardCount[cardArray[i]]) {
      cardCount[cardArray[i]] += 1;
    } else {
      cardCount[cardArray[i]] = 1;
    }
  }

  let values = Object.values(cardCount);
  values.sort((a, b) => b - a);

  if (values[0] === 5) {    
    score += 60000000000;
  } else if (values[0] === 4) {
    score += 50000000000;
  } else if (values[0] === 3 && values[1] === 2) {
    score += 40000000000;
  } else if (values[0] === 3 && values[1] === 1) {
    score += 30000000000;
  } else if (values[0] === 2 && values[1] === 2) {
    score += 20000000000;
  } else if (values[0] === 2 && values[1] === 1) {
    score += 10000000000;
  } 

  score += cardArray[0] * 100000000;
  score += cardArray[1] * 1000000;
  score += cardArray[2] * 10000;
  score += cardArray[3] * 100;
  score += cardArray[4] * 1;
  return score;
}

function transformCard(card) {
  if (card === 'T') {
    return 10;
  } else if (card === 'J') {
    return 11;
  } else if (card === 'Q') {
    return 12;
  } else if (card === 'K') {
    return 13;
  } else if (card === 'A') {
    return 14;
  } else {
    return parseInt(card);
  }
}

let games = [];
const part1 = input.split('\n').map(x => {
  let [cards, bid] = x.split(' ');
  bid = parseInt(bid);
  const score = computeScore(cards);
  games.push({ cards, bid, score });
})

// Order games by score
games.sort((a, b) => a.score - b.score);
console.log(games);

let totalScore = 0;

for (let i = 0; i < games.length; i++) {
  totalScore += games[i].bid * (i+1);
}

console.log(totalScore);