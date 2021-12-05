const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, unique: true, required: true },
    firstName:String,
    lastName:String,
    street:String,
    numberStreet:String,
    cp:Number,
    phoneNumber:String,
    role: {
      type: String,
      enum: ['ADMIN', 'USER'],
      default: 'USER',
    },
   
  },
  {
    timestamps: true
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
