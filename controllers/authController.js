const User = require('../models/User');

module.exports = {
    createUser: async (req, res) => {
        // const newUser = new User({
        //     username: req.body.username,
        //     email: req.body.email,
        //     password: req.body.password
        // });
        const newUser = new User(req.body);

        try{
            await newUser.save();
            res.status(201).json({status: true, message: "User created successfully"});
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    updateUser: async (req, res) => {

    },
}