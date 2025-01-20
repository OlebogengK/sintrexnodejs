const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const scheduledTasks = require('./scheduledTasks');
const usersRoutes = require('./routes/usersRoutes');
const tasksRoutes = require('./routes/tasksRoutes');
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/sintrexappDB` ', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.use('/api',usersRoutes);
app.use('/api',tasksRoutes);

app.listen(
    PORT,
    ()=>console.log(`Live on http://localhost:${PORT}`)
);

scheduledTasks;