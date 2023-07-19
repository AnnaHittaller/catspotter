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
		const uploadedCats = await Cat.find({ uploader: req.user }).select("-__v");
		//console.log("uploadedcats", uploadedCats);

		// Retrieve all cats
		const allCats = await Cat.find().select("-__v");
		//console.log("allcats", allCats);

		// Array to store the card data
		const cardData = [];

		// Iterate through uploaded cats
		for (const uploadedCat of uploadedCats) {
			const matchingCats = [];

			// Iterate through all cats
			for (const cat of allCats) {
				// Skip if the cat is the same as the uploaded cat

				// Check for matches based on properties and location
				const matchingCatsQuery = {
					_id: { $ne: uploadedCat._id },
					status: uploadedCat.status === "Lost" ? "Seen" : "Lost",
					color: { $all: uploadedCat.color, $size: uploadedCat.color.length },
					// color: {
					// 	$all: uploadedCat.color.filter((c) => c !== undefined),
					// 	$size: uploadedCat.color.length,
					// },
					pattern: uploadedCat.pattern,
					coatLength: uploadedCat.coatLength,
					location: {
						$nearSphere: {
							$geometry: {
								type: "Point",
								coordinates: uploadedCat.location.coordinates,
							},
							$maxDistance: 1000, // Distance in meters (1 km)
						},
					},
					date:
						uploadedCat.status === "Lost"
							? { $gt: uploadedCat.date }
							: { $lt: uploadedCat.date },
				};

				// function findUndefinedData(obj, parentKey = "") {
				// 	for (const key in obj) {
				// 		if (typeof obj[key] === "object" && obj[key] !== null) {
				// 			// If the value is an object, recursively check its properties
				// 			findUndefinedData(obj[key], `${parentKey}.${key}`);
				// 		} else if (obj[key] === undefined) {
				// 			// If the value is undefined, log the path of the undefined property
				// 			console.log(`Undefined value found at path: ${parentKey}.${key}`);
				// 		}
				// 	}
				// }

				// Call the function to find undefined data in the matchingCatsQuery
				//findUndefinedData(matchingCatsQuery);

				// console.log(
				// 	"matchingCatsQuery:",
				// 	JSON.stringify(matchingCatsQuery, null, 2)
				// );

				const matches = await Cat.find(matchingCatsQuery).select("-__v");
				matchingCats.push(...matches);
			}

			// Create card data for uploaded cat and matching cats
			if (matchingCats.length > 0) {
				cardData.push({
					uploadedCat,
					matchingCats,
				});
				console.log(matchingCats);
			}
		}

		res.send({
			success: true,
			cardData,
		});
	} catch (error) {
		console.log("error finding matches and creating cards:", error);
		console.log("Error in matchingCatsQuery:", matchingCatsQuery);
		res.send({
			success: false,
			message: error.message,
		});
	}
};
