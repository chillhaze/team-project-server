const { Schema, model } = require('mongoose');
const gravatar = require('gravatar');
const bcrypt = require("bcryptjs");
const Joi = require('joi');

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true
  },
  name: {
    type: String
  },
  avatarURL: {
    type: String
  },
  token: {
    type: String,
    default: null
  },
  verify: {
    type: Boolean,
    default: false
  },
  verifyToken: {
    type: String,
    required: [true, 'Verify token is required']
  }
}, { versionKey: false, timestamps: true })

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
}

const userLoginJoiSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
});

/*userSchema.pre('save', () => {
  if (this.isNew) {
    this.avatarURL = gravatar.url(this.email, { protocol: 'http', s: '250', d: 'robohash' })
  }
})

userSchema.post('save', () => {
  this.name = this.email.split('@')[0]
})*/

const User = model('user', userSchema)

module.exports = { 
  User,
  userLoginJoiSchema
 }
