import CatInfoSheetMini from "../components/CatInfoSheetMini";
import {
	StyledDivBorder,
	StyledDivSimple,
	StyledDivSimpleGrid,
} from "../styles/styled/Styled_Div";
import { StyledPage } from "../styles/styled/Styled_Page";
import {
	StyledBGSection,
	StyledSection,
} from "../styles/styled/Styled_Section";
import { StyledPBig } from "../styles/styled/Styled_Text";
import { StyledH2Underline, StyledH3 } from "../styles/styled/Styled_Title";
import BG_notification from "../assets/bgImages/BG_notification.jpg";
import DataMatchNotification from "../components/DataMatchNotification";

export default function NotificationsPage() {
	return (
		<StyledPage display="flex" flexDirection="column">
			<StyledSection>
				<StyledH2Underline>Notifications</StyledH2Underline>
				<StyledDivSimple
					padding="1rem 0 0 0"
					flexDirection="column"
					align="flex-start">
					<StyledH3>Data matches</StyledH3>
					<StyledPBig>There are no data matches.</StyledPBig>
					<DataMatchNotification />
				</StyledDivSimple>
				<StyledDivSimple
					padding="1rem 0 0 0"
					flexDirection="column"
					align="flex-start">
					<StyledH3>Area activities</StyledH3>
					<StyledPBig>
						There were no activities in your area in the past 7 days.
					</StyledPBig>
					<StyledDivSimpleGrid min="290px" padding="1rem 0">
						<CatInfoSheetMini />
						<CatInfoSheetMini />
						<CatInfoSheetMini />
					</StyledDivSimpleGrid>
				</StyledDivSimple>
				<StyledDivSimple
					padding="1rem 0 0 0"
					flexDirection="column"
					align="flex-start">
					<StyledH3>Messages (?)</StyledH3>
					<StyledPBig>There are no new messages.</StyledPBig>
				</StyledDivSimple>
			</StyledSection>
			<StyledBGSection bgImg="https://res.cloudinary.com/dgum1eu6e/image/upload/v1688899663/catspotter-assets/BG_upload_jetyme.jpg"></StyledBGSection>
		</StyledPage>
	);
}
