import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendEmail.js";

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

		const token = jwt.sign({ _id: newUser._id }, process.env.JWT_TOKEN, {
			expiresIn: "1d",
		});

		sendEmail(token);

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
		//if (!user.emailVerified) return res.send({ success: false, errorId: 3 });

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
		console.log("error logging out user:", error.message);
		res.send("Error in logout", error.message);
	}
};

export const handleEmailConfirm = async (req, res) => {
	console.log("handleemailconfirm function", req.body);

	try {
		const decodedToken = jwt.verify(req.body.token, process.env.JWT_TOKEN);

		const user = User.findByIdAndUpdate(
			decodedToken._id,
			{ emailVerified: true },
			{ new: true }
		);

		if(!user) return res.send({success: false, errorId: 1})

		res.send({success: true});
	} catch (error) {
		console.log(" error at email confirm:", error.message);
		res.send("Error in confirming the email", error.message);
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


export const handleForgotPassword = async (req, res) => {
	console.log(" handleForgotPass:", req.body);

	try {
		const { usernameOrEmail } = req.body;

		if (!usernameOrEmail) return res.send({ success: false, errorId: 0 });

		const user = await User.findOne({
			$or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
		});
		console.log("user:", user);

		if (!user) return res.send({ success: false, errorId: 1 });

		const token = jwt.sign({ _id: user._id }, process.env.JWT_TOKEN, {
			expiresIn: "1d",
		});
		console.log("token:", token);

		sendEmail(token, "forgotPassword");

		res.send({ success: true });
	} catch (error) {
		console.log("🚀 ~ error handleForgotPassword:", error.message);

		res.send("Error in handleForgotPassword" + error.message);
	}
};
export const handleChangePassword = async (req, res) => {
	console.log("handleChangePassword:", req.body);

	try {
		const { token, password } = req.body;

		if (!token || !password) return res.send({ success: false, errorId: 0 });

		const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
		console.log(" decodedToken:", decodedToken);

		const salt = await bcrypt.genSalt(10);
		const hashedPass = await bcrypt.hash(password, salt);

		const user = await User.findByIdAndUpdate(
			decodedToken._id,
			{ password: hashedPass },
			{ new: true }
		);
		console.log("user:", user);

		if (!user) return res.send({ success: false, errorId: 1 });

		res.send({ success: true });
	} catch (error) {
		console.log("error handleChangePassword:", error.message);

		res.send("Error in handleChangePassword" + error.message);
	}
};


export const handleUpdateUser = async (req, res) => {};