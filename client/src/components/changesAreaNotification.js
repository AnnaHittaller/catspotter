
//changes made in login: when cats are fetched correctly when logging in, take out List Cats function from from homepage but not from map because that has to be available for non logged in users too

// plus changes in protectedLayout!!!

// backend controller:


export const handleFilterCatsByLocation = async (req, res) => {
	try {
		const { areaRadius } = req.user.areaRadius;
		const { coordinates } = req.user.location;

		const startDate = new Date();
		startDate.setDate(startDate.getDate() - 30);

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

//corresponding frontend function:

export const filterCatsByLocation = async () => {
	try {
		const response = await axios.get("/cats/filter-by-location"); //have to establish the routes in catRoutes, in Allroutes theres no need

		if (response.data.success) {
			const filteredCatsbyLocation = response.data.cats;
			// Process the filtered cats as needed
			// ...
			return filteredCatsbyLocation;
		}
	} catch (error) {
		console.log(error.message);
	}
};