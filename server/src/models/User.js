import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
	username: {
		type: String,
		unique: true,
		required: true,
	},
	email: {
		type: String,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	avatar: {
		type: String,
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
	location: {
		type: {
			type: String,
			enum: ["Point"],
		},
		coordinates: {
			type: [Number], //long, lat!!!!! in this order
			default: [-0.1534, 51.64536],
		},
	},
	areaRadius: {
		type: Number,
		default: 0,
	},
	areaNotification: {
		type: Boolean,
		default: false,
	},
	dataMatchNotification: {
		type: Boolean,
		default: false,
	},
	bookmarks: [
		{
			type: Schema.Types.ObjectId,
			ref: "Cat",
		},
	],
	emailVerified: {
		type: String,
		default: false,
	},
});

userSchema.index({ "location.coordinates": "2dsphere" });

export default mongoose.model("User", userSchema)