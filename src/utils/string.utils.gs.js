/**
 * Returns Shannon entropy of string.
 * @param { string } str
 * @returns { number }
 */
// eslint-disable-next-line no-unused-vars
function shannonEntropy(str) {
  return [...new Set(str)]
    .map((chr) => str.match(new RegExp(chr, 'g')).length)
    .reduce((sum, frequency) => {
      const p = frequency / str.length;
      return sum + p * Math.log2(1 / p);
    }, 0);
}
