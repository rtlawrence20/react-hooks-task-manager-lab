import React, { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

/**
 * TaskList component that displays a list of tasks and allows toggling their completion status.
 * @component TaskList
 * @param {Object} props - The component props.
 * @param {string} props.query - The search query to filter tasks.
 * @returns {JSX.Element} The rendered TaskList component.
 */
function TaskList({ query = "" }) {
    
    // Access tasks and toggleComplete function from context
    const { tasks, toggleComplete } = useContext(TaskContext);

    // Filter tasks based on the search query
    const filteredTasks = tasks.filter((task) =>
        task.title.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <ul>
            {filteredTasks.map((task) => (
                <li key={task.id}>
                    <span className={task.completed ? "completed" : ""}>
                        {task.title}
                    </span>
                    <button
                        data-testid={task.id}
                        className="complete-btn"
                        onClick={() => toggleComplete(task.id)}
                    >
                        {task.completed ? "Undo" : "Complete"}
                    </button>
                </li>
            ))}
        </ul>
    );
}

export default TaskList;
