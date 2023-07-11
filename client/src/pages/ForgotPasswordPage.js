import { StyledPage } from "../styles/styled/Styled_Page";
// import { StyledForm } from "../styles/styled/Styled_ContactForm";
// import { StyledH2Underline } from "../styles/styled/Styled_Title";
// import { StyledPrimaryButton } from "../styles/styled/Styled_Button";
// import { Link } from "react-router-dom";
// import { StyledDivLabel } from "../styles/styled/Styled_Div";
import {
	StyledBGSection,
	StyledSection,
} from "../styles/styled/Styled_Section";
import ForgotPasswordForm from "../components/ForgotPasswordForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

function ForgotPasswordPage(props) {
	const [usernameOrEmail, setUsernameOrEmail] = useState("");

	const navigate = useNavigate();
	
	const handleSubmit = async (e) => {
		e.preventDefault()

		if (!usernameOrEmail) return;

		const response = await axios.post("/users/forgotpass", { usernameOrEmail });
		console.log("response:", response);

		//make a toaster out of this instead of alert**********
		if (response.data.success)
			alert(
				"Thank you, we have sent you an email with instructions on how to change your pass"
			);

		navigate("/login");
	};
	return (
		<StyledPage>
			<StyledSection
				bgImg="https://res.cloudinary.com/dgum1eu6e/image/upload/v1688899663/catspotter-assets/BG_login_fg4txa.jpg"
				align="center"
				padding="0"
				minHeight="100%"
				fullpage="true">
				<ForgotPasswordForm usernameOrEmail={usernameOrEmail} setUsernameOrEmail={setUsernameOrEmail} handleSubmit={handleSubmit}/>
			</StyledSection>
		</StyledPage>
	);
}

export default ForgotPasswordPage;


