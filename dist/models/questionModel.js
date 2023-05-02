"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const questionSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    correctOption: {
        type: String,
        required: true,
    },
    options: {
        type: Object,
        required: true,
    },
    exam: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "exams",
    },
}, {
    timestamps: true,
});
const Question = mongoose_1.default.model("questions", questionSchema);
exports.default = Question;
