const input = require('fs').readFileSync('input.txt', 'utf8');

// PART 1
const input1 = require('fs').readFileSync('part1.txt', 'utf8');

const powers = [];

const max = (arr) => {
  return arr.reduce((acc, curr) => Math.max(acc, curr), 0);
}

const part1 = input
            .split('\n')
            .map(x => {
              let game = x.split(':');
              let gameParts = game[1].split(';');
              let redCubes = [];
              let greenCubes = [];
              let blueCubes = [];
              gameParts.forEach(part => {
                let colorParts = part.split(',');
                colorParts.forEach(colorPart => {
                  let color = colorPart.split(' ')[2];
                  let number = colorPart.split(' ')[1];
                  if (color === 'red') {
                    redCubes.push(parseInt(number));
                  }
                  if (color === 'green') {
                    greenCubes.push(parseInt(number));
                  }
                  if (color === 'blue') {
                    blueCubes.push(parseInt(number));
                  }
                })
              })
              let redMax = max(redCubes);
              let greenMax = max(greenCubes);
              let blueMax = max(blueCubes);
              let power = redMax * greenMax * blueMax;
              powers.push(power);
            })

const sum = (arr) => {
  return arr.reduce((acc, curr) => acc + curr, 0);
}

console.log(sum(powers));