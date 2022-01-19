const { User } = require('../../models/')
const { NotFound } = require('http-errors')
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../../.env') })
const { SECRET_KEY, GOOGLE_CLIENT_ID, BASE_URL, FRONTEND_URL, GOOGLE_CLIENT_SECRET } = process.env
const jwt = require('jsonwebtoken')
const { Unauthorized } = require('http-errors')
const { Conflict } = require('http-errors')
const { nanoid } = require('nanoid')
const queryString = require("query-string")
const axios = require("axios")

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

    async googleAuth(req, res) {
        const stringifiedParams = queryString.stringify({
            client_id: GOOGLE_CLIENT_ID,
            redirect_uri: `${BASE_URL}/api/auth/google-redirect`,
            scope: [
                "https://www.googleapis.com/auth/userinfo.email",
                "https://www.googleapis.com/auth/userinfo.profile",
            ].join(" "),
            response_type: "code",
            access_type: "offline",
            prompt: "consent",
        });
        return res.redirect(
            `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`
        );
    }

    async googleRedirect(req, res) {
        const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
        const urlObj = new URL(fullUrl);
        const urlParams = queryString.parse(urlObj.search);
        const code = urlParams.code;
        const tokenData = await axios({
            url: `https://oauth2.googleapis.com/token`,
            method: "post",
            data: {
                client_id: GOOGLE_CLIENT_ID,
                client_secret: GOOGLE_CLIENT_SECRET,
                redirect_uri: `${BASE_URL}/api/auth/google-redirect`,
                grant_type: "authorization_code",
                code,
            },
        });

        const userData = await axios({
            url: "https://www.googleapis.com/oauth2/v2/userinfo",
            method: "get",
            headers: {
                Authorization: `Bearer ${tokenData.data.access_token}`,
            },
        });

        const email = userData.data.email;
        const user = await User.findOne({ email });
        if (!user) {
            const newUser = new User({ email, verify: true, avatarURL: userData.data.picture });
            newUser.setName("");
            await newUser.save();
        }

        const createdUser = await User.findOne({ email });
        const payload = {
            id: createdUser._id
        }

        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
        await User.findByIdAndUpdate(createdUser._id, { token: token });

        return res.redirect(
            `${FRONTEND_URL}?email=${userData.data.email}&token=${token}`
        );
    }
}

module.exports = new AuthControllers()