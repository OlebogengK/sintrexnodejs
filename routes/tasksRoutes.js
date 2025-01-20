const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

router.get('/users/:user_id/tasks', async (req, res) => {
    try {
        const response = await Task.find(
            { user_id: req.params.user_id }
        );
        if(response.length==0)
        {
            return res.status(404).send({ message: 'User has no tasks' });
        }
        res.send({message:'Tasks Retrived successfully',response});
    } catch (error) {
        res.status(500).send({ message: 'Error fetching tasks', error: error.message });
    }
});

router.get('/users/:user_id/tasks/:task_id', async (req, res) => {
    try {
        const response = await Task.findOne(
            { _id: req.params.task_id, user_id: req.params.user_id }
        );
        if (!response) 
        {
            return res.status(404).send({ message: 'Task not found' });
        }
        res.send({message:'Task Retrived successfully',response});
    } catch (error) {
        res.status(500).send({ message: 'Error fetching task', error: error.message });
    }
});

router.post('/users/:user_id/tasks', async (req, res) => {
    const { name, description, date_time, next_execute_date_time,status} = req.body;

    try {
        const newTask = new Task({
            user_id: req.params.user_id,
            name,
            description,
            date_time,
            next_execute_date_time,
            status
        });

        const response = await newTask.save();
        res.status(201).send({ message: 'Task created successfully', response });
    } catch (error) {
        res.status(500).send({ message: 'Error creating task', error: error.message });
    }
});

router.put('/users/:user_id/tasks/:task_id', async (req, res) => {
    const { name, description, date_time ,next_execute_date_time,status} = req.body;

    try {
        const response = await Task.findOneAndUpdate(
            { _id: req.params.task_id, user_id: req.params.user_id },
            { name, description, date_time ,next_execute_date_time,status},
            { new: true, runValidators: true }
        );

        if (!response) 
        {
            return res.status(404).send({ message: 'Task not found' });
        }

        res.send({ message: 'Task updated successfully', response });
    } catch (error) {
        res.status(500).send({ message: 'Error updating task', error: error.message });
    }
});

router.delete('/users/:user_id/tasks/:task_id', async (req, res) => {
    try {
        const response = await Task.findOneAndDelete({
            _id: req.params.task_id,
            user_id: req.params.user_id,
        });

        if (!response) 
        {
            return res.status(404).send({ message: 'Task not found' });
        }
        
        res.send({ message: 'Task deleted successfully', response });
    } catch (error) {
        res.status(500).send({ message: 'Error deleting task', error: error.message });
    }
});

module.exports = router;
