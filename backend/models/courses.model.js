const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const courseSchema = new Schema(
	{
		name: { type: String, required: true, trim: true },
		code: { type: String, required: true, trim: true },
		level: { type: Number, required: true, trim: true },
		syllabus: [],
	},
	{
		timestamp: true,
	}
);

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
