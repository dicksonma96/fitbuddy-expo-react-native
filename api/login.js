export default async function LoginApi(req_body) {
  return fetch(`https://fitbuddy-middleware-database.vercel.app/api/login`, {
    method: "POST",
    body: JSON.stringify(req_body),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
}
