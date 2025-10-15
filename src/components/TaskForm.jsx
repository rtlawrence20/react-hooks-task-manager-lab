import React, { useState, useId, useContext } from "react";
import { TaskContext } from "../context/TaskContext";

/**
 * TaskForm component that provides a form to add new tasks.
 * 
 * @component TaskForm
 * @returns {JSX.Element} The rendered TaskForm component.
 */
function TaskForm() {
    
    // Access addTask function from context
    const { addTask } = useContext(TaskContext);
    const [taskName, setTaskName] = useState("");
    const inputId = useId();

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!taskName.trim()) return;
        addTask(taskName);
        setTaskName("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor={inputId}>New Task:</label>
            <input
                id={inputId}
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                placeholder="Add a new task..."
            />
            <button type="submit">Add Task</button>
        </form>
    );
}

export default TaskForm;
