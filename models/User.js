const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    location: {type: String, required: false},
    isAdmin: {type: Boolean, default: false},
    isCompany: {type: Boolean, default: false},
    skills: {type: Array, required: false},
    profile: {
        type: String, 
        required: true, 
        default: 'https://raw.githubusercontent.com/phamhuuloc219/job_app/refs/heads/main/assets/images/user.png'
    },
}, {timestamps: true});

module.exports = mongoose.model('User', UserSchema);