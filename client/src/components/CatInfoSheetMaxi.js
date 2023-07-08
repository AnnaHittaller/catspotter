import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import {
	StyledCatInfoSheetMaxi,
	StyledCatInfoSheetMidi,
} from "../styles/styled/Styled_CatInfoSheet";
import {
	StyledDivBorder,
	StyledDivLabel,
	StyledDivSimple,
	StyledDivSimpleRounded,
} from "../styles/styled/Styled_Div";
import {
	StyledButton,
	StyledPrimaryButton,
} from "../styles/styled/Styled_Button";
import { StyledP, StyledPBig, StyledPBold } from "../styles/styled/Styled_Text";
import { StyledH3 } from "../styles/styled/Styled_Title";
import { v } from "../styles/Variables";
import { CiMenuKebab } from "react-icons/ci";
import MapForOneCat from "./MapForOneCat";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function CatInfoSheetMaxi({ type }) {
	const [bookmarked, setBookmarked] = useState(false);

	const handleBookmark = () => {};

	  return (
			<StyledCatInfoSheetMaxi>
				<StyledDivBorder flexDirection="column">
					{bookmarked ? <BsBookmarkFill /> : <BsBookmark />}

					<StyledPBig>Lost cat - keep an eye open!</StyledPBig>
					<StyledDivLabel>
						<label>Cat Id Nr.#</label>
						<StyledH3>Tuxedo cat in Köln</StyledH3>
					</StyledDivLabel>

					<StyledDivSimple padding="0">
						<StyledDivSimple padding="0" flexDirection="column">
							<img
								src="https://picsum.photos/300/200"
								alt="uploaded photo of the cat"
								//Or SVG if theres no foto
							/>

							<MapForOneCat height="300px" />
						</StyledDivSimple>
						<StyledDivSimple padding="0" flexDirection="column">
							<StyledDivSimpleRounded
								bgColor={v.columbiaBlue}
								justify="center"
								padding=".5rem">
								<StyledP>56212 Köln, Heinrich-Günther-Straße</StyledP>
							</StyledDivSimpleRounded>
							<StyledDivSimpleRounded
								bgColor={v.columbiaBlue}
								justify="center"
								padding=".5rem">
								<StyledP>On 25th Mai 2023, at 13:49</StyledP>
							</StyledDivSimpleRounded>
							<StyledDivSimpleRounded
								bgColor={v.columbiaBlue}
								justify="center"
								padding=".5rem">
								<StyledP>Bicolor tuxedo: orange and white</StyledP>
							</StyledDivSimpleRounded>
							<StyledDivSimpleRounded
								bgColor={v.columbiaBlue}
								justify="center"
								padding=".5rem">
								<StyledP>
									Black collar, white spot on the left ear, male
								</StyledP>
							</StyledDivSimpleRounded>
							<StyledDivSimpleRounded
								bgColor={v.columbiaBlue}
								justify="center"
								padding=".5rem"
								flexDirection="column"
								gap=".25rem">
								<StyledPBold>Finder's reward:</StyledPBold>
								<StyledP>200 €</StyledP>
							</StyledDivSimpleRounded>
							<StyledDivSimpleRounded
								bgColor={v.columbiaBlue}
								justify="center"
								padding=".5rem"
								flexDirection="column"
								gap=".25rem">
								<StyledPBold>Contact for the owner:</StyledPBold>
								<StyledP>
									<Link to="tel:">+49 176 1122334</Link>
								</StyledP>
							</StyledDivSimpleRounded>
						</StyledDivSimple>
					</StyledDivSimple>

					<StyledDivSimple padding="0" justify="center">
						<StyledButton>Message user / Edit data</StyledButton>
						<StyledPrimaryButton onClick={() => setBookmarked((prev) => !prev)}>
							{bookmarked ? "Delete bookmark" : "Add bookmark"}
						</StyledPrimaryButton>
					</StyledDivSimple>
				</StyledDivBorder>
			</StyledCatInfoSheetMaxi>
		);
}
