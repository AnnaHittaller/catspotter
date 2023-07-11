import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default function auth(req, res, next) {
	console.log("AUTH middleware here");
	console.log("AUTH middleware here", req.cookies);

	try {
		const token = req.cookies.wdpt014;
		if (!token) return res.send({ success: false, errorId: 400 }); // checks if there is such a cookie

		const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
		console.log(" decodedToken:", decodedToken);

		if (!decodedToken._id) return res.send({ success: false, errorId: 9 }); // no id in the token

		req.user = decodedToken._id; 

		next();
	} catch (error) {
		console.log("error in AUTH:", error.message);
		res.send({ success: false, errorId: error.message });
	}
}
