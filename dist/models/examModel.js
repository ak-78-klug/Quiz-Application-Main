"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const examSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    totalMarks: {
        type: Number,
        required: true,
    },
    passingMarks: {
        type: Number,
        required: true,
    },
    questions: {
        type: [mongoose_1.default.Schema.Types.ObjectId],
        ref: "questions",
        required: true,
    },
}, {
    timestamps: true,
});
const Exam = mongoose_1.default.model("exams", examSchema);
exports.default = Exam;
