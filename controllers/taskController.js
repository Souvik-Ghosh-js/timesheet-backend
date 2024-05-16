const Task = require('../models/taskModel');
const Project = require('../models/projectModel');
const User = require('../models/userModel');
const Team = require('../models/teamModel');

// Controller function to add a new task
async function add_task(req, res) {
    try {
        const { task_name, task_desc, priority, status, assignedTo, dueDate, project_name  } = req.body;

        // Get the current logged in user (assigned by)
        const assignedBy = req.user._id;
        const project = await Project.findOne({ project_name });

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
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
            project_id: project._id,
        });

        // Save the new task to the database
        await newTask.save();



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


async function get_tasks(req, res) {
    try {
        const { project_id } = req.params; // Assuming project_id is passed in the request parameters

        // Find tasks based on project_id
        const tasks = await Task.find({ project_id });

        res.status(200).json({ message: 'Tasks retrieved successfully', tasks });
    } catch (error) {
        console.error('Error getting tasks by project_id:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


async function delete_task(req, res) {
    try {
        const { taskId } = req.params;

        // Find the task by ID
        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Check if the retrieved task is an instance of the Task model
        if (!(task instanceof Task)) {
            return res.status(500).json({ message: 'Invalid task data' });
        }

        // Delete the task
        await task.deleteOne();

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
module.exports = {
    add_task,
    get_tasks,
    delete_task,
};
