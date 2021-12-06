const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, unique: true, required: true },
    firstName: String,
    lastName: String,
    adress:{ streat: String, numberStreet: String, floor: String, cp: Number},
    phoneNumber: String,
    role: { type: String, enum: ['ADMIN', 'USER'],default: 'USER'},
    products:[{ type: Schema.Types.ObjectId, ref: 'Sneaker'}],
    valuation:[{ type: Schema.Types.ObjectId, ref: 'Valuation'}]
  },
  {
    timestamps: true
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
