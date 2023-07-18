import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { StyledCatInfoSheetMidi } from "../styles/styled/Styled_CatInfoSheet";
import {
	StyledDivLabel,
	StyledDivSimple,
	StyledDivSimpleRounded,
} from "../styles/styled/Styled_Div";
import { StyledButton } from "../styles/styled/Styled_Button";
import { StyledP } from "../styles/styled/Styled_Text";
import { StyledH3 } from "../styles/styled/Styled_Title";
import { v } from "../styles/Variables";
import { cloudinaryRoot } from "../utils/ImageUrlRoot";
import { getCatSvgComponent } from "../utils/CatSvgHelper";
import dateFormatter from "../utils/DateFormatter";
import { Link } from "react-router-dom";


export default function CatInfoSheetMidi({ cat }) {
	const { formattedDate } = dateFormatter(cat?.date);

	const catSVG = getCatSvgComponent(
		cat.pattern,
		cat.color[0],
		cat.color[1],
		cat.color[2]
	);

	return (
		<StyledCatInfoSheetMidi>
			<StyledDivLabel >
				<label>{cat.status}</label>
				<StyledH3>
					{cat?.pattern.charAt(0).toUpperCase()}{cat?.pattern.slice(1)} cat in{" "}
					{cat.address.city}
				</StyledH3>
				<StyledDivSimple padding="0" flexDirection="column">
					{cat?.image.length > 0 ? (
						<img
							src={cloudinaryRoot + cat?.image}
							alt="uploaded photo of the cat"
						/>
					) : (
						<StyledDivSimple className="cat-svg">{catSVG}</StyledDivSimple>
					)}
				</StyledDivSimple>
				<BsBookmarkFill />
				<StyledDivSimpleRounded bgColor={v.columbiaBlue} flexDirection="column">
					<StyledP>
						{cat.address.city} {cat.address.postcode}
					</StyledP>
					<StyledP>{cat.address.road}</StyledP>
				</StyledDivSimpleRounded>
				<StyledDivSimpleRounded bgColor={v.columbiaBlue}>
					<StyledP>Bicolor tuxedo, orange and white</StyledP>
				</StyledDivSimpleRounded>
				<StyledDivSimpleRounded bgColor={v.columbiaBlue}>
					<StyledP>
						On {formattedDate}, at {cat.time}
					</StyledP>
				</StyledDivSimpleRounded>
				{cat.notes && (
					<StyledDivSimpleRounded bgColor={v.columbiaBlue}>
						<StyledP>{cat.notes}</StyledP>
					</StyledDivSimpleRounded>
				)}
				<StyledButton>
					<Link to={`/cat/${cat._id}`}>Details</Link>
				</StyledButton>
			</StyledDivLabel>
		</StyledCatInfoSheetMidi>
	);
}
