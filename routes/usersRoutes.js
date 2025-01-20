const express = require('express');
const router = express.Router();
const User = require('../models/User'); 

router.get('/users', async (req, res) => {
    const { username, first_name, last_name } = req.body;

    try {
        const response = await User.find();
        if (response.length==0) {
            return res.status(404).send({ message: 'No users found in the database' });
        }
        res.status(201).send({ message: 'Users retrieved successfully', response });
    } catch (error) {
        res.status(500).send({ message: 'Error Retrieving users', error: error.message });
    }
});

router.get('/users/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const response = await User.findById(id);

        if (!response) {
            return res.status(404).send({ message: 'User not found' });
        }

        res.send({ message: 'User Retrived successfully', response });
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving user', error: error.message });
    }
});

router.post('/users', async (req, res) => {
    const { username, first_name, last_name } = req.body;

    try {
        const newUser = new User({ 
            username, 
            first_name, 
            last_name 
        });
        const response = await newUser.save();
        res.status(201).send({ message: 'User created successfully', response });
    } catch (error) {
        res.status(500).send({ message: 'Error creating user', error: error.message });
    }
});

router.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { username, first_name, last_name } = req.body;

    try {
        const response = await User.findByIdAndUpdate(
            id,
            { username, first_name, last_name },
            { new: true, runValidators: true }
        );

        if (!response) {
            return res.status(404).send({ message: 'User not found' });
        }

        res.send({ message: 'User updated successfully', response });
    } catch (error) {
        res.status(500).send({ message: 'Error updating user', error: error.message });
    }
});

router.delete('/users/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const response = await User.findByIdAndDelete(id);

        if (!response) {
            return res.status(404).send({ message: 'User not found' });
        }

        res.send({ message: 'User deleted successfully', response });
    } catch (error) {
        res.status(500).send({ message: 'Error deleting user', error: error.message });
    }
});

module.exports = router;
