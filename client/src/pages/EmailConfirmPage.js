import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { StyledPage } from "../styles/styled/Styled_Page";
import { StyledForm } from "../styles/styled/Styled_ContactForm";

import {

	StyledSection,
} from "../styles/styled/Styled_Section";
import { StyledFormBox, StyledFormWrapper } from "../styles/styled/Styled_LoginRegisterForm";
import { StyledPBig } from "../styles/styled/Styled_Text";

function EmailConfirmPage() {
	const { token } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
	 async function sendData() {
	   const response = await axios.post("/users/emailconfirm", { token });
	   console.log("response:", response);

	   if (response.data.success) {
	     setTimeout(() => navigate("/"), 3000);
	   } else {
	     alert("Token is not valid");
		 // expand logic here with toast + redirect
	   }
	 }

	  sendData();
	}, []);

	//spinner?///////////////*****************///////////// */

	return (
		<StyledPage>
			<StyledSection
				bgImg="https://res.cloudinary.com/dgum1eu6e/image/upload/v1688899663/catspotter-assets/BG_login_fg4txa.jpg"
				align="center"
				padding="0"
				minHeight="100%"
				fullpage="true">
				<StyledFormWrapper>
					<StyledFormBox>
						<h2>Thank you for confirming your email address!</h2>
						<br />
						<StyledPBig style={{ textAlign: "center" }}>
							After verifying your email, you will be redirected to the home
							page.
						</StyledPBig>
					</StyledFormBox>
				</StyledFormWrapper>
			</StyledSection>
		</StyledPage>
	);
}

export default EmailConfirmPage;
