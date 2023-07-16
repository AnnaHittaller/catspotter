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
import dateFormatter from "../utils/DateFormatter";

export default function CatInfoSheetMini({cat}) {

	const [showMenu, setShowMenu] = useState(false);
	const { formattedDate, formattedTime } = dateFormatter(cat?.date); 

	//separate function needed to get the distance of the points from the users location

	return (
		<StyledCatInfoSheetMini>
			<StyledDivSimpleRounded bgColor={v.columbiaBlue} padding=".5rem 1rem">
				<StyledDivSimple padding="0" justify="flex-start">
					<img
						src={cat?.status === "Lost" ? marker_lost : marker_seen}
						alt=""
						aria-hidden="true"
					/>
					<div>
						<StyledPBold>
							{cat?.pattern === "tortoiseshell" || cat?.pattern === "calico"
								? `${cat?.pattern.charAt(0).toUpperCase()}${cat?.pattern.slice(
										1
								  )}`
								: cat?.color
										?.map((color, index) => {
											if (index === 0) {
												return (
													color.charAt(0).toUpperCase() +
													color.slice(1).toLowerCase()
												);
											}
											return color.toLowerCase();
										})
										.join(" ") +
								  ` ${cat?.pattern.charAt(0).toUpperCase()}${cat?.pattern.slice(
										1
								  )}`}{" "}
							cat in {cat?.address.city}
						</StyledPBold>
						<StyledP>2,8 km away ********* from you</StyledP>
						<StyledSpan>{formattedDate}, </StyledSpan>
						<StyledSpan>at {formattedTime}</StyledSpan>
					</div>
				</StyledDivSimple>
				<CiMenuKebab onClick={() => setShowMenu((prev) => !prev)} />
				{showMenu && <MenuMini cat={cat} />}
			</StyledDivSimpleRounded>
		</StyledCatInfoSheetMini>
	);
}
