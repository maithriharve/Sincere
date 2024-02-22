import { rest } from "msw";
import { Todo } from "../lib/todos-lib";
import { getTodos, addTodo, updateTodo, deleteTodo } from "./db/todos";

export const handlers = [
  // GET /todos
  rest.get("/todos", (_, res, ctx) => {
    return res(ctx.json(getTodos()));
  }),

  // POST /todos
  rest.post("/todos", (req, res, ctx) => {
    const { title } = req.body as {
      title: string;
    };

    const newTodo = addTodo({
      title,
    });

    return res(ctx.json(newTodo));
  }),

  // PUT /todos/:id
  rest.put("/todos/:id", (req, res, ctx) => {
    const { id } = req.params as { id: string };
    const todo = req.body as Todo;

    const updatedTodo = updateTodo({
      ...todo,
      id,
    });

    return res(ctx.json(updatedTodo));
  }),

  // DELETE /todos/:id
  rest.delete("/todos/:id", (req, res, ctx) => {
    const { id } = req.params as { id: string };

    deleteTodo(id);

    return res(
      ctx.json({
        id,
      }),
    );
  }),
];
