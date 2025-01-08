const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [2,'First name must be at least 3 characters long'],
        },
    
        lastname: {
            type: String,
            minlength: [2,'Last name must be at least 3 characters long'],
        }
    },

    email:{
        type:String,
        required:true,
        unique:true,
        minlength: [5, 'Email must be at least 5 characters long'],
    },

    password: {
        type: String,
        required: true,
        minlength: [8, 'Password must be at least 8 characters long'],
        select: false,
    },

    SocketId: {
        type: String,
    }

})

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
    return token;
}

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);

}

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;