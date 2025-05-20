import { User } from "../types/User";
import { apiBase } from "./ApiBase";

export const api = `${apiBase}/api/Users`;

export async function fetchUsers(): Promise<User[]> {
  const response = await fetch(`${api}`);
  if (!response.ok) {
    throw new Error("Не удалось загрузить список пользователей");
  }
  return await response.json();
}
