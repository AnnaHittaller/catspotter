import { StyledPage } from "../styles/styled/Styled_Page";
import BG_profile from "../assets/bgImages/BG_profile.jpg";
import { StyledForm } from "../styles/styled/Styled_ContactForm";
import { StyledH2Underline } from "../styles/styled/Styled_Title";
import { StyledPrimaryButton } from "../styles/styled/Styled_Button";
import { Link } from "react-router-dom";
import { StyledDivLabel } from "../styles/styled/Styled_Div";
import {
	StyledBGSection,
	StyledSection,
} from "../styles/styled/Styled_Section";

function ForgotPasswordPage() {
	return (
		<StyledPage display="flex" flexDirection="column">
			<StyledSection minHeight="100%">
				<StyledH2Underline>Forgot your password?</StyledH2Underline>
				<StyledForm>
					<StyledDivLabel>
						<label htmlFor="usernameoremail">Username or email</label>
						<input
							type="text"
							id="usernameoremail"
							name="usernameoremai"
							placeholder="Your username or email"
							required
						/>
					</StyledDivLabel>
					<StyledPrimaryButton>
						<Link to="">Submit</Link>
					</StyledPrimaryButton>
				</StyledForm>
			</StyledSection>
			<StyledBGSection bgImg="https://res.cloudinary.com/dgum1eu6e/image/upload/v1688899663/catspotter-assets/BG_profile_cdrhze.jpg"></StyledBGSection>
		</StyledPage>
	);
}

export default ForgotPasswordPage;
