import {
	StyledDivBorder,
	StyledDivSimple,
	StyledDivSimpleGrid,
	StyledDivLabel,
} from "../styles/styled/Styled_Div";
import { StyledPage } from "../styles/styled/Styled_Page";
import {
	StyledBGSection,
	StyledSection,
} from "../styles/styled/Styled_Section";
import { StyledP, StyledPBig, StyledPBold } from "../styles/styled/Styled_Text";
import { StyledH2Underline, StyledH3 } from "../styles/styled/Styled_Title";
import BG_profile from "../assets/bgImages/BG_profile.jpg";
import {
	StyledButton,
	StyledPrimaryButton,
} from "../styles/styled/Styled_Button";
import default_profile from "../assets/appImages/default_profile_big.png";
import {
	StyledUserData,
	StyledUserUpdateForm,
} from "../styles/styled/Styled_UserForms";
//import CatInfoSheetMini from "../components/CatInfoSheetMini";
//import AreaRangeSlider from "../components/leaflet/AreaRangeSlider";
import ToggleButton from "../components/ToggleButton";
//import MapForArea from "../components/MapForArea";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import { useContext, useState } from "react";
import { StyledVisibilityBtn } from "../styles/styled/Styled_LoginRegisterForm";
import { GrEdit } from "react-icons/gr";
import MapUserUpdate from "../components/leaflet/MapUserUpdate";
import { AppContext } from "../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function UserUpdatePage() {
	const { id } = useParams();
	const { state, dispatch } = useContext(AppContext);
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();

	const dataMatch = "dataMatch";
	const areaActivity = "areaActivity";

	const handleDeleteProfile = async () => {
		try {
			const response = await axios.delete(`/users/delete/${state.user._id}`);
			console.log("delete response", response);

			dispatch({ type: "LOGOUT" });
			navigate("/");
		} catch (error) {
			console.log(error.message);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault()
		
	}

	return (
		<StyledPage display="flex" flexDirection="column">
			<StyledSection>
				<StyledH2Underline>User profile update</StyledH2Underline>
				<StyledDivSimple flexDirection="column">
					<StyledUserUpdateForm>
						<StyledDivLabel>
							<label>Username</label>
							<input
								type="text"
								placeholder="New username"
								id="username"
								name="username"
							/>
						</StyledDivLabel>
						<StyledDivLabel>
							<label>Profile picture</label>
							<label htmlFor="avatar">
								<input
									type="file"
									placeholder="New username"
									value=""
									id="avatar"
									name="avatar"
								/>
								<img
									src={state.user.avatar || default_profile}
									alt="user avatar"
								/>
								<div>
									<GrEdit />
								</div>
							</label>
						</StyledDivLabel>
						<StyledDivLabel>
							<label>Address & area</label>
							<MapUserUpdate height="300px" />
						</StyledDivLabel>
						<StyledDivLabel>
							<label>Email</label>
							<input type="email" placeholder="New email address" />
						</StyledDivLabel>
						<StyledDivLabel>
							<label>Password</label>
							<input
								type={showPassword ? "text" : "password"}
								placeholder="New password"
							/>
							<StyledVisibilityBtn
								type="button"
								title="show password"
								onClick={() => setShowPassword(!showPassword)}>
								{showPassword ? <RiEyeCloseLine /> : <RiEyeLine />}
							</StyledVisibilityBtn>
						</StyledDivLabel>
						<StyledDivLabel>
							<label>Notifications</label>
							<StyledDivSimple
								padding="0"
								justify="flex-start"
								mobilewidth="unset">
								<StyledP>Data matches</StyledP>
								<ToggleButton value={dataMatch} />
							</StyledDivSimple>
							<StyledDivSimple
								padding="0"
								justify="flex-start"
								mobilewidth="unset">
								<StyledP>Area activities</StyledP>
								<ToggleButton value={areaActivity} />
							</StyledDivSimple>
						</StyledDivLabel>
						<StyledPrimaryButton type="submit">
							Update user data
						</StyledPrimaryButton>
					</StyledUserUpdateForm>
					<StyledButton onClick={handleDeleteProfile}>
						Delete Profile
					</StyledButton>
				</StyledDivSimple>
			</StyledSection>
			<StyledBGSection bgImg="https://res.cloudinary.com/dgum1eu6e/image/upload/v1688899663/catspotter-assets/BG_profile_cdrhze.jpg"></StyledBGSection>
		</StyledPage>
	);
}
