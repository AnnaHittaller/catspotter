import marker_seen from "../assets/markers/marker_seen.png";
import marker_lost from "../assets/markers/marker_lost.png";


import {
	StyledDivSimple,
	StyledDivSimpleRounded,
} from "../styles/styled/Styled_Div";
import { StyledCatInfoSheetMini } from "../styles/styled/Styled_CatInfoSheet";
import { v } from "../styles/Variables";
import { CiMenuKebab } from "react-icons/ci";
import { StyledPBold, StyledP, StyledSpan } from "../styles/styled/Styled_Text";
import { useState } from "react";
import MenuMini from "./MenuMini";

export default function CatInfoSheetMini() {

	const [showMenu, setShowMenu] = useState(false);

	return (
		<StyledCatInfoSheetMini>
			<StyledDivSimpleRounded bgColor={v.columbiaBlue} padding=".5rem 1rem">
				<StyledDivSimple padding="0" justify="flex-start">
					<img src={marker_seen} alt="" aria-hidden="true" />
					<div>
						<StyledPBold>Tuxedo cat in Köln</StyledPBold>
						<StyledP>2,8 km away</StyledP>
						<StyledSpan>2023. 05. 12., </StyledSpan>
						<StyledSpan>13:45</StyledSpan>
					</div>
				</StyledDivSimple>
				<CiMenuKebab onClick={() => setShowMenu((prev) => !prev)} />
				{showMenu && <MenuMini />}
			</StyledDivSimpleRounded>
		</StyledCatInfoSheetMini>
	);
}
