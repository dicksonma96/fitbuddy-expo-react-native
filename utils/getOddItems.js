export default function getOddItems(array) {
  const oddNumbers = [];

  for (let i = 0; i < array.length; i += 2) {
    oddNumbers.push(array[i]);
  }

  return oddNumbers;
}
