import { StyledPage } from "../styles/styled/Styled_Page";
import {
	StyledBGSection,
	StyledSection,
} from "../styles/styled/Styled_Section";
import CatInfoSheetMaxi from "../components/CatInfoSheetMaxi";
import { useParams } from "react-router-dom";
import { cloudinaryRoot } from "../utils/ImageUrlRoot";
import { StyledH2Underline } from "../styles/styled/Styled_Title";



export default function CatPage() {
	const {id} = useParams()
	
	return (
		<StyledPage display="flex" flexDirection="column">
			<StyledSection>
				<StyledH2Underline>Infosheet</StyledH2Underline>
				<CatInfoSheetMaxi id={id} />
			</StyledSection>
			<StyledBGSection
				bgImg={
					cloudinaryRoot + "catspotter-assets/BG_notification_udcr7h.jpg"
				}></StyledBGSection>
		</StyledPage>
	);
}

