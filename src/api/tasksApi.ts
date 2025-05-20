import { CreateTaskItemDto as CreateTaskDto, TaskItem } from "../types/TaskItem";
// types/UpdateTaskItemDto.ts
import { TaskProgressStatus } from "../types/TaskProgressStatus";
import { UpdateTaskItemDto } from "../types/UpdateTaskItemDto";
import { apiBase } from "./ApiBase";

export const api = `${apiBase}/api/Tasks`;

export async function fetchTasks(): Promise<TaskItem[]> {
  const response = await fetch(api);
  if (!response.ok) {
    throw new Error("Ошибка при загрузке задач");
  }
  var json = response.json();
  return json;
}

export async function fetchTaskById(id: number): Promise<TaskItem> {
  const response = await fetch(`apiBase${id}`);
  if (!response.ok) {
    throw new Error(`Ошибка при загрузке задачи № ${id}`);
  }
  var json = response.json();
  return json;
}

export async function fetchCreateTask(task: CreateTaskDto): Promise<void> {
  const response = await fetch(api, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Ошибка ответа сервера:", errorText);
    throw new Error(`Не удалось создать задачу`);
  }
}

export async function fetchUpdateTask(task: UpdateTaskItemDto): Promise<void> {
  const response = await fetch(api, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Ошибка ответа сервера:", errorText);
    throw new Error(`Не удалось обновить задачу #${task.id}`);
  }
}

export async function fetchDeleteTask(taskId: number) {
  try {
    const response = await fetch(`${api}/${taskId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Ошибка при удалении задачи");
    }
  } catch (error) {
    console.error("Ошибка удаления:", error);
  }
}
