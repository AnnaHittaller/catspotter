import { Link } from "react-router-dom";
import { StyledMenuMini } from "../styles/styled/Styled_Menu";
import { StyledP } from "../styles/styled/Styled_Text";

export default function MenuMini() {
	return (
		<StyledMenuMini>
			<Link to="">
				<StyledP>Infosheet</StyledP>
			</Link>
		</StyledMenuMini>
	);
}
