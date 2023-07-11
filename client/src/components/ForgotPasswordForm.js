import { useContext, useState } from "react";

import { useNavigate } from "react-router";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import {
	StyledFormBox,
	StyledFormWrapper,
	StyledInputBox,
	StyledLoginRegisterBox,
	StyledRememberForgotBox,
	StyledSubmitButton,
	StyledVisibilityBtn,
} from "../styles/styled/Styled_LoginRegisterForm";

export default function ForgotPasswordForm({
	usernameOrEmail,
	setUsernameOrEmail, handleSubmit
}) {
	const navigate = useNavigate();

	return (
		<StyledFormWrapper>
			<StyledFormBox>
				<h2>Forgot your password?</h2>
				<form onSubmit={handleSubmit}>
					<StyledInputBox>
						<input
							type="text"
							id="usernameoremail"
							name="usernameoremail"
							placeholder=" "
							value={usernameOrEmail}
							onChange={(e) => setUsernameOrEmail(e.target.value)}
						/>
						<label htmlFor="email">Your username or email</label>
						<FaEnvelope />
					</StyledInputBox>

					<StyledSubmitButton type="submit">Submit</StyledSubmitButton>
				</form>
				<StyledLoginRegisterBox>
					<button type="button" onClick={() => navigate("/login")}>
						Back to login
					</button>
				</StyledLoginRegisterBox>
			</StyledFormBox>
		</StyledFormWrapper>
	);
}
