// eslint-disable-next-line no-unused-vars
import React, { forwardRef, useState } from "react";
import PropTypes from "prop-types";
import "./AddTodo.css";

const AddTodo = forwardRef(({ handleAddTodo }, ref) => {
    const [newTodo, setNewTodo] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newTodo.trim()) {
            handleAddTodo(newTodo);
            setNewTodo("");
        }
    };

    function handleReset(e) {
        e.preventDefault();
        setNewTodo("");
        ref.current.close();
    }

    return (
        <dialog className="add-todo-dialog" ref={ref}>
            <form
                className="add-todo-form"
                onSubmit={handleSubmit}
                onReset={handleReset}>
                <input
                    type="text"
                    placeholder="Add a todo"
                    className="add-todo-input"
                    value={newTodo}
                    required
                    onChange={(e) => setNewTodo(e.target.value)}
                />
                <div className="dialog-button-wrapper">
                    <button type="reset" className="cancel-todo-button">
                        Cancel
                    </button>
                    <button type="submit" className="add-todo-button">
                        Add
                    </button>
                </div>
            </form>
        </dialog>
    );
});

AddTodo.displayName = "AddTodo";

AddTodo.propTypes = {
    handleAddTodo: PropTypes.func.isRequired,
};

export default AddTodo;
