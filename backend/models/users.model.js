const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const studentSchema = new Schema(
	{
		id: { type: String, required: true, trim: true },
		favorites: [],
	},
	{
		timestamp: true,
	}
);

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
