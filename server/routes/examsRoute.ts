import express from "express";
import { Request, Response } from "express";

import Exam from "../models/examModel";
import authMiddleware from "../middlewares/authMiddleware";
import Question from "../models/questionModel";

const router = express.Router();

// add exam
router.post("/add", authMiddleware, async (req: Request, res: Response) => {
  try {
    // check if exam already exists
    const examExists = await Exam.findOne({ name: req.body.name });
    if (examExists) {
      return res
        .status(200)
        .send({ message: "Exam already exists", success: false });
    }
    req.body.questions = [];
    const newExam = new Exam(req.body);
    await newExam.save();
    res.send({
      message: "Exam added successfully",
      success: true,
    });
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});

// get all exams
router.post(
  "/get-all-exams",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const exams = await Exam.find({});
      res.send({
        message: "Exams fetched successfully",
        data: exams,
        success: true,
      });
    } catch (error: any) {
      res.status(500).send({
        message: error.message,
        data: error,
        success: false,
      });
    }
  }
);

// get exam by id
router.post(
  "/get-exam-by-id",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const exam = await Exam.findById(req.body.examId).populate("questions");
      res.send({
        message: "Exam fetched successfully",
        data: exam,
        success: true,
      });
    } catch (error: any) {
      res.status(500).send({
        message: error.message,
        data: error,
        success: false,
      });
    }
  }
);

// edit exam by id
router.post(
  "/edit-exam-by-id",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      await Exam.findByIdAndUpdate(req.body.examId, req.body);
      res.send({
        message: "Exam edited successfully",
        success: true,
      });
    } catch (error: any) {
      res.status(500).send({
        message: error.message,
        data: error,
        success: false,
      });
    }
  }
);

// delete exam by id
router.post(
  "/delete-exam-by-id",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      await Exam.findByIdAndDelete(req.body.examId);
      res.send({
        message: "Exam deleted successfully",
        success: true,
      });
    } catch (error: any) {
      res.status(500).send({
        message: error.message,
        data: error,
        success: false,
      });
    }
  }
);

// add question to exam

router.post(
  "/add-question-to-exam",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      // add question to Questions collection
      const newQuestion = new Question(req.body);
      const question = await newQuestion.save();

      // add question to exam
      const exam = await Exam.findById(req.body.exam);
      exam!.questions.push(question._id);
      await exam!.save();
      res.send({
        message: "Question added successfully",
        success: true,
      });
    } catch (error: any) {
      res.status(500).send({
        message: error.message,
        data: error,
        success: false,
      });
    }
  }
);

// edit question in exam
router.post(
  "/edit-question-in-exam",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      // edit question in Questions collection
      await Question.findByIdAndUpdate(req.body.questionId, req.body);
      res.send({
        message: "Question edited successfully",
        success: true,
      });
    } catch (error: any) {
      res.status(500).send({
        message: error.message,
        data: error,
        success: false,
      });
    }
  }
);

// delete question in exam
router.post(
  "/delete-question-in-exam",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      // delete question in Questions collection
      await Question.findByIdAndDelete(req.body.questionId);

      // delete question in exam
      const exam = await Exam.findById(req.body.examId);
      exam!.questions = exam!.questions.filter(
        (question: any) => question._id != req.body.questionId
      );
      await exam!.save();
      res.send({
        message: "Question deleted successfully",
        success: true,
      });
    } catch (error) {}
  }
);

export default router;
