import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { StyledCatInfoSheetMidi } from "../styles/styled/Styled_CatInfoSheet";
import {
	StyledDivLabel,
	StyledDivSimpleRounded,
} from "../styles/styled/Styled_Div";
import { StyledButton } from "../styles/styled/Styled_Button";
import { StyledP } from "../styles/styled/Styled_Text";
import { StyledH3 } from "../styles/styled/Styled_Title";
import { v } from "../styles/Variables";

export default function CatInfoSheetMidi() {
	return (
		<StyledCatInfoSheetMidi>
			<StyledDivLabel>
				<label>#cat ID nr</label>
				<StyledH3>Tuxedo cat in Köln</StyledH3>
				<img src="https://picsum.photos/300/120" alt="cat" />
				<BsBookmarkFill />
				<StyledDivSimpleRounded bgColor={v.columbiaBlue} flexDirection="column">
					<StyledP>53865 Köln</StyledP>
					<StyledP>Heinrich Günther Straße</StyledP>
				</StyledDivSimpleRounded>
				<StyledDivSimpleRounded bgColor={v.columbiaBlue}>
					<StyledP>Bicolor tuxedo, orange and white</StyledP>
				</StyledDivSimpleRounded>
				<StyledDivSimpleRounded bgColor={v.columbiaBlue}>
					<StyledP>On 25th Mai 2023, at 13:49</StyledP>
				</StyledDivSimpleRounded>
				<StyledDivSimpleRounded bgColor={v.columbiaBlue}>
					<StyledP>
						Black collar, white spot on the left ear, probably male
					</StyledP>
				</StyledDivSimpleRounded>
				<StyledButton>Details</StyledButton>
			</StyledDivLabel>
		</StyledCatInfoSheetMidi>
	);
}
