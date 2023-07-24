import { StyledPage } from "../styles/styled/Styled_Page";
import {
	StyledBGSection,
	StyledSection,
} from "../styles/styled/Styled_Section";

import { StyledH2Underline } from "../styles/styled/Styled_Title";
import {
	StyledDivSimple,
	StyledDivSimpleGrid,
} from "../styles/styled/Styled_Div";
import CatInfoSheetMidi from "../components/CatInfoSheetMidi";
import { cloudinaryRoot } from "../utils/ImageUrlRoot";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { StyledPBig } from "../styles/styled/Styled_Text";

export default function BookmarksPage() {
	const { state } = useContext(AppContext);
	const bookmarkedCats = state.cats.filter((cat) =>
		state.user?.bookmarks?.includes(cat._id)
	);
	console.log("bookmark", bookmarkedCats)

	return (
		<StyledPage display="flex" flexDirection="column">
			<StyledSection>
				<StyledH2Underline>Bookmarks</StyledH2Underline>
				{bookmarkedCats && bookmarkedCats.length > 0 ? (
					<StyledDivSimple
						padding="0"
						min="220px"
						wrap="wrap"
						align="stretch"
						justify="flex-start">
						{bookmarkedCats.map((cat) => (
							<CatInfoSheetMidi key={cat._id} cat={cat} />
						))}
					</StyledDivSimple>
				) : (
					<StyledPBig>There are no bookmarks set yet.</StyledPBig>
				)}
			</StyledSection>
			<StyledBGSection
				bgImg={
					cloudinaryRoot + "catspotter-assets/BG_bookmark_lobxmj.jpg"
				}></StyledBGSection>
		</StyledPage>
	);
}
