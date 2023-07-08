import { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import { StyledPage } from "../styles/styled/Styled_Page";
import {
	StyledFront,
	StyledBack,
	StyledFlipContainer,
	StyledFlipper,
} from "../styles/styled/Styled_LoginRegisterForm";
import { StyledSection } from "../styles/styled/Styled_Section";
import BG_login from "../assets/bgImages/BG_login.jpg";

export default function LoginPage() {
	const [currentForm, setCurrentForm] = useState("login");

	const toggleForm = (formName) => {
		setCurrentForm(formName);
	};

	return (
		<StyledPage>
			<StyledSection
				bgImg={BG_login}
				align="center"
				padding="0"
				minHeight="100%"
				fullpage="true">
				<StyledFlipContainer>
					<StyledFlipper
						className={`flipper ${currentForm === "login" ? "" : "flip"}`}>
						<StyledFront>
							<LoginForm onFormSwitch={toggleForm} currentForm={currentForm} />
						</StyledFront>
						<StyledBack>
							<RegisterForm
								onFormSwitch={toggleForm}
								currentForm={currentForm}
							/>
						</StyledBack>
					</StyledFlipper>
				</StyledFlipContainer>
			</StyledSection>
		</StyledPage>
	);
}
