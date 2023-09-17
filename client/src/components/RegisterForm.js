import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import { BsPersonFill } from "react-icons/bs";
import {
	StyledFormBox,
	StyledFormWrapper,
	StyledInputBox,
	StyledLoginRegisterBox,
	StyledRememberForgotBox,
	StyledSubmitButton,
	StyledVisibilityBtn, 
} from "../styles/styled/Styled_LoginRegisterForm";
import axios from "axios";
import Toast from "./Toast";
import { StyledDivSimple } from "../styles/styled/Styled_Div";
import { baseUrl } from "../baseurl";

export default function RegisterForm({ onFormSwitch, currentForm }) {
	const [showPassword, setShowPassword] = useState(false);
	//const [error, setError] = useState("");
	const [showToast, setShowToast] = useState("")
	const navigate = useNavigate();


	const [userData, setUserData] = useState({
		username: "",
		email: "",
		password: "",
	});

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			if (!userData.email || !userData.password || !userData.username) return setShowToast("Email, username and password are mandatory");

			console.log("userData registration", userData);
			const response = await axios.post(baseUrl + "/users/register", userData, {
				withCredentials: true,
			});

			console.log(response.data);

				if (response.data.success === true) {
					console.log("registration if data success");

					setUserData({
						username: "",
						email: "",
						password: "",
					});

					onFormSwitch("login");
				}

		} catch (error) {
			console.log(error.message);
		}
	};



	return (
		<StyledFormWrapper>
			<StyledFormBox>
				<h2>Register</h2>
				<form onSubmit={handleSubmit}>
					<StyledInputBox>
						<input
							type="text"
							id="username"
							name="username"
							placeholder=" "
							value={userData.username}
							onChange={(e) =>
								setUserData({ ...userData, username: e.target.value })
							}
						/>
						<label htmlFor="username">Username</label>
						<BsPersonFill />
					</StyledInputBox>
					<StyledInputBox>
						<input
							type="email"
							id="email-register"
							name="email"
							placeholder=" "
							value={userData.email}
							onChange={(e) =>
								setUserData({ ...userData, email: e.target.value })
							}
						/>
						<label htmlFor="email-register">Email</label>
						<FaEnvelope />
					</StyledInputBox>
					<StyledInputBox>
						<input
							type={showPassword ? "text" : "password"}
							id="password-register"
							name="password"
							placeholder=" "
							value={userData.password}
							onChange={(e) =>
								setUserData({ ...userData, password: e.target.value })
							}
						/>
						<label htmlFor="password-register">Password</label>
						{userData.password && (
							<StyledVisibilityBtn
								type="button"
								onClick={() => setShowPassword(!showPassword)}>
								{showPassword ? <RiEyeCloseLine /> : <RiEyeLine />}
							</StyledVisibilityBtn>
						)}
						<FaLock />
					</StyledInputBox>
					{/* <StyledRememberForgotBox currentForm={currentForm}>
						<label>
							<input type="checkbox" />
							<span>I agree to the terms & conditions</span>
						</label>
					</StyledRememberForgotBox> */}
					{showToast && (
						<StyledDivSimple padding="0 0 1rem 0">
							<Toast type="error">{showToast}</Toast>
						</StyledDivSimple>
					)}
					<StyledSubmitButton type="submit">Register</StyledSubmitButton>
				</form>
				<StyledLoginRegisterBox>
					<p>Already have an account?</p>
					<button type="button" onClick={() => onFormSwitch("login")}>
						Login
					</button>
				</StyledLoginRegisterBox>
			</StyledFormBox>
		</StyledFormWrapper>
	);
}
