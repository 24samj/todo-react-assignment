// eslint-disable-next-line no-unused-vars
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import TodoItem from "../TodoItem/TodoItem";
import "./TodosContainer.css";
import { toggleTodo, deleteTodo, editTodo } from "../../slices/todoSlice";

function TodosContainer() {
    const todos = useSelector((state) => state.todos);
    const dispatch = useDispatch();

    // Sort todos so that incomplete todos are at the top
    const sortedTodos = [...todos].sort((a, b) => a.completed - b.completed);

    return (
        <div className="todos-container">
            {/* Mapping through sortedTodos to render TodoItem for each todo */}
            {sortedTodos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onClick={() => dispatch(toggleTodo(todo.id))}
                    onDelete={() => dispatch(deleteTodo(todo.id))}
                    onEdit={(updatedTodo) => dispatch(editTodo(updatedTodo))}
                />
            ))}
        </div>
    );
}

export default TodosContainer;
