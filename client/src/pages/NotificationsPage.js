import CatInfoSheetMini from "../components/CatInfoSheetMini";
import {
	StyledDivSimple,
	StyledDivSimpleGrid,
} from "../styles/styled/Styled_Div";
import { StyledPage } from "../styles/styled/Styled_Page";
import {
	StyledBGSection,
	StyledSection,
} from "../styles/styled/Styled_Section";
import { StyledPBig } from "../styles/styled/Styled_Text";
import { StyledH2Underline, StyledH3 } from "../styles/styled/Styled_Title";
import { calculateDistance } from "../utils/CalculateDistance";
import DataMatchNotification from "../components/DataMatchNotification";
import { cloudinaryRoot } from "../utils/ImageUrlRoot";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";

export default function NotificationsPage() {
	const { state } = useContext(AppContext);
	const [filteredCatsByLocation, setFilteredCatsByLocation] = useState([]);
	const [matches, setMatches] = useState([]);
	const [showToast, setShowToast] = useState("");
	const navigate = useNavigate();

	console.log("matches:", matches)

	useEffect(() => {
		const filterCatsByLocation = async () => {
			try {
				const response = await axios.get("/cats/listbylocation");
				console.log("response for locationfilter", response);

				if (!response.data.success && response.data.errorId === "jwt expired") {
					navigate("/login");
				}

				// if (!response.data.success && response.data.errorId != "jwt expired") {
				//	setShowToast("Sorry, there was an error while fetching the area activities, please try again!")
				//}

				if (response.data.success) {
					setFilteredCatsByLocation(response.data.cats);
					//console.log(filteredCatsByLocation);
				}
			} catch (error) {
				console.log(error.message);
			}
		};
		filterCatsByLocation();
	}, [state.cats]);

	useEffect(() => {
		const fetchMatches = async () => {
			try {
				const response = await axios.get("/cats/listmatches");
				console.log("listmatches response", response);

				// should get back an array of cardData objects, so many as many cats the user has uploaded. May have to save them in a local state to map through them
				// and render only those pair where the distance between userCat and matchingCat is less than 1 km
				// first check response wheter I need to get allCardData or cardData from it for the distance filtering

				if (!response.data.success && response.data.errorId === "jwt expired") {
					navigate("/login");
				}

				if (!response.data.success && response.data.errorId != "jwt expired") {
					setShowToast(
						"Sorry, there was an error while fetching the matches, please try again!"
					);
				}

				 if (response.data.success) {
				// 		// Assuming the response contains the data in the format you expect
				// 		// You can do the distance filtering here
				 		const filteredMatches = response.data.allCardData.filter(
				 			(cardData) => {
				// 				// Loop through matchingCatId and calculate the distance for each cat
								for (const cat of cardData.matchingCat) {
									const distance = calculateDistance(
										cardData.usersOwnCat.location.coordinates[1],
										cardData.usersOwnCat.location.coordinates[0],
										cat.location.coordinates[1],
										cat.location.coordinates[0]
									);
				// 					// If the distance is less than 1 km, keep the cat in the array
										if (isNaN(distance)) {
											console.log(
												"Invalid distance calculation: ",
												cardData.usersOwnCat.location,
												cat.location
											);
										} else {
											console.log("Distance: ", distance);
										}
				 					if (distance < 1) {
				 						return true;
				 					}
				 				}
				 				return false; // If no cat matches the distance condition, filter it out
				 			}
				 		);

				 		setMatches(filteredMatches);
				 	}
			} catch (error) {
				console.log(error.message);
			}
		};
		fetchMatches();
	}, [state.cats]);

	return (
		<StyledPage display="flex" flexDirection="column">
			<StyledSection>
				<StyledH2Underline>Notifications</StyledH2Underline>
				<StyledDivSimple
					padding="1rem 0 0 0"
					flexDirection="column"
					align="flex-start">
					<StyledH3>Data matches</StyledH3>
					<StyledPBig>There are no data matches.</StyledPBig>
					{showToast ===
						"Sorry, there was an error while fetching the matches, please try again!" && (
						<Toast type="error">{showToast}</Toast>
					)}
					<DataMatchNotification />
				</StyledDivSimple>
				<StyledDivSimple
					padding="1rem 0 0 0"
					flexDirection="column"
					align="flex-start">
					<StyledH3>Area activities</StyledH3>
					<StyledDivSimpleGrid min="290px" padding="1rem 0">
						{filteredCatsByLocation && filteredCatsByLocation.length > 0 ? (
							filteredCatsByLocation.map((cat) => (
								<CatInfoSheetMini key={cat._id} cat={cat} />
							))
						) : (
							<StyledPBig>
								There were no activities in your area in the past 7 days.
							</StyledPBig>
						)}
						{showToast ===
							"Sorry, there was an error while fetching the area activities, please try again!" && (
							<Toast type="error">{showToast}</Toast>
						)}
					</StyledDivSimpleGrid>
				</StyledDivSimple>
				{/* <StyledDivSimple
					padding="1rem 0 0 0"
					flexDirection="column"
					align="flex-start">
					<StyledH3>Messages (?)</StyledH3>
					<StyledPBig>There are no new messages.</StyledPBig>
				</StyledDivSimple> */}
			</StyledSection>
			<StyledBGSection
				bgImg={
					cloudinaryRoot + "catspotter-assets/BG_upload_jetyme.jpg"
				}></StyledBGSection>
		</StyledPage>
	);
}
