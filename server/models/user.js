const mongoose = require('mongoose');
// const mongooseHidden = require('mongoose-hidden')();
const uniqueValidator = require('mongoose-unique-validator');


let validRoles = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: "{VALUE} isn't a valid role"
}
let Schema = mongoose.Schema;

let userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is necessary'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is necessary']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: validRoles
    },
    status: { type: Boolean, default: true },
    google: { type: Boolean, default: false }
});

// password: {
//     type: String,
//     required: [true, 'Password is required'],
//     hide: true
// },

userSchema.methods.toJSON = function() {
    let userTemp = this;
    let userObject = userTemp.toObject();
    delete userObject.password;

    return userObject;
}

userSchema.plugin(uniqueValidator, { message: '{PATH} should be unique' });
// userSchema.plugin(mongooseHidden)
// userSchema.plugin(mongooseHidden, { hidden: { __v: false, _id: false, password: true } })
module.exports = mongoose.model('User', userSchema);