const cron = require('node-cron');
const Task = require('./models/Task');

cron.schedule('* * * * *', async () => {
    console.log('Checking for pending tasks...');
    try {
        
        const tasks = await Task.find({
            status: 'pending',
            next_execute_date_time: { $lt: new Date() },
        });

        if (tasks.length > 0) {
            console.log('Pending tasks found:', tasks);

            
            const taskIds = tasks.map(task => task._id);
            await Task.updateMany(
                { _id: { $in: taskIds } },
                { $set: { status: 'done' } }
            );

            console.log(`${tasks.length} tasks updated to "done".`);
        } else {
            console.log('No pending tasks to process.');
        }
    } catch (error) {
        console.error('Error processing scheduled tasks:', error.message);
    }
});
