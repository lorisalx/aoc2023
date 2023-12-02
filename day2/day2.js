const input = require('fs').readFileSync('input.txt', 'utf8');

// PART 1
const input1 = require('fs').readFileSync('part1.txt', 'utf8');

const impossibleGameIds = [];
const part1 = input
            .split('\n')
            .map(x => {
              let game = x.split(':');
              let gameId = game[0].split(' ')[1];
              let gameParts = game[1].split(';');
              let gameIsPossible = false;
              gameParts.forEach(part => {
                let colorParts = part.split(',');
                colorParts.forEach(colorPart => {
                  let color = colorPart.split(' ')[2];
                  let number = colorPart.split(' ')[1];
                  if ((color === 'red' && number > 12) || (color === 'green' && number > 13) || (color === 'blue' && number > 14)) {
                    console.log(gameId, color, number)
                    impossibleGameIds.push(parseInt(gameId));
                    gameIsPossible = true;
                  }
                })
              })
            })

            console.log(impossibleGameIds);
const sum = (arr) => {
  return arr.reduce((acc, curr) => acc + curr, 0);
}

const uniqueGameIds = impossibleGameIds.filter((value, index, self) => self.indexOf(value) === index);
const possibleGameIds = [...Array(100).keys()].map(x => x + 1).filter(x => !uniqueGameIds.includes(x));
console.log(possibleGameIds);
console.log(sum(possibleGameIds));