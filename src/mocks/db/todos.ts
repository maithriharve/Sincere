import { faker } from "@faker-js/faker";
import { Todo } from "../../lib/todos-lib";

const TODOS_KEY = "todos";

const getLocalStorage: () => Todo[] = () => {
  return localStorage?.getItem(TODOS_KEY)
    ? JSON.parse(localStorage?.getItem(TODOS_KEY)!)
    : [];
};

const setLocalStorage = (todos: Todo[]) => {
  localStorage?.setItem(TODOS_KEY, JSON.stringify(todos));
};

export const getTodos = () => {
  return getLocalStorage().sort((a, b) => a.priority - b.priority);
};

export const getTodo = (id: string) => {
  const todo = getLocalStorage().find((t) => t.id === id);

  if (!todo) {
    throw new Error("Todo not found");
  }

  return todo;
};

export const addTodo = (todo: Pick<Todo, "title">) => {
  if (todo.title.match(/mock-error/)) {
    throw new Error("Unable to create todo.");
  }

  const newTodo: Todo = {
    id: faker.string.uuid(),
    ...todo,
    completed: false,
    priority: getLocalStorage().length,
  };

  setLocalStorage([...getLocalStorage(), newTodo]);

  return newTodo;
};

export const updateTodo = (todo: Todo) => {
  const index = getLocalStorage().findIndex((t) => t.id === todo.id);

  if (index === -1) {
    throw new Error("Todo not found");
  }

  const todos = getLocalStorage();
  todos[index] = todo;

  setLocalStorage(todos);

  return todos[index];
};

export const deleteTodo = (id: string) => {
  const index = getLocalStorage().findIndex((t) => t.id === id);

  if (index === -1) {
    throw new Error("Todo not found");
  }

  const todos = getLocalStorage();
  const deletedTodo = todos[index];

  todos.splice(index, 1);

  setLocalStorage(todos);

  return deletedTodo;
};
