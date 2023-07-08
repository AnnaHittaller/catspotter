import { StyledFooter } from "../styles/styled/Styled_Footer";
import { BsEnvelope, BsHeart, BsHeartFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { SidebarContext } from "../context/SidebarContext";

export default function Footer() {
	const { sidebaropen } = useContext(SidebarContext);

	return (
		<StyledFooter sidebaropen={sidebaropen}>
			<Link mailto="hittaller.anna@gmail.com">
				<span>
					<BsEnvelope />
					hittaller.anna@gmail.com
				</span>
			</Link>
			<span>
				<span>Created and desgined with</span>
				<span>
					<BsHeartFill />
				</span>
				<span>Anna Hittaller © 2023</span>
			</span>
		</StyledFooter>
	);
}
