// 'use server';
type Method = 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH';
export async function api(endpoint: string, method: Method, body?: any) {
  const response = fetch(process.env.URL + endpoint, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());
  return response;
}

export const dynamic = 'force-dynamic';
