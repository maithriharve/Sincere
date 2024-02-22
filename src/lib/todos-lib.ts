export type Todo = {
  id: string;
  title: string;
  completed: boolean;
  priority: number;
};

type ApiResponse<T> = {
  error: any | null;
  data: T | null;
  status: number;
};

export const requestCreateTodo = async (
  todo: Pick<Todo, "title">,
): Promise<ApiResponse<Todo[]>> => {
  const res = await fetch("/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });

  return {
    error: !res.ok ? await res.json() : null,
    data: res.ok ? await res.json() : null,
    status: res.status,
  };
};

export const requestUpdateTodo = async (
  todo: Todo,
): Promise<ApiResponse<Todo>> => {
  const res = await fetch(`/todos/${todo.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });

  return {
    error: !res.ok ? await res.json() : null,
    data: res.ok ? await res.json() : null,
    status: res.status,
  };
};

export const requestDeleteTodo = async (
  id: string,
): Promise<ApiResponse<{ id: string }>> => {
  const res = await fetch(`/todos/${id}`, {
    method: "DELETE",
  });

  return {
    error: !res.ok ? await res.json() : null,
    data: res.ok ? await res.json() : null,
    status: res.status,
  };
};
