// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { FaCheck, FaTrash } from "react-icons/fa6";
import "./TodoItem.css";
import { MdModeEditOutline } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import PropTypes from "prop-types";

function TodoItem({ todo, onClick, onDelete, onEdit }) {
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(todo.title);

    // Toggle editing mode when clicking on edit button
    function handleEdit(e) {
        if (isEditing) return; // Prevent re-entering edit mode while editing
        e.preventDefault();
        setIsEditing(true);
    }

    // Save edited todo item when clicking on save button
    function handleSave(e) {
        e.preventDefault();
        setIsEditing(false);
        onEdit({ id: todo.id, title: newTitle });
    }

    // Handle input change while editing
    function handleChange(e) {
        setNewTitle(e.target.value);
    }

    return (
        <div
            className={`todo-item-wrapper ${
                todo.completed ? "completed" : ""
            }`}>
            {/* Checkbox for marking todo item as completed */}
            <div
                className={
                    todo.completed
                        ? "checkbox-wrapper checked"
                        : "checkbox-wrapper"
                }
                style={{ display: isEditing ? "none" : "flex" }} // Hide checkbox when editing
                onClick={onClick}>
                <FaCheck />
            </div>
            {/* Input field for editing todo item title */}
            <div className="todo-title-wrapper">
                <input
                    type="text"
                    value={newTitle}
                    onChange={handleChange}
                    disabled={!isEditing} // Disable input when not in editing mode
                    className="todo-title"
                />
            </div>
            {/* Buttons for editing and deleting todo item */}
            <div className="todo-buttons-wrapper">
                {/* Edit or Save button based on editing mode */}
                <button
                    onClick={isEditing ? handleSave : handleEdit}
                    disabled={todo.completed} // Disable edit button when todo is completed
                >
                    {isEditing ? (
                        <FaSave size={16} />
                    ) : (
                        <MdModeEditOutline size={16} />
                    )}
                </button>
                {/* Delete button */}
                <button onClick={() => onDelete(todo)}>
                    <FaTrash />
                </button>
            </div>
        </div>
    );
}

// PropTypes for type-checking props passed to TodoItem component
TodoItem.propTypes = {
    todo: PropTypes.object.isRequired, // Todo object containing id, title, and completed
    onClick: PropTypes.func.isRequired, // Function to handle todo item click (mark as completed)
    onDelete: PropTypes.func.isRequired, // Function to handle todo item deletion
    onEdit: PropTypes.func.isRequired, // Function to handle todo item editing
};

export default TodoItem;
