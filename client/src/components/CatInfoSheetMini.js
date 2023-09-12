
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
import { cloudinaryRoot } from "../utils/ImageUrlRoot";
import { getCatSvgComponent } from "../utils/CatSvgHelper";

export default function CatInfoSheetMini({ cat }) {
	const [showMenu, setShowMenu] = useState(false);
	const { formattedDate } = dateFormatter(cat?.date); 
	const [distance, setDistance] = useState(null);
	const { state } = useContext(AppContext);

	const catSVG = getCatSvgComponent(
		cat.pattern,
		cat.color[0],
		cat.color[1],
		cat.color[2]
	);


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
			<StyledDivSimpleRounded bgColor={v.columbiaBlue} padding="1rem 1rem">
				<StyledDivSimple padding="0" justify="flex-start">
					<StyledDivSimple
						padding="0"
						flexDirection="column"
						justify="flex-end"
						gap=".25rem"
						className="thumbnail-wrapper">
						<img
							src={
								cat?.status === "Lost"
									? cloudinaryRoot + "catspotter-assets/marker_lost_mpfwgq.png"
									: cloudinaryRoot + "catspotter-assets/marker_seen_fjynd6.png"
							}
							alt=""
							aria-hidden="true"
						/>
						{cat?.image.length > 0 ? (
							<img
								src={cloudinaryRoot + cat?.image}
								alt="uploaded photo of the cat"
								className="thumbnail"
							/>
						) : (
							<StyledDivSimple className="thumbnail-svg" padding="0">
								{catSVG}
							</StyledDivSimple>
						)}
					</StyledDivSimple>
					<div>
						<StyledPBold>
							{cat?.pattern === "tortoiseshell" || cat?.pattern === "calico"
								? `${cat?.pattern.charAt(0).toUpperCase()}${cat?.pattern.slice(
										1
								  )}`
								: cat?.pattern === "bicolorTabby"
								? `${cat?.color[0].charAt(0).toUpperCase()}${cat?.color[0]
										.slice(1)
										.toLowerCase()} ${cat?.color
										.slice(1)
										.join(" ")} bicolor tabby`
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
										.join(" ") + ` ${cat?.pattern}`}{" "}
							cat in {cat?.address.city}
						</StyledPBold>
						{state.user.username && (
							<StyledP>{distance} km away from you</StyledP>
						)}
						<StyledSpan>{formattedDate}, </StyledSpan>
						<StyledSpan>at {cat.time}</StyledSpan>
					</div>
				</StyledDivSimple>
				<CiMenuKebab onClick={() => setShowMenu((prev) => !prev)} />
				{showMenu && (
					<MenuMini cat={cat} setShowMenu={setShowMenu} showMenu={showMenu} />
				)}
			</StyledDivSimpleRounded>
		</StyledCatInfoSheetMini>
	);
}
