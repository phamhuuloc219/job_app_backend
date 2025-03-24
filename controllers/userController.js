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
            const {password, __v, createAt, ...orthers} = this.updateUser._doc; 
            res.status(200).json({ ...orthers });
        } catch(e){
            res.status(500).json({ message: e.message });
        }
    },
}