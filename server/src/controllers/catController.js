import Cat from "../models/Cat.js";

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
	console.log(req.params.id, req.user)
	try {
		const catToDelete = await Cat.findOneAndDelete({
			_id: req.params.id,
			uploader: req.user
		})
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
}