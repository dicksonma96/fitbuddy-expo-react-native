export default function formatDate(inputDate) {
  console.log(inputDate);
  const date = new Date(inputDate);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  // Function to add ordinal suffix to the day of the month
  function addOrdinalSuffix(num) {
    const suffixes = ["th", "st", "nd", "rd"];
    const v = num % 100;
    return num + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
  }

  const formattedDay = addOrdinalSuffix(day);

  return `${formattedDay} ${month} ${year}`;
}
