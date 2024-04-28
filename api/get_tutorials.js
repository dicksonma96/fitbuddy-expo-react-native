export default async function GetTutorials() {
  return fetch(
    `https://fitbuddy-middleware-database.vercel.app/api/getTutorials`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  );
}
