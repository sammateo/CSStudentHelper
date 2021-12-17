const router = require("express").Router();
let Student = require("../models/students.model");

router.route("/").get((req, res) => {
	Student.find()
		.then((students) => res.json(students))
		.catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
	// console.log(req.params.id);
	Student.find({ sub: req.params.id })
		.then((students) => {
			res.json(students);
			// console.log(students);
		})
		.catch((err) => res.status(400).json("Error: " + err));
});

// router.route("/:id").get((req, res) => {
// 	Student.findById(req.params.id)
// 		.then((students) => res.json(students))
// 		.catch((err) => res.status(400).json("Error: " + err));
// });

router.route("/addfavorite").post((req, res) => {
	const sub = req.body.sub;
	const favorite = req.body.favorite;
	// console.log(req.body);
	Student.updateOne(
		{ sub: sub },
		{ $addToSet: { favorites: favorite } },
		{ upsert: true }
	)
		.then(() => res.json(`Favorites Updated`))
		.catch((err) => res.status(400).json("Error: " + err));
});

router.route("/removefavorite").post((req, res) => {
	const sub = req.body.sub;
	const favorite = req.body.favorite;
	// console.log("Remove: ");
	// console.log(req.body);
	Student.updateOne({ sub: sub }, { $pull: { favorites: favorite } })
		.then(() => res.json(`Favorite Removed: ${favorite}`))
		.catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
