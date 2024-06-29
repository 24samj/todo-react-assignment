// eslint-disable-next-line no-unused-vars
import React, { useRef } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import TodosContainer from "./components/TodosContainer/TodosContainer";
import { FaPlus } from "react-icons/fa6";
import AddTodo from "./components/AddTodo/AddTodo";
import { useDispatch } from "react-redux";
import { addTodo } from "./slices/todoSlice";

function App() {
    const dispatch = useDispatch();
    const addTodoRef = useRef(null);

    const handleAddTodo = (newTodo) => {
        console.log(newTodo);
        dispatch(addTodo({ title: newTodo }));
        hideAddTodo();
    };

    const showAddTodo = () => {
        addTodoRef.current.showModal();
    };

    const hideAddTodo = () => {
        addTodoRef.current.close();
    };

    return (
        <div className="App">
            <Navbar />
            <div className="header-add-wrapper">
                <h2 className="header-title">Your todos:</h2>
                <button className="add-button" onClick={showAddTodo}>
                    <FaPlus />
                </button>
            </div>
            <TodosContainer />
            <AddTodo ref={addTodoRef} handleAddTodo={handleAddTodo} />
        </div>
    );
}

export default App;
