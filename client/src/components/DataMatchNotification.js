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

export default function DataMatchNotification() {
	return (
		<StyledCatInfoSheetNotification>
			<StyledDivBorder flexDirection="column">
				<StyledH4Underline>It's a match!</StyledH4Underline>
				<StyledH3>Black and orange bicolor cat in Köln</StyledH3>
				<StyledPBold>
					Someone is looking for / has seen a cat similar to the one you have
					seen/are looking for.
				</StyledPBold>
				<StyledDivSimple padding="0" gap="1rem" className="data-wrapper">
					<StyledDivSimple flexDirection="column" padding="0">
						<StyledDivSimpleRounded
							bgColor={v.columbiaBlue}
							flexDirection="column">
							<StyledPBig>Your data:</StyledPBig>
							<StyledP>Heinrich Günther Straße, Köln, 657441</StyledP>
							<StyledP>On 25th Mai 2023, at 13:49</StyledP>
							<img src="https://picsum.photos/300/120" alt="cat" />
							<StyledButton>
								<Link to="">Details</Link>
							</StyledButton>
						</StyledDivSimpleRounded>
					</StyledDivSimple>
					<StyledDivSimple flexDirection="column" padding="0">
						<StyledDivSimpleRounded
							bgColor={v.columbiaBlue}
							flexDirection="column">
							<StyledPBig>Matching data:</StyledPBig>
							<StyledP>Heinrich Friedrich Straße, Köln, 657441</StyledP>
							<StyledP>On 28th Mai 2023, at 14:44</StyledP>
							<img src="https://picsum.photos/300/120" alt="cat" />
							<StyledButton>
								<Link to="">Details</Link>
							</StyledButton>
						</StyledDivSimpleRounded>
					</StyledDivSimple>
				</StyledDivSimple>
			</StyledDivBorder>
		</StyledCatInfoSheetNotification>
	);
}
