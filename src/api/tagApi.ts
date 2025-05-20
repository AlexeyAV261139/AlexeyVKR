import { Tag } from "../types/Tag";
import { apiBase } from "./ApiBase";

export const api = `${apiBase}/api/Tags`;

export async function fetchTags(): Promise<Tag[]> {
  const response = await fetch(api);
  if (!response.ok) {
    throw new Error("Ошибка при загрузке тегов");
  }
  var json = response.json();
  return json;
}