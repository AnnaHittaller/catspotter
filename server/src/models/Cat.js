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
	image: {
		type: [String],
	},
	notes: {
		type: String,
	},
	chipNr: {
		type: String,
	},
	reward: {
		type: Number,
	},
	location: {
		type: {
			type: String,
			enum: ["Point"],
			required: true,
		},
		coordinates: {
			type: [Number], //long, lat!!!!! in this order
		},
	},
	address: {
		type: String,
	},
	uploader: {
		type: Schema.Types.ObjectId,
		ref: "User"
	}
});

catSchema.index({ "location.coordinates": "2dsphere" });

export default mongoose.model("Cat", catSchema)