/**
 * Component for rendering a TodoItem
 */
import React from 'react';
import { requestDeleteTodo, requestUpdateTodo, Todo } from '@/lib/todos-lib';
import { useTodos } from '@/hooks/useTodos';
import { HiTrash } from 'react-icons/hi2';
import { HiCheckCircle } from "react-icons/hi2";

interface TodoItemProps {
    todo: Todo;
    Icon: React.ElementType;
}

export const TodoItem = ({ todo, Icon }: TodoItemProps) => {

    const { todos, mutate } = useTodos();

    const handleTodoUpdate = async (todo: Todo, isCompleted: boolean) => {
        todo.completed = isCompleted;
        await requestUpdateTodo(todo);
        mutate(todos);
    };
    const handleTodoDelete = async (id: string) => {
        await requestDeleteTodo(id);
        mutate(todos);
    };

    return (
        <button
            type="submit"
            className="group flow-root w-full rounded border border-stone-200 px-3 py-3 text-lg font-medium transition-opacity text-left hover:bg-gray-100"
            onClick={() => handleTodoUpdate(todo, !todo.completed)}
        >
            <Icon className={`text-2xl inline ${Icon === HiCheckCircle ? 'fill-green-600' : ''}`} /> {todo.title}
            <div className="float-right hidden group-hover:block" onClick={() => handleTodoDelete(todo.id)}>
                <HiTrash className="hover:fill-red-600 text-xl" />
            </div>
        </button>
    )
};

export default TodoItem;