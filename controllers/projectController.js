const Project = require('../models/projectModel');
const User = require('../models/userModel');
const Team = require('../models/teamModel')

// Controller function to add a new project
async function add_project(req, res) {
    try {
        const { project_name, member_id, team_id } = req.body;


        const newProject = new Project({
                project_name,
                team_id,
                member_id,
            });
        await newProject.save();
        res.status(201).json({ message: 'Project added successfully', project: newProject });
  
        // Save the new project to the database

    } catch (error) {
        console.error('Error adding project:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    add_project
};
