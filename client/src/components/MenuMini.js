import { Link } from "react-router-dom";
import { StyledMenuMini } from "../styles/styled/Styled_Menu";
import { StyledP } from "../styles/styled/Styled_Text";
import { useRef } from "react";

export default function MenuMini({ cat, setShowMenu }) {
	const menuRef = useRef();

	useEffect(() => {
		const handleOutsideClick = (event) => {
			if (menuRef.current && !menuRef.current.contains(event.target)) {
				setShowMenu(false);
			}
		};

		// Add event listener when the component mounts
		document.addEventListener("click", handleOutsideClick);

		// Clean up the event listener when the component unmounts
		return () => {
			document.removeEventListener("click", handleOutsideClick);
		};
	}, [setShowMenu]);

	return (
		<StyledMenuMini ref={menuRef}>
			{/* <Link to={`/cat/${cat._id}`}>
				<StyledP>Infosheet</StyledP>
			</Link> */}
			<Link to={`/cat/${cat._id}`}>
				<StyledP>Infosheet</StyledP>
			</Link>
		</StyledMenuMini>
	);
}
