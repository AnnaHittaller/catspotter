import { useContext, useState } from "react";
//import { AuthContext } from "../context/AuthContext";
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
import axios from "axios";
import Toast from "./Toast";
import { StyledDivSimple } from "../styles/styled/Styled_Div";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import { baseUrl } from "../baseurl";

export default function LoginForm({ onFormSwitch, currentForm }) {
	const [showPassword, setShowPassword] = useState(false);
	//const [error, setError] = useState("")
	const [showToast, setShowToast] = useState("")
	const navigate = useNavigate();

	const {dispatch} = useContext(AppContext)

	const [userData, setUserData] = useState({
		usernameoremail: "",
		password: "",
	});

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {

			if(!userData.usernameoremail) return setShowToast("Email or username and password are mandatory")

			//console.log("User data:", userData);

			const response = await axios.post(baseUrl + "/users/login", userData, {
				withCredentials: true,
			});
			console.log("response:", response);

			if(!response.data.success) {
				return setShowToast("Incorrect username or password");
			}

			if(response.data.success) {
				dispatch({
					type: "LOGIN",
					payload: { ...response.data.user },
				});
				// dispatch({
				//  type: "LIST_CATS",
				//  payload: response.data.cats,
				// });

				// const location = localStorage.getItem("abandonedAddress");

				// if (location) {
				// 	localStorage.removeItem("abandonedAddress");
				// 	navigate(location);
					
				// } else {
				// 	navigate("/");
				// }

				navigate("/");
			}

		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<StyledFormWrapper>
			<StyledFormBox>
				<h2>Login</h2>
				<form onSubmit={handleSubmit}>
					<StyledInputBox>
						<input
							type="text"
							id="email"
							name="email"
							placeholder=" "
							value={userData.usernameoremail}
							onChange={(e) =>
								setUserData({ ...userData, usernameoremail: e.target.value })
							}
						/>
						<label htmlFor="email">Email or username</label>
						<FaEnvelope />
					</StyledInputBox>
					<StyledInputBox>
						<input
							type={showPassword ? "text" : "password"}
							id="password"
							name="password"
							placeholder=" "
							value={userData.password}
							onChange={(e) =>
								setUserData({ ...userData, password: e.target.value })
							}
						/>
						<label htmlFor="password">Password</label>
						{userData.password && (
							<StyledVisibilityBtn
								type="button"
								onClick={() => setShowPassword(!showPassword)}>
								{showPassword ? <RiEyeCloseLine /> : <RiEyeLine />}
							</StyledVisibilityBtn>
						)}
						<FaLock /> 
					</StyledInputBox>
					<StyledRememberForgotBox currentForm={currentForm}>
						<label>
							<input type="checkbox" />
							Remember me
						</label>
						<button type="button">
							<Link to="/forgotpassword">Forgot password?</Link>
						</button>
					</StyledRememberForgotBox>
					{showToast && (
						<StyledDivSimple padding="0 0 1rem 0">
							<Toast type="error" >
								{showToast}
							</Toast>
						</StyledDivSimple>
					)}
					<StyledSubmitButton type="submit">Login</StyledSubmitButton>
				</form>
				<StyledLoginRegisterBox>
					<p>Don't have an account yet?</p>
					<button type="button" onClick={() => onFormSwitch("register")}>
						Register
					</button>
				</StyledLoginRegisterBox>
			</StyledFormBox>
		</StyledFormWrapper>
	);
}
