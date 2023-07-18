import { StyledPage } from "../styles/styled/Styled_Page";
import {
	StyledBGSection,
	StyledSection,
} from "../styles/styled/Styled_Section";

import { StyledH2Underline } from "../styles/styled/Styled_Title";
import { StyledDivSimpleGrid } from "../styles/styled/Styled_Div";
import CatInfoSheetMidi from "../components/CatInfoSheetMidi";
import { cloudinaryRoot } from "../utils/ImageUrlRoot";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function BookmarksPage() {
	const { state } = useContext(AppContext);
	 const bookmarkedCats = state.cats.filter((cat) =>
			state.user?.bookmarks?.includes(cat._id)
		);

	return (
		<StyledPage display="flex" flexDirection="column">
			<StyledSection>
				<StyledH2Underline>Bookmarks</StyledH2Underline>
				<StyledDivSimpleGrid padding="0" min="220px" justify="start" justifyItems="center">
					{bookmarkedCats.map((cat) => (
						<CatInfoSheetMidi key={cat._id} cat={cat} />
					))}
				</StyledDivSimpleGrid>
			</StyledSection>
			<StyledBGSection
				bgImg={
					cloudinaryRoot + "catspotter-assets/BG_bookmark_lobxmj.jpg"
				}></StyledBGSection>
		</StyledPage>
	);
}


