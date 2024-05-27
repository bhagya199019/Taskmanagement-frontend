import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TaskForm = ({ task, onSave }) => {
    const [formData, setFormData] = useState({ title: '', description: '', dueDate: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    // Track if the form is in edit mode
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        if (task) {
            setFormData(task);
            setIsEditMode(true); // Set to edit mode if task is provided
        } else {
            setFormData({ title: '', description: '', dueDate: '' });
            setIsEditMode(false); // Set to create mode if no task is provided
        }
    }, [task]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        setFormData({ title: '', description: '', dueDate: '' });

        // Show message only if the task is being updated
        if (isEditMode) {
            setMessage('Task is updated');
        } else {
            setMessage('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title</label>
            <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter a title"
                required
            />

            <label htmlFor="description">Description</label>
            <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter a description"
                required
            ></textarea>

            <label htmlFor="dueDate">Due Date</label>
            <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                required
            />

            <button type="submit">Save</button>

            {message && <p>{message}</p>}
        </form>
    );
};

export default TaskForm;
