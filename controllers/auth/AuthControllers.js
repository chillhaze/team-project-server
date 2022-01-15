const { Conflict } = require("http-errors");
const { User } = require("../../models/users");
const { nanoid } = require("nanoid");


class AuthControllers {
    async register(req, res) {
        const { name, email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            throw new Conflict("Email already in use");
        }
        const verifyToken = nanoid();
        const newUser = new User({ email, verifyToken });
        newUser.setPassword(password);
        newUser.setAvatar(email);
        newUser.setName(name);
        await newUser.save();
        const {avatarURL: generatedAvatar, name: generatedName} = newUser;

        res.status(201).json({
            status: "success",
            code: 201,
            data: {
                user: {
                    name: generatedName,
                    email,
                    verifyToken,
                    avatarURL: generatedAvatar
                }
            }
        });
    }

    
}

module.exports = new AuthControllers()
