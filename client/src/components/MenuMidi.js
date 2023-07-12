import { Link } from "react-router-dom";
import { StyledMenuMidi } from "../styles/styled/Styled_Menu";
import { StyledP, StyledPBold } from "../styles/styled/Styled_Text";

export default function MenuMidi({cat}) {
	return (
		<StyledMenuMidi>
			<div>
				<StyledPBold>{cat.status === "lost" ? "Lost" : "Seen"}</StyledPBold>
			</div>
			<div></div>
			<div>
				{/* cat color may require a map method?? */}
				<StyledP>{cat.color}{cat.pattern}</StyledP> 
				<StyledP>{cat.date}</StyledP>
			</div>
			<div></div>
			<Link to={`/cat/${cat._id}`}>
				<StyledP>Infosheet</StyledP>
			</Link>
		</StyledMenuMidi>
	);
}
