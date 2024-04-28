export default async function GetCompleteStatus(user_id, tutorial_id) {
  return fetch(
    `https://fitbuddy-middleware-database.vercel.app/api/completeStatus?user_id=${user_id}&tutorial_id=${tutorial_id}`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  );
}
