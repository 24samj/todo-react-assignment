import { createSlice } from "@reduxjs/toolkit";

const randomeAlphaNumbericIdGenerator = () => {
    return Math.random().toString(36).substring(2, 15);
};

const loadState = () => {
    try {
        const serializedState = localStorage.getItem("todos");
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem("todos", serializedState);
    } catch (err) {
        // Ignore write errors
    }
};

const initialState = loadState() || [
    {
        id: randomeAlphaNumbericIdGenerator(),
        title: "Learn React",
        completed: false,
    },
    {
        id: randomeAlphaNumbericIdGenerator(),
        title: "Learn Redux",
        completed: false,
    },
    {
        id: randomeAlphaNumbericIdGenerator(),
        title: "Learn Next.js",
        completed: false,
    },
    {
        id: randomeAlphaNumbericIdGenerator(),
        title: "Learn Node.js",
        completed: false,
    },
];

const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.push({
                id: randomeAlphaNumbericIdGenerator(),
                title: action.payload.title,
                completed: false,
            });
        },
        deleteTodo: (state, action) => {
            console.log(action.payload);
            return state.filter((todo) => todo.id !== action.payload);
        },
        editTodo: (state, action) => {
            const { id, title } = action.payload;
            const existingTodo = state.find((todo) => todo.id === id);
            if (existingTodo) {
                existingTodo.title = title;
            }
        },
        toggleTodo: (state, action) => {
            const todo = state.find((todo) => todo.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },
    },
});

export const { addTodo, deleteTodo, editTodo, toggleTodo } = todoSlice.actions;

export default todoSlice.reducer;

// Subscribe to store changes and save to local storage
export const subscribeToStore = (store) => {
    store.subscribe(() => {
        saveState(store.getState().todos);
    });
};
