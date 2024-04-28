export default async function GetUserComplete(id) {
  return fetch(
    `https://fitbuddy-middleware-database.vercel.app/api/userComplete?user_id=${id}`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  );
}
