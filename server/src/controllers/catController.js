import Cat from "../models/Cat.js"

export const handleAddCat = async (req, res) => {
	try {
		console.log("req.file:", req.file);

		if (req.file) {
			req.body.image = req.file.filename;
		}
		const newCat = await Cat.create(req.body);
        console.log(newCat)

		res.status(201).send({
			success: true,
		});
	} catch (error) {
		console.log("error adding cat:", error.message);
		res.send({
			success: false,
			message: error.message,
		});
	}

};
