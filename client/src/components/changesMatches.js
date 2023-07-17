const matchedCats = await Cat.find({
	status: userUploadedCat.status === "Lost" ? "Seen" : "Lost",
	color: { $all: userUploadedCat.colors, $size: color.length },
	pattern: userUploadedCat.pattern,
	coatLength: userUploadedCat.coatLength,
	location: {
		$near: {
			$geometry: { 
				type: "Point",
				coordinates: userUploadedCat.coordinates,
			},
			$maxDistance: 1000, // Distance in meters (1 km)
		},
	},
	date:
		userUploadedCat.status === "Lost"
			? { $gt: userUploadedCat.uploadDate }
			: { $lt: userUploadedCat.uploadDate },
})
	.select("-__v")
	.sort({ date: -1 });

//backend 
export const handleRetrieveUploadedCats = async (req, res) => {
	try {
		const userId = req.user; // Assuming the user ID is stored in req.user

		// Retrieve uploaded cats for the user
		const uploadedCats = await Cat.find({ uploader: userId }).select("-__v");

		res.send({
			success: true,
			uploadedCats,
		});
	} catch (error) {
		console.log("error retrieving uploaded cats:", error.message);
		res.send({
			success: false,
			message: error.message,
		});
	}
};

// plus retrieve all cats

// Backend Controller to Find Matches and Create Card Data
export const handleFindMatchesAndCreateCards = async (req, res) => {
  try {
    const userId = req.user; // Assuming the user ID is stored in req.user

    // Retrieve uploaded cats for the user
    const uploadedCats = await Cat.find({ uploader: userId }).select("-__v");

    // Retrieve all cats
    const allCats = await Cat.find().select("-__v");

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
					color: { $all: uploadedCat.color, $size: color.length },
					pattern: uploadedCat.pattern,
					coatLength: uploadedCat.coatLength,
					location: {
						$nearSphere: {
							$geometry: uploadedCat.location,
							$maxDistance: 1000, // Distance in meters (1 km)
						},
					},
					date:
						uploadedCat.status === "Lost"
							? { $gt: uploadedCat.date }
							: { $lt: uploadedCat.date },
				};

        const matches = await Cat.find(matchingCatsQuery).select("-__v");
        matchingCats.push(...matches);
      }

      // Create card data for uploaded cat and matching cats
      if (matchingCats.length > 0) {
        cardData.push({
          uploadedCat,
          matchingCats,
        });
		console.log(matchingCats)
      }
    }

    res.send({
      success: true,
      cardData,
    });
  } catch (error) {
    console.log("error finding matches and creating cards:", error.message);
    res.send({
      success: false,
      message: error.message,
    });
  }
};