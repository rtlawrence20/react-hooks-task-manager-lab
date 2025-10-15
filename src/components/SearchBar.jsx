import React, { useState, useRef, useEffect } from "react";
import TaskList from "./TaskList";

/**
 * SearchBar component that provides a search input to filter tasks.
 * @component SearchBar
 * @returns {JSX.Element} The rendered SearchBar component.
 */
function SearchBar() {
    
    // State to hold the search query
    const [query, setQuery] = useState("");
    const inputRef = useRef(null);

    // Handle input change
    const handleSearch = (e) => setQuery(e.target.value);

    // Auto-focus the input when the form mounts
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (
        <div className="search-container">
            <input
                type="text"
                placeholder="Search tasks..."
                value={query}
                ref={inputRef}
                onChange={handleSearch}
            />
            <TaskList query={query} />
        </div>
    );
}

export default SearchBar;
