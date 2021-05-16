const mongoose = require('mongoose');

// Initalize Schema
const Schema = mongoose.Schema

// Define a QuizSchema
const ResultSchema = new Schema({
    score: Number,
    totalMarks: Number,
    student: String,
    quiz: String,
    date :Date
   


});

ResultSchema.index({ _id: 1, title: -1 });
const Result = mongoose.model('Result', ResultSchema);
module.exports = Result;
