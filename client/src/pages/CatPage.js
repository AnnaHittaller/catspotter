import { StyledPage } from "../styles/styled/Styled_Page";
import {
	StyledBGSection,
	StyledSection,
} from "../styles/styled/Styled_Section";
import BG_upload from "../assets/bgImages/BG_upload.jpg";
import CatInfoSheetMaxi from "../components/CatInfoSheetMaxi";

export default function CatPage() {
	return (
		<StyledPage display="flex" flexDirection="column">
			<StyledSection>
				<CatInfoSheetMaxi />
			</StyledSection>
			<StyledBGSection bgImg={BG_upload}></StyledBGSection>
		</StyledPage>
	);
}

