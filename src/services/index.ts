'use server';
type Method = 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH';
export async function api(endpoint: string, method: Method, body?: any) {
  const url = `http://localhost:${process.env.PORT}${endpoint}`;
  console.log(url);
  const response = fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());
  return response;
}
