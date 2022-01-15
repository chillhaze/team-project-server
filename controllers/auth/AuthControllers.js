const {User} = require("../../models/users");
const {Unauthorized} = require("http-errors");

class AuthControllers {
    async logout(req, res) {
        const {_id} = req.user;
        const user = await User.findByIdAndUpdate(_id, {token: null});
        if (!user) {
            throw new Unauthorized("Can't logout non-existing user");
        }
        res.status(204).json();
    }
}

module.exports = new AuthControllers()
