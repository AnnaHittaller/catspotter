import { StyledPage } from "../styles/styled/Styled_Page";
import { StyledSection } from "../styles/styled/Styled_Section";
import { StyledButton } from "../styles/styled/Styled_Button";
import { StyledH2, StyledH3 } from "../styles/styled/Styled_Title";
import { StyledDivBorder, StyledDivSimple } from "../styles/styled/Styled_Div";
import BG_notFound from "../assets/bgImages/BG_notFound.jpg";
import { StyledNotFound } from "../styles/styled/Styled_NotFound";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
	const navigate = useNavigate();

	return (
		<StyledPage>
			<StyledSection>
				<StyledNotFound>
					<StyledDivBorder padding="0" gap="0">
						<img
							src="https://res.cloudinary.com/dgum1eu6e/image/upload/v1688899663/catspotter-assets/notFound_BG_xyspbj.jpg"
							aria-hidden="true"
							alt=""
						/>
						<StyledDivSimple flexDirection="column" justify="space-between">
							<StyledH2>Ooops!</StyledH2>
							<StyledH3>This page is gone.</StyledH3>
							<StyledH3>We are just as surprised as you.</StyledH3>
							<StyledButton onClick={() => navigate("/")}>Home</StyledButton>
						</StyledDivSimple>
					</StyledDivBorder>
				</StyledNotFound>
			</StyledSection>
		</StyledPage>
	);
}
