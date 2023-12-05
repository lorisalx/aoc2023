const input = require('fs').readFileSync('input.txt', 'utf8');

// PART 1
const input1 = require('fs').readFileSync('part1.txt', 'utf8');

let seeds = [];
let seedToSoil = new Map();
let soilToFertilizer = new Map();
let fertilizerToWater = new Map();
let waterToLight = new Map();
let lightToTemperature = new Map();
let temperatureToHumidity = new Map();
let humidityToLocation = new Map();

function xToY(x, map) {
  let xToYMapValues = x.split(':')[1].split('\n').filter(x => x !== '');
  xToYMapValues = xToYMapValues.map(x => x.split(' ').filter(x => x !== '').map(x => parseInt(x)));
  xToYMapValues.forEach(x => {
    for (i = 0; i < x[2]; i++) {
      map.set(x[1] + i, x[0] + i);
    }
  });
  
}
const part1 = input.split('\n\n').map(x=> {
  if (x.includes('seeds:')) {
    seeds = x.split(':')[1].split(' ').filter(x => x !== '').map(x => parseInt(x));
  }
  if (x.includes('seed-to-soil')) {
    xToY(x, seedToSoil);
  }
  if (x.includes('soil-to-fertilizer')) {
    xToY(x, soilToFertilizer);
  }
  if (x.includes('fertilizer-to-water')) {
    xToY(x, fertilizerToWater);
  }
  if (x.includes('water-to-light')) {
    xToY(x, waterToLight);
  }
  if (x.includes('light-to-temperature')) {
    xToY(x, lightToTemperature);
  }
  if (x.includes('temperature-to-humidity')) {
    xToY(x, temperatureToHumidity);
  }
  if (x.includes('humidity-to-location')) {
    xToY(x, humidityToLocation);
  }
})

function convertSeedToLocation(seed) {
  let curVal = seed;
  if (seedToSoil.has(curVal)) {
    curVal = seedToSoil.get(curVal);
  }
  if (soilToFertilizer.has(curVal)) {
    curVal = soilToFertilizer.get(curVal);
  }
  if (fertilizerToWater.has(curVal)) {
    curVal = fertilizerToWater.get(curVal);
  }
  if (waterToLight.has(curVal)) {
    curVal = waterToLight.get(curVal);
  }
  if (lightToTemperature.has(curVal)) {
    curVal = lightToTemperature.get(curVal);
  }
  if (temperatureToHumidity.has(curVal)) {
    curVal = temperatureToHumidity.get(curVal);
  }
  if (humidityToLocation.has(curVal)) {
    curVal = humidityToLocation.get(curVal);
  }
  return curVal;
}

let locations = [];
for (i = 0; i < seeds.length; i++) {
  locations.push(convertSeedToLocation(seeds[i]));
}
// display min of locations
console.log(Math.min(...locations));