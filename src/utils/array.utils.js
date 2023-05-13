/**
 * Returns array without duplicates.
 * @template T
 * @param {T[]} array
 * @returns {T[]}
 */
// eslint-disable-next-line no-unused-vars
function unique(array) {
  return array.filter((item, index, arr) => arr.indexOf(item) === index);
}
