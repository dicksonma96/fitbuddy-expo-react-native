export default function getEvenItems(array) {
  const evenNumbers = [];

  for (let i = 1; i < array.length; i += 2) {
    evenNumbers.push(array[i]);
  }

  return evenNumbers;
}
