import React from "react";
import TaskForm from "./TaskForm";
import SearchBar from "./SearchBar";
import { TaskProvider } from "../context/TaskContext";

/**
 * App component that serves as the main entry point for the Task Manager application.
 * @component App
 * @returns {JSX.Element} The rendered App component.
 */
function App() {
    return (
        <TaskProvider>
            <div className="container">
                <h1>Task Manager</h1>
                <TaskForm />
                <SearchBar />
            </div>
        </TaskProvider>
    );
}

export default App;
