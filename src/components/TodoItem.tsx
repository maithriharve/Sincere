import React from 'react';
import { Todo } from '@/lib/todos-lib';
import { HiTrash } from 'react-icons/hi2';
import { HiCheckCircle } from "react-icons/hi2";

interface TodoItemProps {
    todo: Todo;
    onTodoUpdate: (todo: Todo, completed: boolean) => void;
    onTodoDelete: (todoId: string) => void;
    Icon: React.ElementType;
}

export const TodoItem = ({ todo, onTodoUpdate, onTodoDelete, Icon }: TodoItemProps) => {
    return (
        <div className="relative w-full" key={todo.id}>
            <button
                type="submit"
                className="group flow-root w-full rounded border border-stone-200 bg-white px-4 py-3 text-xl transition-opacity text-left hover:bg-gray-100 focus-visible:outline-none disabled:opacity-50"
                onClick={() => onTodoUpdate(todo, !todo.completed)}
            >
                <Icon className={`text-xl inline ${Icon === HiCheckCircle ? 'fill-green-600' : ''}`} /> {todo.title}
                <div className="float-right hidden group-hover:block" onClick={() => onTodoDelete(todo.id)}>
                    <HiTrash className="hover:fill-red-600 text-xl" />
                </div>
            </button>
        </div>
    )
};
