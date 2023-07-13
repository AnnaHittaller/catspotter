import Cat from "../models/Cat.js"

export const handleAddCat = async (req, res) => {
	try {
		console.log("req.file:", req.file);
		console.log("req.body for test" , req.body)

		//if(!req.body.pattern || ) return res.send({success: false, errrorId: 2}) all required fields but needs testing what they are

		if (req.file) {
			req.body.image = req.file.filename;
		}
		const newCat = await Cat.create(req.body);
        console.log(newCat)

		//const updatedUser = await User.findByIdAndUpdate(req.body.uploader, {uploads: newCat._id})

		res.status(201).send({
			success: true,
			cat: newCat //adding the new cat object to the context 
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
				cats
			});
			console.log("cats server:",cats)
		} catch (error) {
			console.log("error listing cats:", error.message);
			res.send({
				success: false,
				message: error.message,
			});
		}
}
