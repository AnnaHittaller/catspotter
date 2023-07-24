import { StyledCatInfoSheetNotification } from "../styles/styled/Styled_CatInfoSheet";
import {
	StyledDivLabel,
	StyledDivSimpleRounded,
	StyledDivBorder,
	StyledDivSimple,
} from "../styles/styled/Styled_Div";
import { StyledButton } from "../styles/styled/Styled_Button";
import { StyledP, StyledPBold, StyledPBig } from "../styles/styled/Styled_Text";
import { StyledH3, StyledH4Underline } from "../styles/styled/Styled_Title";
import { v } from "../styles/Variables";
import { Link } from "react-router-dom";
import dateFormatter from "../utils/DateFormatter";
import { getCatSvgComponent } from "../utils/CatSvgHelper";
import { cloudinaryRoot } from "../utils/ImageUrlRoot";
import { calculateDistance } from "../utils/CalculateDistance";

export default function DataMatchNotification({ match }) {
	const catSVGUser = getCatSvgComponent(
		match.usersOwnCat.pattern,
		match.usersOwnCat.color[0],
		match.usersOwnCat.color[1],
		match.usersOwnCat.color[2]
	);

	const catSVGMatch = getCatSvgComponent(
		match.matchingCat[0].pattern,
		match.matchingCat[0].color[0],
		match.matchingCat[0].color[1],
		match.matchingCat[0].color[2]
	);

	const distance = calculateDistance(
		match.usersOwnCat.location.coordinates[1],
		match.usersOwnCat.location.coordinates[0],
		match.matchingCat[0].location.coordinates[1],
		match.matchingCat[0].location.coordinates[0]
	);

	return (
		<StyledCatInfoSheetNotification>
			<StyledDivBorder flexDirection="column">
				<StyledH4Underline>It's a match within {distance} km!</StyledH4Underline>
				<StyledH3>
					{match.usersOwnCat?.pattern === "tortoiseshell" ||
					match.usersOwnCat?.pattern === "calico"
						? `${match.usersOwnCat?.pattern
								.charAt(0)
								.toUpperCase()}${match.usersOwnCat?.pattern.slice(1)}`
						: match.usersOwnCat?.color
								?.map((color, index) => {
									if (index === 0) {
										return (
											color.charAt(0).toUpperCase() +
											color.slice(1).toLowerCase()
										);
									}
									return color.toLowerCase();
								})
								.join(" ") + ` ${match.usersOwnCat?.pattern}`}{" "}
					cat in {match.usersOwnCat?.address.city}
				</StyledH3>
				<StyledPBold>
					{match.usersOwnCat.status === "Lost"
						? "Someone has seen a cat similar to the one you are looking for:"
						: "Someone is looking for a cat similar to the one you have seen:"}
				</StyledPBold>
				<StyledDivSimple padding="0" gap="1rem" className="data-wrapper">
					<StyledDivSimple flexDirection="column" padding="0">
						<StyledDivSimpleRounded
							bgColor={v.columbiaBlue}
							flexDirection="column">
							<StyledPBig>Your data:</StyledPBig>
							<StyledP>
								{match.usersOwnCat?.address.road + ", "}
								{match.usersOwnCat?.address.suburb &&
									match.usersOwnCat?.address.suburb + ", "}
								{match.usersOwnCat?.address.city + ", "}
								{match.usersOwnCat?.address.postcode}
							</StyledP>
							<StyledP>
								On {dateFormatter(match.usersOwnCat.date).formattedDate}, at{" "}
								{match.usersOwnCat.time}
							</StyledP>
							{match.usersOwnCat?.image.length > 0 ? (
								<img
									src={cloudinaryRoot + match.usersOwnCat?.image}
									alt="uploaded photo of the cat"
								/>
							) : (
								<StyledDivSimple className="cat-svg">
									{catSVGUser}
								</StyledDivSimple>
							)}
							<StyledButton>
								<Link to={`/cat/${match.usersOwnCat._id}`}>Details</Link>
							</StyledButton>
						</StyledDivSimpleRounded>
					</StyledDivSimple>
					<StyledDivSimple flexDirection="column" padding="0">
						<StyledDivSimpleRounded
							bgColor={v.columbiaBlue}
							flexDirection="column">
							<StyledPBig>Matching data:</StyledPBig>
							<StyledP>
								{match.matchingCat[0]?.address.road + ", "}
								{match.matchingCat[0]?.address.suburb &&
									match.matchingCat[0]?.address.suburb + ", "}
								{match.matchingCat[0]?.address.city + ", "}
								{match.matchingCat[0]?.address.postcode}
							</StyledP>
							<StyledP>
								On {dateFormatter(match.matchingCat[0].date).formattedDate}, at{" "}
								{match.matchingCat[0].time}
							</StyledP>
							{match.matchingCat[0].image.length > 0 ? (
								<img
									src={cloudinaryRoot + match.matchingCat[0]?.image}
									alt="uploaded photo of the cat"
								/>
							) : (
								<StyledDivSimple className="cat-svg">
									{catSVGMatch}
								</StyledDivSimple>
							)}
							<StyledButton>
								<Link to={`/cat/${match.matchingCat[0]._id}`}>Details</Link>
							</StyledButton>
						</StyledDivSimpleRounded>
					</StyledDivSimple>
				</StyledDivSimple>
			</StyledDivBorder>
		</StyledCatInfoSheetNotification>
	);
}
