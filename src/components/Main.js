import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import TaskDetails from './TaskDetails';

const Main = () => {
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);

    useEffect(() => {
        axios.get('https://taskmanagement-1-54vn.onrender.com/api/tasks')
            .then(response => {
                setTasks(response.data);
            })
            .catch(error => {
                console.error("There was an error retrieving the tasks!", error);
            });
    }, []);

    const handleSaveTask = (task) => {
        if (task.id) {
            axios.put(`https://taskmanagement-1-54vn.onrender.com/api/tasks/${task.id}`, task)
                .then(response => {
                    const updatedTaskIndex = tasks.findIndex(t => t.id === task.id);
                    if (updatedTaskIndex !== -1) {
                        const updatedTasks = [...tasks];
                        updatedTasks[updatedTaskIndex] = response.data;
                        setTasks(updatedTasks);
                    }
                    setEditingTask(null);
                })
                .catch(error => {
                    console.error("There was an error updating the task!", error);
                });
        } else {
            axios.post('https://taskmanagement-1-54vn.onrender.com/api/tasks', task)
                .then(response => {
                    setTasks([...tasks, response.data]);
                })
                .catch(error => {
                    console.error("There was an error creating the task!", error);
                });
        }
    };

    const handleEditTask = (task) => {
        setEditingTask(task);
    };

    const handleDeleteTask = (taskId) => {
        axios.delete(`https://taskmanagement-1-54vn.onrender.com/api/tasks/${taskId}`)
            .then(() => {
                setTasks(tasks.filter(task => task.id !== taskId));
                if (editingTask && editingTask.id === taskId) {
                    setEditingTask(null);
                }
            })
            .catch(error => {
                console.error("There was an error deleting the task!", error);
            });
    };

    return (
        <Router>
            <div className="main">
                <h1>Task Management</h1>
                <Routes>
                    <Route 
                        path="/" 
                        element={
                            <>
                                <TaskForm task={editingTask} onSave={handleSaveTask} />
                                <TaskList tasks={tasks} onEdit={handleEditTask} onDelete={handleDeleteTask} />
                            </>
                        } 
                    />
                    <Route path="/task/:id" element={<TaskDetails />} />
                </Routes>
            </div>
        </Router>
    );
};

export default Main;
