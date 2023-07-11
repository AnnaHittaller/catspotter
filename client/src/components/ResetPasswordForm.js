import { useContext, useState } from "react";

import { useNavigate } from "react-router";
import { FaEnvelope, FaLock } from "react-icons/fa";
//import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";
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

export default function ResetPasswordForm({password, setPassword, handleSubmit}) {
	const [showPassword, setShowPassword] = useState(false);
	const [showRetypedPassword, setShowRetypedPassword] = useState(false);
	const navigate = useNavigate();


	return (
		<StyledFormWrapper>
			<StyledFormBox>
				<h2>Change your password</h2>
				<form onSubmit={handleSubmit}>
					<StyledInputBox>
						<input
							type={showPassword ? "text" : "password"}
							id="password"
							name="password"
							placeholder=" "
							value={password.newPass}
							onChange={(e) =>
								setPassword({ ...password, newPass: e.target.value })
							}
						/>
						<label htmlFor="password">New password</label>
						{password.newPass && (
							<StyledVisibilityBtn
								type="button"
								onClick={() => setShowPassword(!showPassword)}>
								{showPassword ? <RiEyeCloseLine /> : <RiEyeLine />}
							</StyledVisibilityBtn>
						)}
						<FaLock />
					</StyledInputBox>
					<StyledInputBox>
						<input
							type={showRetypedPassword ? "text" : "password"}
							id="retypedPassword"
							name="retypedPassword"
							placeholder=" "
							value={password.retyped}
							onChange={(e) =>
								setPassword({ ...password, retyped: e.target.value })
							}
						/>
						<label htmlFor="password">Confirm new password</label>
						{password.retyped && (
							<StyledVisibilityBtn
								type="button"
								onClick={() => setShowRetypedPassword(!showRetypedPassword)}>
								{showRetypedPassword ? <RiEyeCloseLine /> : <RiEyeLine />}
							</StyledVisibilityBtn>
						)}
						<FaLock />
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
