import { StyledPage } from "../styles/styled/Styled_Page";
import { StyledForm } from "../styles/styled/Styled_ContactForm";
import { StyledH2Underline } from "../styles/styled/Styled_Title";
import { StyledPrimaryButton } from "../styles/styled/Styled_Button";
import { Link, useParams } from "react-router-dom";
import { StyledDivLabel } from "../styles/styled/Styled_Div";
import {
	StyledBGSection,
	StyledSection,
} from "../styles/styled/Styled_Section";
import ResetPasswordForm from "../components/ResetPasswordForm";
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../baseurl";

function ResetPasswordPage(props) {
	const { token } = useParams();
	const [password, setPassword] = useState({
		newPass: "",
		retyped: "",
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!password.newPass || password.newPass !== password.retyped)
			return alert("Passes don't match");

		const response = await axios.post( baseUrl +
			"/users/changepass",
			{
				token,
				password: password.newPass,
			},
			{
				withCredentials: true,
			}
		);
		//console.log("response:", response);
	};

	return (
		<StyledPage>
			<StyledSection
				bgImg="https://res.cloudinary.com/dgum1eu6e/image/upload/v1688899663/catspotter-assets/BG_login_fg4txa.jpg"
				align="center"
				padding="0"
				minHeight="100%"
				fullpage="true">
				<ResetPasswordForm passowrd={password} setPassword={setPassword} handleSubmit={handleSubmit}/>
			</StyledSection>
		</StyledPage>
	);
}

export default ResetPasswordPage;
