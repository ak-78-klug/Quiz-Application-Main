"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect(process.env.MONGO_URL);
const connection = mongoose_1.default.connection;
connection.on("connected", () => {
    console.log("Mongo Db Connection Successful");
});
connection.on("error", (err) => {
    console.log("Mongo Db Connection Failed");
});
exports.default = connection;
