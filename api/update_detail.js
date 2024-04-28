export default async function UpdateDetail(req_body) {
  return fetch(
    `https://fitbuddy-middleware-database.vercel.app/api/userUpdate`,
    {
      method: "POST",
      body: JSON.stringify(req_body),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  );
}
