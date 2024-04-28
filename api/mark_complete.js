export default async function MarkComplete(req_body) {
  return fetch(
    `https://fitbuddy-middleware-database.vercel.app/api/markComplete`,
    {
      method: "POST",
      body: JSON.stringify(req_body),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  );
}
