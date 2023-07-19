import { useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const FetchCats = () => {
	const { dispatch } = useContext(AppContext);

	useEffect(() => {
		const fetchCats = async () => {
			try {
				const response = await axios.get("/cats/list");
				console.log("fetchCats:", response.data);

				if (response.data.success) {
					dispatch({
						type: "LIST_CATS",
						payload: response.data.cats,
					});
				}
			} catch (error) {
				console.log(error.message);
			}
		};
		fetchCats();
	}, [dispatch]);

	return null;
};

export default FetchCats;

//use it as a component after importing in JSX: <FetchCats/>
//for mapPage and every other page which can be visited directly without logging in and needs the cats from context
