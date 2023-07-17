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
import { useContext, useEffect, useState } from "react";
import MenuMini from "./MenuMini";
import dateFormatter from "../utils/DateFormatter";
import { calculateDistance } from "../utils/CalculateDistance";
import { AppContext } from "../context/AppContext";

export default function CatInfoSheetMini({cat}) {

	const [showMenu, setShowMenu] = useState(false);
	const { formattedDate, formattedTime } = dateFormatter(cat?.date); 
  const [distance, setDistance] = useState(null);
  const {state} = useContext(AppContext)
	//separate function needed to get the distance of the points from the users location

	 useEffect(() => {
			// Calculate the distance between the cat's location and the user's location
			const catLocation = cat?.location?.coordinates;
			const userLocation = state.user?.location?.coordinates;
			if (catLocation && userLocation) {
				const catLat = catLocation[1]; // Latitude of the cat's location
				const catLon = catLocation[0]; // Longitude of the cat's location
				const userLat = userLocation[1]; // Latitude of the user's location
				const userLon = userLocation[0]; // Longitude of the user's location
				const dist = calculateDistance(catLat, catLon, userLat, userLon);
				setDistance(dist);
			}
		}, [cat, state.user]);

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
						<StyledP>{distance} km away from you</StyledP>
						<StyledSpan>{formattedDate}, </StyledSpan>
						<StyledSpan>at {cat.time}</StyledSpan>
					</div>
				</StyledDivSimple>
				<CiMenuKebab onClick={() => setShowMenu((prev) => !prev)} />
				{showMenu && <MenuMini cat={cat} />}
			</StyledDivSimpleRounded>
		</StyledCatInfoSheetMini>
	);
}
