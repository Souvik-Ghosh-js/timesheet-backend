const axios = require('axios');
const User = require('../models/userModel'); // Assuming you have a User model

async function updateGoogleSheet(task, user) {
    const sheetDBEndpoint = 'https://sheetdb.io/api/v1/hf4o2okn3md5y'; // Replace with your SheetDB API endpoint

    // Fetch user details based on the assignedBy ID
    const assignedByUser = await User.findById(task.assignedBy);

    if (!assignedByUser) {
        console.error('Assigned by user not found');
        return;
    }

    const rowData = {
        data: [{
            task_name: task.task_name,
            assigned_by: assignedByUser.name, // Use the user's name
            assigned_to: user.name,
            due_date: task.dueDate,
            status: 'Done', // Assuming status is "Done"
            completion_date: new Date().toISOString(),
            overdue_time: task.overdueTime // Overdue time in milliseconds
        }]
    };

    try {
        const response = await axios.post(sheetDBEndpoint, rowData);
        console.log('Task logged to Google Sheet successfully:', response.data);
    } catch (error) {
        console.error('Error logging task to Google Sheet:', error);
    }
}

module.exports = updateGoogleSheet;
