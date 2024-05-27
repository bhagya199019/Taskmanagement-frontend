import React from 'react';
import { Link } from 'react-router-dom';

const TaskList = ({ tasks, onEdit, onDelete }) => {
    return (
        <div className="task-list">
            {tasks.map(task => (
                <div key={task.id} className="task-item">
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <p>Due: {task.dueDate}</p>
                    <Link to="#" onClick={() => onEdit(task)}>Edit</Link> | 
                    <Link to="#" onClick={() => onDelete(task.id)}>Delete</Link> | 
                    <Link to={`/task/${task.id}`}>Retrieve</Link>
                </div>
            ))}
        </div>
    );
};

export default TaskList;
