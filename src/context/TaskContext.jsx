import React, { createContext, useState, useEffect } from "react";

// Create TaskContext
export const TaskContext = createContext();

/**
 * TaskProvider component that provides task-related state and functions to its children via context.
 * @component TaskProvider
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components that will consume the context.
 * @returns {JSX.Element} The rendered TaskProvider component.
 */
export function TaskProvider({ children }) {
    const SERVER_URL = "http://localhost:6001/tasks";

    const [tasks, setTasks] = useState([]);

    // Fetch tasks from db.json
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch(SERVER_URL);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                setTasks(data);
            } catch (error) {
                console.error("Failed to fetch tasks:", error);
            }
        };

        fetchTasks();
    }, []);

    // Toggle completion status
    const toggleComplete = async (id) => {
        try {
            const updatedTasks = tasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            );
            setTasks(updatedTasks);

            const taskToUpdate = updatedTasks.find((t) => t.id === id);
            const response = await fetch(`${SERVER_URL}/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ completed: taskToUpdate.completed }),
            });

            if (!response.ok) throw new Error(`Failed to update task ${id}`);
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    // Add a new task
    const addTask = async (title) => {
        try {
            const newTask = { id: Date.now(), title, completed: false };
            setTasks((prev) => [...prev, newTask]);

            const response = await fetch(SERVER_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newTask),
            });

            if (!response.ok) throw new Error("Failed to add new task");

            const savedTask = await response.json();

            // Replace temp ID with real one if server provides it
            setTasks((prev) =>
                prev.map((t) => (t.id === newTask.id ? { ...t, id: savedTask.id } : t))
            );
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    return (
        <TaskContext.Provider value={{ tasks, toggleComplete, addTask }}>
            {children}
        </TaskContext.Provider>
    );
}
