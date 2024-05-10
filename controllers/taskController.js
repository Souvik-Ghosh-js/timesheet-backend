const Task = require('../models/taskModel');
const Project = require('../models/projectModel');
const User = require('../models/userModel');
const Team = require('../models/teamModel');

// Controller function to add a new task
async function add_task(req, res) {
    try {
        const { task_name, task_desc, priority, status, assignedTo, dueDate, project_id } = req.body;

        // Get the current logged in user (assigned by)
        const assignedBy = req.user._id;

        // Create a new task
        const newTask = new Task({
            task_name,
            task_desc,
            priority,
            status,
            assignedBy,
            assignedTo,
            dueDate,
            overdueTime: null, // Set OverdueTime to null for now
            project_id
        });

        // Save the new task to the database
        await newTask.save();

        // Update project's member_id or team_id based on AssignedTo
        const project = await Project.findById(project_id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Find the assigned users and teams
        const assignedUsers = await User.find({ _id: { $in: assignedTo } });
        const assignedTeams = await Team.find({ _id: { $in: assignedTo } });

        if (assignedUsers.length > 0) {
            // Update member_id in project
            project.member_id = assignedTo;
        } else if (assignedTeams.length > 0) {
            // Update team_id in project
            project.team_id = assignedTo;
        }

        // Save the updated project to the database
        await project.save();

        res.status(201).json({ message: 'Task added successfully', task: newTask });
    } catch (error) {
        console.error('Error adding task:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    add_task
};
