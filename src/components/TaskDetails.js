import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const TaskDetails = () => {
    const { id } = useParams();
    const [task, setTask] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/tasks/${id}`)
            .then(response => {
                setTask(response.data);
            })
            .catch(error => {
                console.error("There was an error retrieving the task details!", error);
            });
    }, [id]);

    if (!task) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <p>Due Date: {task.dueDate}</p>
        </div>
    );
};

export default TaskDetails;
