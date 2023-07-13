import {
	//StyledDivBorder,
	StyledDivSimple,
	//StyledDivSimpleGrid,
	StyledDivLabel,
} from "../styles/styled/Styled_Div";
import { StyledPage } from "../styles/styled/Styled_Page";
import {
	StyledBGSection,
	StyledSection,
} from "../styles/styled/Styled_Section";
import { StyledP } from "../styles/styled/Styled_Text";
import { StyledH2Underline, StyledH3 } from "../styles/styled/Styled_Title";
//import BG_profile from "../assets/bgImages/BG_profile.jpg";
import {
	StyledButton,
	StyledPrimaryButton,
} from "../styles/styled/Styled_Button";
import default_profile from "../assets/appImages/default_profile_big.png";
import {
	//StyledUserData,
	StyledUserUpdateForm,
} from "../styles/styled/Styled_UserForms";
//import CatInfoSheetMini from "../components/CatInfoSheetMini";
//import AreaRangeSlider from "../components/leaflet/AreaRangeSlider";
import ToggleButton from "../components/ToggleButton";
//import MapForArea from "../components/MapForArea";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import { useContext, useEffect, useState } from "react";
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
	const [cats, setCats] = useState([]);
	const [visibleCats, setVisibleCats] = useState([]);

	// states adjusted by the map component, geocoder and range slider
	const [markerCoords, setMarkerCoords] = useState([
		state.user.location.coordinates[1],
		state.user.location.coordinates[0]
	]);

	//const [rangeValue, setRangeValue] = useState([0, 0]); //this was the original after passing the state up from arearangeslider
	const [rangeValue, setRangeValue] = useState([0, state.user.areaRadius]);

	// FORM STATES ************** //
	const [dataMatchNotification, setDataMatchNotification] = useState(false);
	const [areaNotification, setAreaNotification]  = useState(false);
	const [newUsername, setNewUsername] = useState(state.user.username)
	const [newPassword, setNewPassword] = useState("")
	//correct default image url to cloudinary, use cloudinary var to complete state url
	const [avatar, setAvatar] = useState({
		url: state.user.avatar || default_profile,
		file: null,
	})
	const [newEmail, setNewEmail] = useState(state.user.email)

	//check how this should be displayed initially, if needed, get it from the state, OR maybe some initial value "no address specified yet" || user data, and make marker appear only when it is not the default address anymore
	const [street, setStreet] = useState("");
	const [suburb, setSuburb] = useState("");
	const [city, setCity] = useState("");
	const [postcode, setPostcode] = useState("");


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

	const handleImageChange = (e) => {
	if (!e.target.files[0]) {
		setAvatar({
			url: default_profile,  // correct url!!!
			file: null,
		});
		return;
	}
	// if(e.target.files[0].size > 1000000) {
	// 	alert('The file has to be smaller than 10KB')
	// }

	setAvatar({
		url: URL.createObjectURL(e.target.files[0]),
		file: e.target.files[0],
	});
	};

	useEffect(() => {
		const fetchAddress = async () => {
			try {
				const response = await axios.get(
					`https://nominatim.openstreetmap.org/reverse?lat=${markerCoords.lat}&lon=${markerCoords.lng}&format=json`
				);
				console.log("nominatim userupdate", response.data.address);
				if (response.data.address.postcode)
					setPostcode(response.data.address.postcode);
				//check village-Town-city
				if (response.data.address.village) setCity(response.data.address.village);
				if (response.data.address.town) setCity(response.data.address.town);
				if (response.data.address.city) setCity(response.data.address.city);
				if (response.data.address.suburb)
					setSuburb(response.data.address.suburb);
				if (response.data.address.road) setStreet(response.data.address.road);
			} catch (error) {
				console.log(error);
				//setToast("Error while fetching the address.");  //does this need to be toast?
			}
		};
		fetchAddress();
	}, [markerCoords]);

	//toast has to be set in the page!!!

	const handleSubmit = async (e) => {
		e.preventDefault()

		try {
			const formdata = new FormData();

			formdata.set("username", newUsername)
			formdata.set("email", newEmail)
			formdata.set("password", newPassword)
			formdata.set("dataMatchNotification",dataMatchNotification)
			formdata.set("areaNotification", areaNotification)
			if (avatar.file) {
				formdata.set("avatar", avatar.file, "filename");
			}
			formdata.set("address.postcode", postcode);
			formdata.set("address.city", city);
			formdata.set("address.suburb", suburb);
			formdata.set("address.road", street);
			formdata.set("areaRadius", rangeValue[1])
			formdata.set("_id", state.user._id);  //check if this is correctly set

			console.log("formdata", formdata);

			for (let pair of formdata.entries()) {
			console.log(pair[0] + ": " + pair[1]);
			}

			//const response = await axios.put("/users/updateprofile", formdata)
			//console.log("response", response);

		} catch (error) {
			console.log(error);
		}
	}

	return (
		<StyledPage display="flex" flexDirection="column">
			<StyledSection>
				<StyledH2Underline>User profile update</StyledH2Underline>
				<StyledDivSimple flexDirection="column">
					<StyledUserUpdateForm onSubmit={handleSubmit}>
						<StyledDivLabel>
							<label>Username</label>
							<input
								type="text"
								placeholder="New username"
								id="newUsername"
								name="newUsername"
								value={newUsername}
								onChange={(e) => setNewUsername(e.target.value)}
							/>
						</StyledDivLabel>
						<StyledDivLabel>
							<label>Profile picture</label>
							<label htmlFor="avatar">
								<input
									type="file"
									placeholder="New avatar"
									//value=""
									id="avatar"
									name="avatar"
									accept="image/*"
									onChange={handleImageChange}
								/>
								<img
									//src-hez kell a cloudinary url eleje - test image changes
									src={state.user.avatar || avatar.url || default_profile}
									alt="user avatar"
								/>
								{/* // does this update okay woth the overlay? */}
								<div>
									<GrEdit />
								</div>
							</label>
							<StyledButton
								type="button"
								onClick={() => setAvatar({ url: "", file: null })}>
								Delete photo
							</StyledButton>
						</StyledDivLabel>
						<StyledDivLabel>
							<label>Address & area</label>
							<MapUserUpdate
								height="300px"
								markerCoords={markerCoords}
								setMarkerCoords={setMarkerCoords}
								rangeValue={rangeValue}
								setRangeValue={setRangeValue}
								cats={cats}
								visibleCats={visibleCats}
								setVisibleCats={setVisibleCats}
							/>
						</StyledDivLabel>
						<StyledDivLabel>
							<label>Email</label>
							<input
								type="email"
								placeholder="New email address"
								name="newEmail"
								id="newEmail"
								value={newEmail}
								onChange={(e) => setNewEmail(e.target.value)}
							/>
						</StyledDivLabel>
						<StyledDivLabel>
							<label>Password</label>
							<input
								type={showPassword ? "text" : "password"}
								placeholder="New password"
								name="newPassword"
								id="newPassword"
								value={newPassword}
								onChange={(e) => setNewPassword(e.target.value)}
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
								<ToggleButton
									value={dataMatchNotification}
									onChange={(value) => setDataMatchNotification(value)}
									name="dataMatchNotification"
									id="dataMatchNotification"
								/>
							</StyledDivSimple>
							<StyledDivSimple
								padding="0"
								justify="flex-start"
								mobilewidth="unset">
								<StyledP>Area activities</StyledP>
								<ToggleButton
									value={areaNotification}
									onChange={(value) => setAreaNotification(value)}
									name="areaNotification"
									id="areaNotification"
								/>
							</StyledDivSimple>
						</StyledDivLabel>
						<StyledPrimaryButton type="submit">
							Update user data
						</StyledPrimaryButton>
					</StyledUserUpdateForm>
					<StyledButton onClick={handleDeleteProfile} type="button">
						Delete Profile
					</StyledButton>
				</StyledDivSimple>
			</StyledSection>
			<StyledBGSection bgImg="https://res.cloudinary.com/dgum1eu6e/image/upload/v1688899663/catspotter-assets/BG_profile_cdrhze.jpg"></StyledBGSection>
		</StyledPage>
	);
}
