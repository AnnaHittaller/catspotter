import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const handleRegisterUser = async (req, res) => {
	console.log("handleRegisterUser", req.body);

	try {
		const { email, password, username } = req.body;

		if (!email || !password || !username)
			return res.send({ success: false, errorId: 1 });

		const salt = await bcrypt.genSalt(10);

		const hashedPass = await bcrypt.hash(password, salt);

		req.body.password = hashedPass;

		const newUser = await User.create(req.body);

		res.status(201).send({
			success: true,
		});
		console.log("new user:", newUser);
	} catch (error) {
		console.log("error registering user:", error.message);
		res.send({
			success: false,
			message: error.message,
		});
	}
};

export const handleLoginUser = async (req, res) => {
	console.log("handleLoginuser", req.body);

	try {
		const { usernameoremail, password } = req.body;

		if (!usernameoremail || !password)
			return res.send({ success: false, errorId: 1 });

		const user = await User.findOne({
			$or: [{ username: usernameoremail }, { email: usernameoremail }],
		});

		if (!user) return res.send({ success: false, errorId: 2 });

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) return res.send({ success: false, errorId: 2 });

		console.log("logged in user:", user);

		const newUser = user.toObject();
		delete newUser.password;

		const token = jwt.sign({ _id: user._id }, process.env.JWT_TOKEN, {
			expiresIn: "1d",
		});

		console.log("token:", token);

		res.cookie("catspotterlogin", token);

		res.status(200).send({ success: true, user: newUser });
	} catch (error) {
		console.log("error logging in user:", error.message);

		res.send({
			success: false,
			message: error.message,
		});
	}
};

export const handleLogoutUser = async (req, res) => {
	console.log("handleLogout function");

	try {
		res.clearCookie("catspotterlogin");
		res.send("logout successful");
	} catch (error) {
		console.log("🚀 ~ error logging out user:", error.message);
		res.send("Error in logout", error.message);
	}
};

export const handleDeleteUser = async (req, res) => {
	console.log("handleDeleteUser:", req.params);

	try {
		const deletedUser = await User.findByIdAndDelete(req.params.id);
		console.log("deleted user:", deletedUser);

		res.status(200).send({ success: true });
	} catch (error) {
		console.log("error deleting user:", error.message);

		res.send({
			success: false,
			message: error.message,
		});
	}
};

export const handleUpdateUser = async (req, res) => {

}