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

import DataMatchNotification from "../components/DataMatchNotification";
import { cloudinaryRoot } from "../utils/ImageUrlRoot";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";

export default function NotificationsPage() {
	const [filteredCatsByLocation, setFilteredCatsByLocation] = useState([]);
	const {state} = useContext(AppContext)

	useEffect(() => {
		const filterCatsByLocation = async () => {
			try {
				const response = await axios.get("/cats/listbylocation");
				console.log("response for locationfilter", response);

				if (response.data.success) {
					setFilteredCatsByLocation(response.data.cats);
					//console.log(filteredCatsByLocation);
				}
			} catch (error) {
				console.log(error.message);
			}
		};
		filterCatsByLocation();
	}, state.cats);

	useEffect(()=> {
		const fetchMatches = async () =>{
			try {
				const response = await axios.get("/cats/listmatches" )
				console.log("listmatches response", response)

			} catch (error) {
				console.log(error.message)
			}
		}
		fetchMatches()
	}, state.cats)

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
