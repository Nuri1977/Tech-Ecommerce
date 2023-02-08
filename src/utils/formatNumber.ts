var numeral = require('numeral');

export const formatNumT1 = (num: number) => {
  return numeral(num).format('0,0.00');
};
