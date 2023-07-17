import { StyledPage } from "../styles/styled/Styled_Page";
import {
	StyledBGSection,
	StyledSection,
} from "../styles/styled/Styled_Section";
//import BG_upload from "../assets/bgImages/BG_upload.jpg";
import CatInfoSheetMaxi from "../components/CatInfoSheetMaxi";
import { useParams } from "react-router-dom";
import { cloudinaryRoot } from "../utils/ImageUrlRoot";



export default function CatPage() {
	const {id} = useParams()
	
	return (
		<StyledPage display="flex" flexDirection="column">
			<StyledSection>
				<CatInfoSheetMaxi id={id}/>
			</StyledSection>
			<StyledBGSection bgImg={cloudinaryRoot + "catspotter-assets/BG_notification_udcr7h.jpg"}></StyledBGSection>
		</StyledPage>
	);
}

