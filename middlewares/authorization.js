const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const path = require("path");
const envPath = path.join(__dirname, "../.env");
require("dotenv").config({ path: envPath });

const { SECRET_KEY } = process.env;

async function authorization(req, res, next) {
    const { auth = ""} = req.header;
    const [bearer, token] = auth.split(" ");
    try {
        if (bearer !== "Bearer") {
            throw new Unauthorized("Not authorized");
        }
        const { id } = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);
        if (!user || !user.token) {
            throw new Unauthorized("Not authorized");
        }
        req.user = user;
        next();
    }
    catch (error) {
        if (error.message === "Invalid sugnature") {
            error.status = 401;
        }
        next(error);
    }
}

module.exports = authorization;