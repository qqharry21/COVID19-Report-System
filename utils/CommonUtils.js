/** @format */

export const paragraph = {
  一: 1,
  二: 2,
  三: 3,
  四: 4,
  五: 5,
  六: 6,
  七: 7,
  八: 8,
  九: 9,
  十: 10,
};

function getObjectValue(object, title) {
  return Object.keys(object).find(key => object[key] === title);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms)); //timeout function
}

export { sleep, getObjectValue };
