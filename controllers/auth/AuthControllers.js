const { User } = require('../../models/')
const { NotFound } = require('http-errors')
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../../.env') })
const { SECRET_KEY } = process.env
const jwt = require('jsonwebtoken')
const { Unauthorized } = require('http-errors')
const { Conflict } = require('http-errors')
const { nanoid } = require('nanoid')

class AuthControllers {
    async logout(req, res) {
        const { _id } = req.user;
        const user = await User.findByIdAndUpdate(_id, { token: null });
        if (!user) {
            throw new Unauthorized("Can't logout non-existing user");
        }
        res.status(204).json();
    }

    async login(req, res) {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            throw new NotFound(`User with email=${email} doesn't exist`)
        }
        const { avatarURL, name } = user
        if (!user.comparePassword(password)) {
            throw new Unauthorized('Password is wrong')
        }
        const payload = {
            id: user._id,
        }

        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' })
        await User.findByIdAndUpdate(user._id, { token })
        res.status(200).json({
            status: 200,
            code: 'success',
            data: {
                user: {
                    name,
                    email,
                    avatarURL,
                    token,
                },
            },
        })
    }

    async register(req, res) {
        const { name, email, password } = req.body
        const user = await User.findOne({ email })
        if (user) {
            throw new Conflict('Email already in use')
        }
        const verifyToken = nanoid()
        const newUser = new User({ email, verifyToken })
        newUser.setPassword(password)
        newUser.setAvatar(email)
        newUser.setName(name)
        await newUser.save()
        const { avatarURL: generatedAvatar, name: generatedName } = newUser

        res.status(201).json({
            status: 'success',
            code: 201,
            data: {
                user: {
                    name: generatedName,
                    email,
                    verifyToken,
                    avatarURL: generatedAvatar,
                },
            },
        })
    }
}

module.exports = new AuthControllers()