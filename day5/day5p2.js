const input = require('fs').readFileSync('input.txt', 'utf8');

// PART 1
const input1 = require('fs').readFileSync('part1.txt', 'utf8');

let seeds = [];
let seedToSoil = [];
let soilToFertilizer = [];
let fertilizerToWater = [];
let waterToLight = [];
let lightToTemperature = [];
let temperatureToHumidity = [];
let humidityToLocation = [];

function saveValues(x, array) {
  let saveValuesMapValues = x.split(':')[1].split('\n').filter(x => x !== '');
  saveValuesMapValues = saveValuesMapValues.map(x => x.split(' ').filter(x => x !== '').map(x => parseInt(x)));
  saveValuesMapValues.forEach(x => {
    array.push(x);
  });
}
const part1 = input.split('\n\n').map(x=> {
  if (x.includes('seeds:')) {
    seeds = x.split(':')[1].split(' ').filter(x => x !== '').map(x => parseInt(x));
  }
  if (x.includes('seed-to-soil')) {
    saveValues(x, seedToSoil);
  }
  if (x.includes('soil-to-fertilizer')) {
    saveValues(x, soilToFertilizer);
  }
  if (x.includes('fertilizer-to-water')) {
    saveValues(x, fertilizerToWater);
  }
  if (x.includes('water-to-light')) {
    saveValues(x, waterToLight);
  }
  if (x.includes('light-to-temperature')) {
    saveValues(x, lightToTemperature);
  }
  if (x.includes('temperature-to-humidity')) {
    saveValues(x, temperatureToHumidity);
  }
  if (x.includes('humidity-to-location')) {
    saveValues(x, humidityToLocation);
  }
})

function fromXtoY(val, array) {
  let finalRes = -1;
  array.forEach(range => {
    if (val >= range[1] && val < range[1] + range[2]) {
      let delta = val - range[1];
      let res = range[0] + delta;
      finalRes = res;
      return res; 
    }
  });
  if (finalRes === -1) {
    return val;
  }
  return finalRes;
}

function convertSeedToLocation(seed) {
  let curVal = seed;
  curVal = fromXtoY(curVal, seedToSoil);
  curVal = fromXtoY(curVal, soilToFertilizer);
  curVal = fromXtoY(curVal, fertilizerToWater);
  curVal = fromXtoY(curVal, waterToLight);
  curVal = fromXtoY(curVal, lightToTemperature);
  curVal = fromXtoY(curVal, temperatureToHumidity);
  curVal = fromXtoY(curVal, humidityToLocation);
  return curVal;
}



let minLocation = 29189284711111111111111111111111111111;
for (i = 0; i < seeds.length; i = i + 2) {
  for (j = seeds[i]; j < seeds[i] + seeds[i + 1]; j++) {
    let location = convertSeedToLocation(j);
    if (location < minLocation) {
      minLocation = location;
    }
  }
}

console.log(minLocation);