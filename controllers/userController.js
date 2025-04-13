const User = require('../models/User');
const Skills = require('../models/Skills');
const Company = require('../models/Company');
// const CryptoJS = require('crypto-js');

module.exports = {
    updateUser: async (req, res) => {
        // if(req.body.password){
        //     res.bod.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET).toString()
        // }

        try{
            await User.findByIdAndUpdate(
                req.user.id,
                { $set: req.body },
                { new: true }
            );
            // const {password, __v, createdAt, ...orthers} = updateUser._doc; 
            res.status(200).json({ status : true });
        } catch(e){
            res.status(500).json({ message: e.message });
        }
    },

    deleteUser: async (req, res) => {
        try{
            await User.findByIdAndDelete(req.user.id);
            res.status(200).json({status : true});
        } catch(e){
            res.status(500).json({ message: e.message });
        }
    },

    getUser: async (req, res) => {
        try{
           const profile = await User.findById(req.user.id);
           const {password, __v, createdAt, updatedAt, ...userData} = profile._doc;
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

    addSkills: async (req, res) => {
        const newSkills = new Skills({ userId: req.user.id, skill: req.body.skill });
        try{
            await newSkills.save();

            await User.findByIdAndUpdate(req.user.id, { $set: { skills: true } });
            
            res.status(200).json({status : true});
        } catch(e){
            res.status(500).json({ message: e.message });
        }
    },

    getSkills: async (req, res) => {
        const userId = req.user.id;
        try{
           const skills = await Skills.find({userId: userId}, {createdAt: 0, updatedAt: 0, __V: 0});
           if(skills.length === 0){
             return res.status(200).json([]);
            }

            res.status(200).json(skills);
        } catch(e){
            res.status(500).json({ message: e.message });
        }
    },

    deleteSkills: async (req, res) => {
        const id = req.params.id;

        try{
            await Skills.findByIdAndDelete(id);
            res.status(200).json({status : true});
        } catch(e){
            res.status(500).json({ message: e.message });
        }
    }
}