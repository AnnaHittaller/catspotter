import Cat from "../models/Cat.js";
import User from "../models/User.js";

export const handleAddCat = async (req, res) => {
	try {
		console.log("req.file:", req.file);
		console.log("req.body for test", req.body);

		//if(!req.body.pattern || ) return res.send({success: false, errrorId: 2}) all required fields but needs testing what they are

		if (req.file) {
			req.body.image = req.file.filename;
		}
		const newCat = await Cat.create(req.body);
		console.log(newCat);

		//const updatedUser = await User.findByIdAndUpdate(req.body.uploader, {uploads: newCat._id})

		res.status(201).send({
			success: true,
			cat: newCat, //adding the new cat object to the context
		});
	} catch (error) {
		console.log("error adding cat:", error.message);
		res.send({
			success: false,
			message: error.message,
		});
	}
};

export const handleListCats = async (req, res) => {
	try {
		const cats = await Cat.find().select("-__v").sort({ date: -1 });
		res.send({
			success: true,
			cats,
		});
		//console.log("cats server:",cats)
	} catch (error) {
		console.log("error listing cats:", error.message);
		res.send({
			success: false,
			message: error.message,
		});
	}
};

export const handleListCat = async (req, res) => {
	try {
		const cat = await Cat.findById(req.params.id);
		res.send({
			success: true,
			cat,
		});
	} catch (error) {
		console.log("error listing a cat:", error.message);
		res.send({
			success: false,
			message: error.message,
		});
	}
};

export const handleDeleteCat = async (req, res) => {
	console.log("delete cat");
	console.log(req.params.id, req.user);
	try {
		const catToDelete = await Cat.findOneAndDelete({
			_id: req.params.id,
			uploader: req.user,
		});
		console.log("deleted cat", catToDelete);
		res.send({ success: true });
	} catch (error) {
		console.log("error deleting a cat:", error.message);
		res.send({
			success: false,
			message: error.message,
		});
	}
};

export const handleUpdateCat = async (req, res) => {
	try {
		if (req.file) {
			req.body.image = req.file.filename;
		}

		const editedCat = await Cat.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});

		console.log("updatedCat:", editedCat);

		res.send({
			success: true,
			cat: editedCat,
		});
	} catch (error) {
		console.log("error handleUpdateCat", error.message);

		res.send({
			success: false,
			message: error.message,
		});
	}
};

export const handleFilterCatsByLocation = async (req, res) => {
	try {
		console.log("handleListByLocation here");
		const user = await User.findById(req.user);
		const areaRadius = user.areaRadius;
		const { coordinates } = user.location;

		const startDate = new Date();
		startDate.setDate(startDate.getDate() - 7);

		const cats = await Cat.find({
			date: { $gte: startDate },
			"location.coordinates": {
				$nearSphere: {
					$geometry: {
						type: "Point",
						coordinates: coordinates,
					},
					$maxDistance: areaRadius * 1000, // Convert km to meters
				},
			},
		})
			.select("-__v")
			.sort({ date: -1 });

		res.send({
			success: true,
			cats,
		});
	} catch (error) {
		console.log("Error filtering cats:", error.message);
		res.send({
			success: false,
			message: error.message,
		});
	}
};

export const handleFindMatches = async (req, res) => {
	try {
		console.log("handleListMatches here");
		// Retrieve uploaded cats for the user
		const usersCats = await Cat.find({ uploader: req.user }).select("-__v");
		//console.log("uploadedcats", uploadedCats);

		// Retrieve all other cats
		const otherCats = await Cat.find({ uploader: { $ne: req.user } }).select(
			"-__v"
		);
		//console.log("other cats",otherCats);

		const allCardData = [];

		// Iterate through uploaded cats
		for (const usersCat of usersCats) {
			// Object to store the card data
			let cardData = {
				usersOwnCat: usersCat,
				matchingCat: [],
			};

			cardData.matchingCat = otherCats.filter(
				(cat) => cat.status != usersCat.status
			);

			cardData.matchingCat = cardData.matchingCat.filter(
				(cat) => cat.pattern == usersCat.pattern
			);

			cardData.matchingCat = cardData.matchingCat.filter((cat) => {
				return (
					cat.color.every((item) => usersCat.color.includes(item)) &&
					cat.color.length === usersCat.color.length
				);
			});

			cardData.matchingCat = cardData.matchingCat.filter((cat) => {
				if (usersCat.status === "Lost") {
					return cat.date >= usersCat.date;
				} else if (usersCat.status === "Seen") {
					return cat.date <= usersCat.date;
				}
			});

			allCardData.push(cardData);
		}

		console.log(allCardData); //object with usersCatId and an array of matching cats, not filtered for distance as it will be done on the frontend

		res.send({
			success: true,
			allCardData,
		});
	} catch (error) {
		console.log("error finding matches:", error);

		res.send({
			success: false,
			message: error.message,
		});
	}
};
