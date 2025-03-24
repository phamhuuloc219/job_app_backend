const User = require('../models/User');
const CryptoJS = require('crypto-js');

module.exports = {
    updateUser: async (req, res) => {
        if(req.body.password){
            res.bod.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET).toString()
        }

        try{
            const updateUser = await User.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );
            const {password, __v, createdAt, ...orthers} = updateUser._doc; 
            res.status(200).json({ ...orthers });
        } catch(e){
            res.status(500).json({ message: e.message });
        }
    },

    deleteUser: async (req, res) => {
        try{
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account Successfully Deleted");
        } catch(e){
            res.status(500).json({ message: e.message });
        }
    },

    getUser: async (req, res) => {
        try{
           const user = await User.findById(req.params.id);
           const {password, __v, createdAt, updatedAt, ...userData} = user._doc;
            res.status(200).json({ ...userData });
        } catch(e){
            res.status(500).json({ message: e.message });
        }
    },

    getAllUser: async (req, res) => {
        try{
           const allUsers = await User.find();
            res.status(200).json(allUsers);
        } catch(e){
            res.status(500).json({ message: e.message });
        }
    },
}