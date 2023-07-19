

import CatInfoSheetMini from "../components/CatInfoSheetMini";
import {
	StyledDivSimple,
	StyledDivSimpleGrid,
} from "../styles/styled/Styled_Div";
import Select from "react-select";
import { StyledPage } from "../styles/styled/Styled_Page";
import {
	StyledSection,
	StyledBGSection,
} from "../styles/styled/Styled_Section";
import {
	StyledH2Underline,
	StyledH3,
} from "../styles/styled/Styled_Title";
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
import { useContext, useEffect, useState } from "react";
import MapFindCat from "../components/leaflet/MapFindCat";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { cloudinaryRoot } from "../utils/ImageUrlRoot"
import { filterCats } from "../utils/CatUtils";

export default function MapPage() {

	const {state, dispatch} = useContext(AppContext)
	const [cats, setCats] = useState([])
	const [visibleCats, setVisibleCats] = useState([]);
	const [filteredCats, setFilteredCats] = useState([])

	console.log("visible cats",visibleCats)

	const [selectedStatus, setSelectedStatus] = useState(null);
	const [selectedPattern, setSelectedPattern] = useState(null);
	const [selectedColor, setSelectedColor] = useState(null);
	const [selectedDate, setSelectedDate] = useState(null);
	const [selectedCoatLength, setSelectedCoatLength] = useState(null);

	console.log(selectedStatus, selectedPattern, selectedDate, selectedCoatLength, selectedColor)

	const handleSelectChange = (selectedOption, name) => {
		switch (name) {
			case "status":
				setSelectedStatus(selectedOption);
				break;
			case "pattern":
				setSelectedPattern(selectedOption);
				break;
			case "color":
				setSelectedColor(selectedOption);
				break;
			case "date":
				setSelectedDate(selectedOption);
				break;
			case "coatLength":
				setSelectedCoatLength(selectedOption);
				break;
			default:
				break;
		} 
	};
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

useEffect(() => {

	const filteredCats = filterCats(
		state,
		selectedStatus,
		selectedPattern,
		selectedColor,
		selectedCoatLength,
		selectedDate
	);

		setVisibleCats(filteredCats);

}, [
	state,
	selectedStatus,
	selectedPattern,
	selectedColor,
	selectedCoatLength,
	selectedDate,
]);

	return (
		<StyledPage display="flex" flexDirection="column">
			<StyledSection>
				<StyledH2Underline>Catspotting</StyledH2Underline>
				<StyledDivSimple padding="0" flexDirection="column">
					<StyledP>
						The map shows sightings from the last 30 days as default - to view
						older posts, please adjust the filters below.
						<StyledP>Move or zoom the map to find more cats.</StyledP>
					</StyledP>
					<MapFindCat
						cats={cats}
						visibleCats={visibleCats}
						setVisibleCats={setVisibleCats}
					/>
				</StyledDivSimple>
				<StyledDivSimple padding="0" flexDirection="column" align="flex-start">
					<StyledH3>Find cats:</StyledH3>
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
							name="status"
							onChange={(selectedOption) =>
								handleSelectChange(selectedOption, "status")
							}
							value={selectedStatus}
						/>
						<Select
							options={optionsPattern}
							styles={customStyles}
							placeholder="Select coat pattern..."
							isClearable
							menuPlacement="auto"
							onChange={(selectedOption) =>
								handleSelectChange(selectedOption, "pattern")
							}
							value={selectedPattern}
							name="pattern"
						/>
						<Select
							options={optionsColor}
							styles={customStyles}
							isMulti
							closeMenuOnSelect={false}
							placeholder="Select coat color..."
							isClearable
							menuPlacement="auto"
							onChange={(selectedOption) =>
								handleSelectChange(selectedOption, "color")
							}
							value={selectedColor}
							name="color"
						/>
						<Select
							options={optionsCoatLength}
							styles={customStyles}
							placeholder="Select coat length..."
							isClearable
							menuPlacement="auto"
							onChange={(selectedOption) =>
								handleSelectChange(selectedOption, "coatLength")
							}
							value={selectedCoatLength}
							name="coatLength"
						/>
						<Select
							options={optionsDate}
							styles={customStyles}
							placeholder="Select timeframe..."
							isClearable
							menuPlacement="auto"
							onChange={(selectedOption) =>
								handleSelectChange(selectedOption, "date")
							}
							value={selectedDate}
							name="date"
						/>

						{/* <Select
							options={optionsArea}
							styles={customStyles}
							placeholder="Select area radius..."
							isClearable
							menuPlacement="auto"
						/> */}
					</StyledSelectWrapper>
				</StyledDivSimple>

				<StyledDivSimpleGrid min="290px" padding="1rem 0">
					{visibleCats && visibleCats.length > 0 ? (
						visibleCats.map((cat) => (
							<CatInfoSheetMini key={cat._id} cat={cat} />
						))
					) : (
						<StyledH3>
							There are no matching results in the mapped area.
						</StyledH3>
					)}
				</StyledDivSimpleGrid>
			</StyledSection>
			<StyledBGSection
				bgImg={
					cloudinaryRoot + "catspotter-assets/BG_map_ws93ba.jpg"
				}></StyledBGSection>
		</StyledPage>
	);
}
