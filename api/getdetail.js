export default async function GetDetail(req_body) {
  return fetch(
    `https://fitbuddy-middleware-database.vercel.app/api/getUserDetail`,
    {
      method: "POST",
      body: JSON.stringify(req_body),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  );
}
