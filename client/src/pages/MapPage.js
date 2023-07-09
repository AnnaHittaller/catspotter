
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
import { LuGlobe } from "react-icons/lu";
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
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import MenuMini from "../components/MenuMini";
import MenuMidi from "../components/MenuMidi";
//import AreaRangeSlider from "../components/AreaRangeSlider";
import ToggleButton from "../components/ToggleButton";
import MapFindCat from "../components/leaflet/MapFindCat";

export default function MapPage() {
	//console.log("rerender from map page");
	const { location, setLocation } = useContext(LocationContext);


	return (
		<StyledPage display="flex" flexDirection="column">
			<StyledSection>
				<StyledH2Underline>catspotting</StyledH2Underline>
				<StyledDivSimple padding="0" flexDirection="column">
					<StyledP>
						The map shows sightings from the last 30 days as default - to view
						older posts, please adjust the filters below.
					</StyledP>
					<MapFindCat />
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
					<StyledH3>No search filters have been selected yet.</StyledH3>
					<StyledH3>There are no matching results.</StyledH3>
					<CatInfoSheetMini />
					<CatInfoSheetMini />
					<CatInfoSheetMini />
				</StyledDivSimpleGrid>
			</StyledSection>
			<StyledBGSection bgImg="https://res.cloudinary.com/dgum1eu6e/image/upload/v1688899663/catspotter-assets/BG_map_ws93ba.jpg"></StyledBGSection>
		</StyledPage>
	);
}
