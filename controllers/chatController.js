const Chat = require('../models/Chat');
const User = require('../models/User');
const moment = require('moment-timezone');

const convertDateFields = (doc) => {
    const obj = doc.toObject();
    obj.createdAt = moment(obj.createdAt).tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm:ss');
    obj.updatedAt = moment(obj.updatedAt).tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm:ss');
    return obj;
};

const convertArrayDates = (docs) => docs.map(convertDateFields);

module.exports = {
    accessChat: async (req, res) => {
        const {userId} = req.body;
        
        if(!userId){
            return res.status(400).json({message: 'User ID is required'});
        }

        var isChat = await Chat.find({
            isGroupChat: false,
            $and: [
                {users: {$elemMatch: { $eq: req.user.id}}},
                {users: {$elemMatch: { $eq: userId}}}
            ]
        }).populate("users", "-password").populate("latestMessage");

        isChat = await User.populate(isChat, {
            path: "latestMessage.sender",
            select: "username profile email"
        });

        if(isChat.length > 0 ){
            res.status(200).json(convertDateFields(isChat[0]));
        } else{
            var ChatData = {
                chatName: req.user.id,
                isGroupChat: false,
                users: [req.user.id, userId]
            };

            try {
                const createdChat = await Chat.create(ChatData);
                const FullChat = await Chat.findOne({ _id: createdChat._id }).populate("users", "-password");
                res.status(200).json(convertDateFields(FullChat));
            } catch (error) {
                res.status(400).json({ message: error.message });
            }
        }
    },

    getChat: async (req, res) => {
        try {
            Chat.find({users: {$elemMatch: { $eq: req.user.id}}})
                .populate("users", "-password")
                .populate("groupAdmin", "-password")
                .populate("latestMessage")
                .sort({updatedAt: -1})
                .then(async (results) => {
                    results = await User.populate(results, {
                        path: "latestMessage.sender",
                        select: "username profile email"
                    });
                    res.status(200).json(convertArrayDates(results));
                })
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}