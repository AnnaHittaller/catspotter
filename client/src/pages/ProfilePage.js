import {
	StyledDivBorder,
	StyledDivSimple,
	// StyledDivSimpleGrid,
} from "../styles/styled/Styled_Div";
import { StyledPage } from "../styles/styled/Styled_Page";
import {
	StyledBGSection,
	StyledSection,
} from "../styles/styled/Styled_Section";
import {
	StyledP,
	StyledPBig,
	StyledPBold,
	StyledSpan,
	StyledSpanBold,
} from "../styles/styled/Styled_Text";
import { StyledH2Underline, StyledH3, StyledH4Underline } from "../styles/styled/Styled_Title";
// import Map from "../components/Map";
// import BG_profile from "../assets/bgImages/BG_profile.jpg";
import {
	//StyledButton,
	StyledPrimaryButton,
} from "../styles/styled/Styled_Button";
import default_profile from "../assets/appImages/default_profile_big.png";
import { StyledUserData } from "../styles/styled/Styled_UserForms";
// import CatInfoSheetMini from "../components/CatInfoSheetMini";
// import AreaRangeSlider from "../components/leaflet/AreaRangeSlider";
// import ToggleButton from "../components/ToggleButton";
// import MapForArea from "../components/MapForArea";
import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import MapUser from "../components/leaflet/MapUser";
import axios from "axios";
import { cloudinaryRoot } from "../utils/ImageUrlRoot";

export default function ProfilePage() {
	//const {id} = useParams()
	//const dataMatch = "dataMatch";
	//const areaActivity = "areaActivity";
	const { state, dispatch } = useContext(AppContext);

	//marker on the map only if address was specified!!!

	const handleDeleteProfile = async () => {
		try {
			const response = await axios.delete(`/users/delete/${state.user._id}`);
			console.log("delete response", response);

			//dispatch({ type: "LOGOUT" });
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<StyledPage display="flex" flexDirection="column">
			<StyledSection>
				<StyledH2Underline>Profile & settings</StyledH2Underline>
				<StyledDivSimple
					flexDirection="column"
					align="flex-start">
					
					<StyledUserData>
						<StyledDivSimple padding="0">
							<StyledDivSimple flexDirection="column">
								<img
									style={{
										width: "120px",
										height: "120px",
										borderRadius: "50%",
									}}
									src={
										state.user.avatar
											? cloudinaryRoot + state.user.avatar
											: cloudinaryRoot +
											  "catspotter-assets/default_profile_small_g8rp1h.png"
									}
									alt="user profile"
								/>
								<StyledH4Underline>{state.user.username}</StyledH4Underline>
								<StyledPBold>{state.user.email}</StyledPBold>
								<StyledDivSimple flexDirection="column">
									{!state.user.address && (
										<StyledPBold>
											"No address and area have been specified yet"
										</StyledPBold>
									)}
									{state.user.address.road && (
										<StyledPBold>{state.user.address.road}</StyledPBold>
									)}
									{state.user.address.suburb && (
										<StyledPBold>{state.user.address.suburb}</StyledPBold>
									)}
									<StyledSpanBold>

									{state.user.address.city && 
										state.user.address.city
									}, {" "}
									{state.user.address.postcode && 
										state.user.address.postcode
									}
									</StyledSpanBold>
								</StyledDivSimple>
								<StyledP>
									Data match notifications:{" "}
									<StyledSpanBold>
										{state.user.dataMatchNotification ? "ON" : "OFF"}
									</StyledSpanBold>
								</StyledP>
								<StyledP>
									Area activity notifications:{" "}
									<StyledSpanBold>
										{state.user.areaNotification ? "ON" : "OFF"}
									</StyledSpanBold>
								</StyledP>
							</StyledDivSimple>
							<StyledDivSimple>
								<MapUser height="400px" />
							</StyledDivSimple>
						</StyledDivSimple>
					</StyledUserData>

					<StyledDivSimple>
						<StyledP>
							Email address, city and area are not public data and serve only
							the purpose of showing location-based notifications.
						</StyledP>
					</StyledDivSimple>
						<StyledPrimaryButton style={{alignSelf: "center"}}>
							<Link to="/updateprofile">Edit user data</Link>
						</StyledPrimaryButton>
				</StyledDivSimple>
				{/* <StyledDivBorder
					border="mobile-none"
					flexDirection="column"
					align="flex-start">
					<StyledH3>My posts</StyledH3>
					<StyledPBig>You haven't uploaded anything yet.</StyledPBig>
					<CatInfoSheetMini />
				</StyledDivBorder> */}
			</StyledSection>
			<StyledBGSection bgImg="https://res.cloudinary.com/dgum1eu6e/image/upload/v1688899663/catspotter-assets/BG_profile_cdrhze.jpg"></StyledBGSection>
		</StyledPage>
	);
}
