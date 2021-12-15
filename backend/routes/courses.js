const router = require("express").Router();
let Course = require("../models/courses.model");

router.route("/").get((req, res) => {
	Course.find()
		.then((courses) => res.json(courses))
		.catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
	Course.findById(req.params.id)
		.then((courses) => res.json(courses))
		.catch((err) => res.status(400).json("Error: " + err));
});

router.route("/searchname").post((req, res) => {
	const query = req.body.query;
	Course.find({ name: { $regex: query, $options: "i" } })
		.then((courses) => res.json(courses))
		.catch((err) => res.status(400).json("Error: " + err));
});
router.route("/searchcode").post((req, res) => {
	const query = req.body.query;
	Course.find({ code: { $regex: query, $options: "i" } })
		.then((courses) => res.json(courses))
		.catch((err) => res.status(400).json("Error: " + err));
});
router.route("/searchlevel").post((req, res) => {
	const query = req.body.query;
	Course.find({ level: query })
		.then((courses) => res.json(courses))
		.catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
	const name = req.body.name;
	const code = req.body.code;
	const level = req.body.level;
	const syllabus = req.body.syllabus;

	const newCourse = new Course({
		name,
		code,
		level,
		syllabus,
	});

	newCourse
		.save()
		.then(() => res.json("Course Added"))
		.catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
