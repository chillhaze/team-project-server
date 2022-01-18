
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

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

userSchema.methods.setName = function (name) {
  this.name = !name ? this.email.split('@')[0]:name;
}

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
}

userSchema.methods.setAvatar = function(email) {
  this.avatarURL = gravatar.url(email);
}

const userRegisterJoiSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  name: Joi.string().min(6).max(20)
});

const userLoginJoiSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
});

const User = model('user', userSchema)

module.exports = {
  User,
  userRegisterJoiSchema,
  userLoginJoiSchema
}

