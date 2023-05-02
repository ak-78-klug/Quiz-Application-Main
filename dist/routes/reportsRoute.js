"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const examModel_1 = __importDefault(require("../models/examModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
const reportModel_1 = __importDefault(require("../models/reportModel"));
const router = express_1.default.Router();
// add report
router.post("/add-report", authMiddleware_1.default, async (req, res) => {
    try {
        const newReport = new reportModel_1.default(req.body);
        await newReport.save();
        res.send({
            message: "Attempt added successfully",
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
// get all reports
router.post("/get-all-reports", authMiddleware_1.default, async (req, res) => {
    try {
        const { examName, userName } = req.body;
        const exams = await examModel_1.default.find({
            name: {
                $regex: examName,
            },
        });
        const matchedExamIds = exams.map((exam) => exam._id);
        const users = await userModel_1.default.find({
            name: {
                $regex: userName,
            },
        });
        const matchedUserIds = users.map((user) => user._id);
        const reports = await reportModel_1.default.find({
            exam: {
                $in: matchedExamIds,
            },
            user: {
                $in: matchedUserIds,
            },
        })
            .populate("exam")
            .populate("user")
            .sort({ createdAt: -1 });
        res.send({
            message: "Attempts fetched successfully",
            data: reports,
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
// get all reports by user
router.post("/get-all-reports-by-user", authMiddleware_1.default, async (req, res) => {
    try {
        const reports = await reportModel_1.default.find({ user: req.body.userId })
            .populate("exam")
            .populate("user")
            .sort({ createdAt: -1 });
        res.send({
            message: "Attempts fetched successfully",
            data: reports,
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
exports.default = router;
