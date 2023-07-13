
import Map from "../components/Map";
import CatInfoSheetMini from "../components/CatInfoSheetMini";
import { v } from "../styles/Variables";
import {
	StyledDivSimple,
	StyledDivSimpleGrid,
} from "../styles/styled/Styled_Div";
import Select from "react-select";
import BG_map from "../assets/bgImages/BG_map.jpg";
import {
	StyledButton,
	StyledPrimaryButton,
} from "../styles/styled/Styled_Button";
import { StyledPage } from "../styles/styled/Styled_Page";
import {
	StyledSection,
	StyledBGSection,
} from "../styles/styled/Styled_Section";
import {
	StyledH2,
	StyledH2Underline,
	StyledH3,
	StyledH4Underline,
} from "../styles/styled/Styled_Title";
//import { LuGlobe } from "react-icons/lu";
import { BsQuestionCircle } from "react-icons/bs";
import {
	StyledP,
	StyledPBold,
	StyledSpan,
	StyledLink,
} from "../styles/styled/Styled_Text";
import { StyledSelectWrapper } from "../styles/styled/Styled_SelectWrapper";
import {
	optionsArea,
	optionsCat,
	optionsCoatLength,
	optionsColor,
	optionsDate,
	optionsPattern,
} from "../data/SelectOptions";
import {customStyles} from "../styles/SelectCustomStyles"
import { LocationContext } from "../context/LocationContext";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MenuMini from "../components/MenuMini";
import MenuMidi from "../components/MenuMidi";
//import AreaRangeSlider from "../components/AreaRangeSlider";
import ToggleButton from "../components/ToggleButton";
import MapFindCat from "../components/leaflet/MapFindCat";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { cloudinaryRoot } from "../components/utils/ImageUrlRoot";

export default function MapPage() {
	//console.log("rerender from map page");
	//const { location, setLocation } = useContext(LocationContext);
	const {state, dispatch} = useContext(AppContext)
	const [cats, setCats] = useState([])
	const [visibleCats, setVisibleCats] = useState([]);
	const [filteredCats, setFilteredCats] = useState([])

	//separate function needed to get the distance of the points from the users location
	//set toast for filtering and fetching errors

		useEffect(() => {
			const fetchCats = async () => {
				try {
					const response = await axios.get("/cats/list");
					console.log("data map page:",response.data)

					if(response.data.success) {
						dispatch({
							type: "LIST_CATS",
							payload: response.data.cats
						})
					}

					setCats(response.data.cats); // map them directly from state contextt? then no need for passing them down as prop - TEST THIS

				} catch (error) {
					console.log(error.message);
				}
			};
			fetchCats();
		}, []);

		console.log("cats", cats)

		useEffect(()=> {
			const filterCats = async () => {
				try{	
					//complex queries lesson: done best at server or client side? or both?
				} catch (error) {
					console.log(error.message);
				}
			}
		})

	return (
		<StyledPage display="flex" flexDirection="column">
			<StyledSection>
				<StyledH2Underline>Catspotting</StyledH2Underline>
				<StyledDivSimple padding="0" flexDirection="column">
					<StyledP>
						The map shows sightings from the last 30 days as default - to view
						older posts, please adjust the filters below.
					</StyledP>
					<MapFindCat
						cats={cats}
						visibleCats={visibleCats}
						setVisibleCats={setVisibleCats}
					/>
				</StyledDivSimple>
				<StyledDivSimple padding="0" flexDirection="column" align="flex-start">
					<StyledH2>Find cats:</StyledH2>
					<StyledSpan type="icon-span">
						<StyledPBold>
							<BsQuestionCircle />
							Check <StyledLink to="/guides">the guides</StyledLink> for
							detailed description of coat patterns and colors.
						</StyledPBold>
					</StyledSpan>
					<StyledSelectWrapper>
						<Select
							options={optionsCat}
							styles={customStyles}
							placeholder="Select lost / seen..."
							isClearable
							menuPlacement="auto"
						/>
						<Select
							options={optionsPattern}
							styles={customStyles}
							placeholder="Select coat pattern..."
							isClearable
							menuPlacement="auto"
						/>
						<Select
							options={optionsColor}
							styles={customStyles}
							isMulti
							closeMenuOnSelect={false}
							placeholder="Select coat color..."
							isClearable
							menuPlacement="auto"
						/>
						<Select
							options={optionsCoatLength}
							styles={customStyles}
							placeholder="Select coat length..."
							isClearable
							menuPlacement="auto"
						/>
						<Select
							options={optionsDate}
							styles={customStyles}
							placeholder="Select timeframe..."
							isClearable
							menuPlacement="auto"
						/>
						{/* this may not be needed when latlngbounds work */}
						<Select
							options={optionsArea}
							styles={customStyles}
							placeholder="Select area radius..."
							isClearable
							menuPlacement="auto"
						/>
					</StyledSelectWrapper>
				</StyledDivSimple>
				<StyledDivSimpleGrid min="290px" padding="1rem 0">
					{/* <StyledH3>No search filters have been selected yet.</StyledH3> */}
					{/* <StyledH3>There are no matching results.</StyledH3> */}
					{visibleCats && visibleCats.length > 0 ? (
						visibleCats.map((cat) => <CatInfoSheetMini key={cat._id} cat={cat} />)
					) : (
						<StyledH3>There are no matching results in the area that is shown on the map.</StyledH3>
					)}
				</StyledDivSimpleGrid>
			</StyledSection>
			<StyledBGSection bgImg={cloudinaryRoot + "catspotter-assets/BG_map_ws93ba.jpg"}></StyledBGSection>
		</StyledPage>
	);
}
