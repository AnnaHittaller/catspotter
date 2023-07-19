import mongoose from "mongoose";

const { Schema } = mongoose;

const catSchema = new Schema({
	status: {
		type: String,
		required: true,
	},
	pattern: {
		type: String,
		required: true,
	},
	color: {
		type: [String],
		required: true,
	},
	coatLength: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
	time: String,
	image: {
		type: [String],
	},
	notes: String,
	chipNr: String,
	reward: Number,
	contact: String,
	location: {
		type: {
			type: String,
			enum: ["Point"],
			required: true,
			index: "2dsphere",
		},
		coordinates: {
			type: [Number], //long, lat!!!!! in this order
			required: true,
		},
	},
	address: {
		type: {
			street: String,
			postcode: String,
			city: String,
			suburb: String,
			road: String,
		},
	},
	uploader: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
});

catSchema.index({ "location.coordinates": "2dsphere" });

export default mongoose.model("Cat", catSchema)