const Team = require('../models/teamModel');
const User = require('../models/userModel'); // Add this line to import the User model

// Controller function to add a new team
async function add_team(req, res) {
    try {
        const { name, members } = req.body;

        // Fetch user names corresponding to member IDs
        const membersData = await User.find({ _id: { $in: members } });

        // Extract user names from membersData
        const members_name = membersData.map(user => user.name);
        // Create a new team
        const newTeam = new Team({
            name,
            members,
            members_name
        });

        // Save the new team to the database
        await newTeam.save();

        res.status(201).json({ message: 'Team added successfully', team: newTeam });
    } catch (error) {
        console.error('Error adding team:', error);
        res.status(500).json({ message: 'Internal server error' , error: error });
    }
}


async function show_teams(req, res) {
    try {
        // Fetch all teams from the database
        const teams = await Team.find();

        res.status(200).json({ teams });
    } catch (error) {
        console.error('Error fetching teams:', error);
        res.status(500).json({ message: 'Internal server error', error: error });
    }
}




module.exports = {
    add_team,
    show_teams,
};
