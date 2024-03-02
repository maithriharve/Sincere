/**
 * Component for rendering a list of TodoItems, also contains a component TodoListSection to reduce code duplication.
 */
import { useTodos } from '@/hooks/useTodos';
import { HiCheckCircle } from "react-icons/hi2";
import { Todo } from '@/lib/todos-lib';
import { RiCheckboxBlankCircleLine } from "react-icons/ri"; // I'm sorry this isn't from the Heroicons 2 library — I couldn't find an appropriate empty circle within there! 
import TodoItem from './TodoItem';

interface TodoListSectionProps {
    todos: Todo[],
    title: string,
    Icon: React.ElementType;
}
const TodoListSection = ({ todos, title, Icon }: TodoListSectionProps) => {
    return (
        <>
            {todos.length > 0 && (
                <div className="flex items-center font-sans text-2xl font-medium border-b border-stone-200 py-2 !mb-2">
                    {title}
                    <div className="m-2 w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white text-base">
                        {todos.length}
                    </div>
                </div>
            )}
            {todos.map((todo) => (
                <>
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        Icon={Icon}
                    />
                    <div className="border-b border-gray-300 !m-2" />
                </>
            ))}
        </>
    );
};

export const ToDoList = () => {

    const { todos } = useTodos();
    const completedTodos = todos.filter((todo) => todo.completed);
    const incompleteTodos = todos.filter((todo) => !todo.completed);

    return (
        <>
            <TodoListSection
                todos={incompleteTodos}
                title="Incomplete"
                Icon={RiCheckboxBlankCircleLine}
            />
            <TodoListSection
                todos={completedTodos}
                title="Completed"
                Icon={HiCheckCircle}
            />
        </>
    )
};

export default ToDoList;