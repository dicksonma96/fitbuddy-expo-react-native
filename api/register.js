export default async function RegisterApi(req_body) {
  return fetch(`https://fitbuddy-middleware-database.vercel.app/api/register`, {
    method: "POST",
    body: JSON.stringify(req_body),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
}
