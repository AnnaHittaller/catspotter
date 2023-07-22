import { Link } from "react-router-dom";
import { StyledMenuMidi } from "../styles/styled/Styled_Menu";
import { StyledP, StyledPBold } from "../styles/styled/Styled_Text";
import dateFormatter from "../utils/DateFormatter";
 
export default function MenuMidi({cat}) {
	console.log("menumidi cat", cat)
	const { formattedDate} = dateFormatter(cat?.date); 
	return (
		<StyledMenuMidi type={cat.status}>
			<div>
				<StyledPBold>{cat.status === "Lost" ? "Lost" : "Seen"}</StyledPBold>
			</div>
			<div></div>
			<div>
				{/* cat color may require a map method?? */}
				<StyledP>
					{cat?.pattern === "tortoiseshell" || cat?.pattern === "calico"
						? `${cat?.pattern.charAt(0).toUpperCase()}${cat?.pattern.slice(1)}`
						: cat?.color
								?.map((color, index) => {
									if (index === 0) {
										return (
											color.charAt(0).toUpperCase() +
											color.slice(1).toLowerCase()
										);
									}
									return color.toLowerCase();
								})
								.join(" ") +
						  ` ${cat?.pattern}`}{" "}
					cat
				</StyledP>
				<StyledP>{formattedDate}</StyledP>
			</div>
			<div></div>
			<Link to={`/cat/${cat._id}`}>
				<StyledP>Infosheet</StyledP>
			</Link>
		</StyledMenuMidi>
	);
}
