import { Link } from "react-router-dom";
import { StyledMenuMini } from "../styles/styled/Styled_Menu";
import { StyledP } from "../styles/styled/Styled_Text";
import { useEffect, useRef } from "react";

export default function MenuMini({ cat, setShowMenu, showMenu }) {
	const menuRef = useRef();

	return (
		<StyledMenuMini ref={menuRef} >
			{/* <Link to={`/cat/${cat._id}`}>
				<StyledP>Infosheet</StyledP>
			</Link> */}
			<Link to={`/cat/${cat._id}`}>
				<StyledP>Infosheet</StyledP>
			</Link>
		</StyledMenuMini>
	);
}
