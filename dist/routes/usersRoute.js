"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userModel_1 = __importDefault(require("../models/userModel"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const router = express_1.default.Router();
// user registration
router.post("/register", async (req, res) => {
    try {
        // check if user already exists
        const userExists = await userModel_1.default.findOne({ email: req.body.email });
        if (userExists) {
            return res
                .status(200)
                .send({ message: "User already exists", success: false });
        }
        // hash password
        const salt = await bcryptjs_1.default.genSalt(10);
        const hashedPassword = await bcryptjs_1.default.hash(req.body.password, salt);
        req.body.password = hashedPassword;
        // create new user
        const newUser = new userModel_1.default(req.body);
        await newUser.save();
        res.send({
            message: "User created successfully",
            success: true,
        });
    }
    catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false,
        });
    }
});
// user login
router.post("/login", async (req, res) => {
    try {
        // check if user exists
        const user = await userModel_1.default.findOne({ email: req.body.email });
        if (!user) {
            return res
                .status(200)
                .send({ message: "User does not exist", success: false });
        }
        // check password
        const validPassword = await bcryptjs_1.default.compare(req.body.password, user.password);
        if (!validPassword) {
            return res
                .status(200)
                .send({ message: "Invalid password", success: false });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        res.send({
            message: "User logged in successfully",
            success: true,
            data: token,
        });
    }
    catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false,
        });
    }
});
// get user info
router.post("/get-user-info", authMiddleware_1.default, async (req, res) => {
    try {
        const user = await userModel_1.default.findById(req.body.userId);
        res.send({
            message: "User info fetched successfully",
            success: true,
            data: user,
        });
    }
    catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false,
        });
    }
});
exports.default = router;
