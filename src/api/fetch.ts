import { User } from "../types/User";

export const BASE_URL = "http://localhost:3004/users";

type RequestMethod = "GET" | "POST";

function request<T>(
  url: string,
  method: RequestMethod = "GET",
  data: User | null = null
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      "Content-Type": "application/json; charset=UTF-8",
    };
  }

  return fetch(BASE_URL + url, options).then((response) => {
    if (!response.ok) {
      throw new Error(`error with db ${response.statusText}`);
    }

    return response.json();
  });
}

export const client = {
  get: <User>(url: string) => request<User[]>(url),
  post: <T>(url: string, data: User) => request<T>(url, "POST", data),
};
