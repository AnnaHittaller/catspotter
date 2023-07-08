import { StyledPage } from "../styles/styled/Styled_Page";
import {
	StyledBGSection,
	StyledSection,
} from "../styles/styled/Styled_Section";
import {
	StyledPBig,
	StyledP,
	StyledSpan,
	StyledSpanBold,
} from "../styles/styled/Styled_Text";
import {
	StyledH2Underline,
	StyledH3,
	StyledH4Underline,
} from "../styles/styled/Styled_Title";
import {
	StyledDivBorder,
	StyledDivLabel,
	StyledDivSimple,
	StyledDivSimpleGrid,
} from "../styles/styled/Styled_Div";
import CatInfoSheetMidi from "../components/CatInfoSheetMidi";
import CatInfoSheetMaxi from "../components/CatInfoSheetMaxi";
import BG_bookmark from "../assets/bgImages/BG_bookmark.jpg";
import Toast from "../components/Toast";

export default function BookmarksPage() {
	return (
		<StyledPage display="flex" flexDirection="column">
			<StyledSection>
				<StyledH2Underline>Bookmarks</StyledH2Underline>
				<StyledDivSimpleGrid justify="flex-start" padding="0">
					<CatInfoSheetMidi />
				</StyledDivSimpleGrid>
			</StyledSection>
			<StyledBGSection bgImg={BG_bookmark}></StyledBGSection>  
		</StyledPage> 
	);
}

// /assets/bgImages/filename