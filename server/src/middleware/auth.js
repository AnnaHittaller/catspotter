import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default function auth(req, res, next) {

	console.log("AUTH middleware here", req.cookies);

	try {
		const token = req.cookies.catspotterlogin;
		console.log("token auth", token)
		if (!token) return res.send({ success: false, errorId: 400 }); // checks if there is such a cookie

		const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
		console.log(" decodedToken:", decodedToken);

		if (!decodedToken._id) return res.send({ success: false, errorId: 9 }); // no id in the token

		req.user = decodedToken._id; //identifies user directly in the token in every route which has auth, we don't have to send the user id 
		//may have to delete this line before modifying upload page 

		next();

	} catch (error) {
		console.log("error in AUTH:", error.message);
		res.send({ success: false, errorId: error.message });
	}
}
