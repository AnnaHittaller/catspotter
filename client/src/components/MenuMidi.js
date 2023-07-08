import { Link } from "react-router-dom";
import { StyledMenuMidi } from "../styles/styled/Styled_Menu";
import { StyledP, StyledPBold } from "../styles/styled/Styled_Text";

export default function MenuMidi() {
	return (
		<StyledMenuMidi>
			<div>
				<StyledPBold>Lost</StyledPBold>
			</div>
			<div></div>
			<div>
				<StyledP>Orange tuxedo</StyledP>
				<StyledP>2023. 05. 12.</StyledP>
			</div>
			<div></div>
			<Link to="">
				<StyledP>Infosheet</StyledP>
			</Link>
		</StyledMenuMidi>
	);
}
