"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const examModel_1 = __importDefault(require("../models/examModel"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const questionModel_1 = __importDefault(require("../models/questionModel"));
const router = express_1.default.Router();
// add exam
router.post("/add", authMiddleware_1.default, async (req, res) => {
    try {
        // check if exam already exists
        const examExists = await examModel_1.default.findOne({ name: req.body.name });
        if (examExists) {
            return res
                .status(200)
                .send({ message: "Exam already exists", success: false });
        }
        req.body.questions = [];
        const newExam = new examModel_1.default(req.body);
        await newExam.save();
        res.send({
            message: "Exam added successfully",
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
// get all exams
router.post("/get-all-exams", authMiddleware_1.default, async (req, res) => {
    try {
        const exams = await examModel_1.default.find({});
        res.send({
            message: "Exams fetched successfully",
            data: exams,
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
// get exam by id
router.post("/get-exam-by-id", authMiddleware_1.default, async (req, res) => {
    try {
        const exam = await examModel_1.default.findById(req.body.examId).populate("questions");
        res.send({
            message: "Exam fetched successfully",
            data: exam,
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
// edit exam by id
router.post("/edit-exam-by-id", authMiddleware_1.default, async (req, res) => {
    try {
        await examModel_1.default.findByIdAndUpdate(req.body.examId, req.body);
        res.send({
            message: "Exam edited successfully",
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
// delete exam by id
router.post("/delete-exam-by-id", authMiddleware_1.default, async (req, res) => {
    try {
        await examModel_1.default.findByIdAndDelete(req.body.examId);
        res.send({
            message: "Exam deleted successfully",
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
// add question to exam
router.post("/add-question-to-exam", authMiddleware_1.default, async (req, res) => {
    try {
        // add question to Questions collection
        const newQuestion = new questionModel_1.default(req.body);
        const question = await newQuestion.save();
        // add question to exam
        const exam = await examModel_1.default.findById(req.body.exam);
        exam.questions.push(question._id);
        await exam.save();
        res.send({
            message: "Question added successfully",
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
// edit question in exam
router.post("/edit-question-in-exam", authMiddleware_1.default, async (req, res) => {
    try {
        // edit question in Questions collection
        await questionModel_1.default.findByIdAndUpdate(req.body.questionId, req.body);
        res.send({
            message: "Question edited successfully",
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
// delete question in exam
router.post("/delete-question-in-exam", authMiddleware_1.default, async (req, res) => {
    try {
        // delete question in Questions collection
        await questionModel_1.default.findByIdAndDelete(req.body.questionId);
        // delete question in exam
        const exam = await examModel_1.default.findById(req.body.examId);
        exam.questions = exam.questions.filter((question) => question._id != req.body.questionId);
        await exam.save();
        res.send({
            message: "Question deleted successfully",
            success: true,
        });
    }
    catch (error) { }
});
exports.default = router;
