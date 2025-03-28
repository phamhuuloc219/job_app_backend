const User = require('../models/User');
const jwt = require('jsonwebtoken');
const CryptoJS = require('crypto-js');

module.exports = {
    createUser: async (req, res) => {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET).toString(),
        });

        try{
            const savedUser = await newUser.save();
            res.status(201).json({status: true, message: "User created successfully", user: savedUser });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    loginUser: async (req, res) => {
        try{
            const user = await User.findOne({ email: req.body.email });
            !user && res.status(401).json({ message: "Wrong Login Details" });
            
            const decryptedpass = await CryptoJS.AES.decrypt(user.password, process.env.SECRET);
            const depassword = decryptedpass.toString(CryptoJS.enc.Utf8);

            depassword != req.body.password && res.status(401).json("Wrong Password");

            const userToken = jwt.sign(
                { id: user._id, isAdmin: user.isAdmin },
                process.env.JWT_SEC,
                { expiresIn: "1d" }
            );

            const { password, __v, createdAt, ...others } = user._doc;
            res.status(200).json({ ...others, userToken });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}