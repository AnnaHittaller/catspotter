import { StyledPage } from "../styles/styled/Styled_Page";
import {
	StyledBGSection,
	StyledSection,
} from "../styles/styled/Styled_Section";
import {
	//StyledPBig,
	//StyledP,
	StyledSpan,
	//StyledSpanBold,
	StyledPBold,
	StyledLink,
} from "../styles/styled/Styled_Text";
import {
	StyledH2Underline,
	//StyledH3,
	//StyledH4Underline,
} from "../styles/styled/Styled_Title";
import {
	StyledDivBorder,
	StyledDivLabel,
	StyledDivSimple,
	//StyledDivSimpleGrid,
} from "../styles/styled/Styled_Div";
//import CatInfoSheetMidi from "../components/CatInfoSheetMidi";
import Toast from "../components/Toast";
// import CatInfoSheetMaxi from "../components/CatInfoSheetMaxi";
// import BG_upload from "../assets/bgImages/BG_upload.jpg";
// import MapForUpload from "../components/MapForUpload";
import { BsQuestionCircle } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
//import { LocationContext } from "../context/LocationContext";
import { StyledCatUploadForm } from "../styles/styled/Styled_CatUploadForm";
import {
	optionsCat,
	optionsCoatLength,
	optionsColor,
	optionsPattern,
} from "../data/SelectOptions.js";
import { customStylesForUploadForm } from "../styles/SelectCustomStyles";
import Select from "react-select";
import {
	StyledButton,
	StyledPrimaryButton,
} from "../styles/styled/Styled_Button";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { FaPlus } from "react-icons/fa";
//import L from "leaflet";

import MapCatUpload from "../components/leaflet/MapCatUpload";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { cloudinaryRoot } from "../utils/ImageUrlRoot";
import { getCatSvgComponent } from "../utils/CatSvgHelper";

export default function CatUploadPage() {
	//const { location } = useContext(LocationContext);
	const { state, dispatch } = useContext(AppContext);
	const [showToast, setShowToast] = useState("");
	const [date, onChange] = useState(new Date());
	//const [lost, setLost] = useState(false);
	const [status, setStatus] = useState("");
	const [color, setColor] = useState([]);
	const [pattern, setPattern] = useState("");
	const [chipNumber, setChipNumber] = useState("");
	const [reward, setReward] = useState("");
	const [notes, setNotes] = useState("");
	const [contact, setContact] = useState("");
	const [coatLength, setCoatLength] = useState("");
	const [street, setStreet] = useState("");
	const [suburb, setSuburb] = useState("");
	const [city, setCity] = useState("");
	const [postcode, setPostcode] = useState("");
	//const [uploader, setUploader] = useState("");

	const [markerCoords, setMarkerCoords] = useState(null);
	const navigate = useNavigate();

	const currentTime = new Date();
	const formattedTime = currentTime.toTimeString().slice(0, 5);
	const [time, setTime] = useState(formattedTime);

	const [whiteColorDisabled, setWhiteColorDisabled] = useState(false);

	const placeholder =
		"https://res.cloudinary.com/dgum1eu6e/image/upload/v1688906503/placeholder_sfuu70.png"; /// check url, put it into a folder + add cloudinary root

	const [catImage, setCatImage] = useState({
		url: placeholder,
		file: null,
	});

	const catSVG = getCatSvgComponent(
		pattern?.value || "solid",
		color[0]?.value,
		color[1]?.value,
		color[2]?.value
	);
	console.log(pattern?.value);
	console.log(color[0]?.value, color[1]?.value, color[2]?.value);

	console.log(date, time)

	useEffect(() => {
		const fetchAddress = async () => {
			try {
				const response = await axios.get(
					`https://nominatim.openstreetmap.org/reverse?lat=${markerCoords.lat}&lon=${markerCoords.lng}&format=json`
				);
				console.log("nominatim", response.data.address);
				if (response.data.address.postcode)
					setPostcode(response.data.address.postcode);
				//check village-Town-city
				if (response.data.address.village)
					setCity(response.data.address.village);
				if (response.data.address.town) setCity(response.data.address.town);
				if (response.data.address.city) setCity(response.data.address.city);
				if (response.data.address.suburb)
					setSuburb(response.data.address.suburb);
				if (response.data.address.road) setStreet(response.data.address.road);
			} catch (error) {
				console.log(error);
				//setShowToast("Error while fetching the address."); //does this need to be toast?
			}
		};
		fetchAddress();
	}, [markerCoords]);

	//toast has to be set in the page!!!

	const handleImageChange = (e) => {
		if (!e.target.files[0]) {
			setCatImage({
				url: "",
				file: null,
			});
			return;
		}
		// if(e.target.files[0].size > 1000000) {
		// 	alert('The file has to be smaller than 10KB')
		// }

		setCatImage({
			url: URL.createObjectURL(e.target.files[0]),
			file: e.target.files[0],
		});
	};

	const handleChange = (selectedOption, name) => {
		switch (name) {
			case "status":
				setStatus(selectedOption || "");
				break;
			case "coatLength":
				setCoatLength(selectedOption || "");
				break;
			case "coatPattern":
			 if (selectedOption) {
					if (
						selectedOption.value === "bicolor" ||
						selectedOption.value === "van" ||
						selectedOption.value === "tuxedo" ||
						selectedOption.value === "bicolorTabby"
					) {
						if (color.length === 0) {
							setColor([{ value: "white", label: "White" }]);
						} else {
							setColor([{ value: "white", label: "White" }, ...color.slice(1)]);
						}
					} else if (selectedOption.value === "tortoiseshell") {
						setColor([
							{ value: "orange", label: "Orange" },
							{ value: "black", label: "Black" },
						]);
					} else if (selectedOption.value === "calico") {
						setColor([
							{ value: "black", label: "Black" },
							{ value: "orange", label: "Orange" },
							{ value: "white", label: "White" },
						]);
					} else {
						setColor([]);
					}
					setPattern(selectedOption);
				} else {
					setColor([]);
					setPattern(selectedOption || "");
				}
				break;
			case "coatColor":
				setColor(selectedOption || []);
				break;
			default:
				break;
		}
	};

	console.log("color",color)
	const handleSubmit = async (e) => {
		e.preventDefault();


		//take out required values and add toast instead

		if (pattern.value === "solid" && color.length > 1) {
			setShowToast("Solid colored cats can only have one coat color.");
			return;
		}

		if (
			(pattern.value === "bicolor" && color.length > 2) ||
			(pattern.value === "tuxedo" && color.length > 2) ||
			(pattern.value === "tortoiseshell" && color.length > 2) ||
			(pattern.value === "van" && color.length > 2) ||
			(pattern.value === "pointed" && color.length > 2)
		) {
			setShowToast("Bicolor cats can only have two coat colors.");
			return;
		}

		if (pattern.value === "calico" && color.length != 3) {
			setShowToast("Calico cats must have three coat colors.");
			return;
		}

		if (color.length > 3) {
			setShowToast("Invalid color combination.");
			return;
		}

		//may add more invalid combinations later

		try {
			const formdata = new FormData();

			formdata.set("date", date);
			formdata.set("time", time);
			formdata.set("status", status.value);
			formdata.set("location.coordinates[0]", [markerCoords.lng]);
			formdata.set("location.coordinates[1]", [markerCoords.lat]);

			formdata.set("pattern", pattern.value);
			formdata.set("coatLength", coatLength.value);
			color.forEach((item, index) => {
				formdata.set(`color[${index}]`, item.value);
			});
			formdata.set("notes", notes);
			formdata.set("chipNr", chipNumber);
			formdata.set("contact", contact);
			formdata.set("reward", reward);
			formdata.set("contact", contact);
			formdata.set("address.postcode", postcode);
			formdata.set("address.city", city);
			formdata.set("address.suburb", suburb);
			formdata.set("address.road", street);
			formdata.set("uploader", state.user._id);
			if (catImage.file) {
				formdata.set("image", catImage.file, "filename");
			}

			//console.log("formdata", formdata);

			// for (let pair of formdata.entries()) {
			// 	console.log(pair[0] + ": " + pair[1]);
			// }

			// console.log("pattern", pattern);
			// console.log("color", color);
			// console.log("status", status);
			// console.log("coatLength", coatLength);
			// console.log(typeof markerCoords.lng, markerCoords.lng);

			const response = await axios.post("/cats/add", formdata);
			console.log("response", response);

			if (response.data.success) {
				dispatch({
					type: "ADD_CAT",
					payload: response.data.cat,
				});

				//RESET STATE TO EMPTY ///////////////////////////

				setShowToast("Cat data was uploaded successfully!");

				setTimeout(() => {
					navigate("/");
				}, 3000);
			} else {
				setShowToast("Error while uploading the data!");
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<StyledPage display="flex" flexDirection="column">
			<StyledSection justify="center">
				<StyledH2Underline>Upload a cat</StyledH2Underline>
				<StyledPBold>
					Please select the cat's most accurate location (zoom and click the map
					at the exact point) on the map and fill out the form below.
				</StyledPBold>
				<StyledCatUploadForm onSubmit={handleSubmit}>
					<MapCatUpload
						height="30vh"
						markerCoords={markerCoords}
						setMarkerCoords={setMarkerCoords}
					/>
					<StyledSpan type="icon-span" className="icon-span">
						<StyledPBold>
							{" "}
							<BsQuestionCircle />
							Check <StyledLink to="/guides">the guides</StyledLink> for
							detailed description of coat patterns and colors.
						</StyledPBold>
					</StyledSpan>
					<StyledDivLabel padding="0" className="date-time-picker">
						<label>Pick a date</label>
						<DatePicker onChange={onChange} value={date} locale="en-EN" />
					</StyledDivLabel>
					<StyledDivLabel padding="0" className="date-time-picker">
						<label>Pick a time</label>
						<TimePicker
							onChange={setTime}
							value={time}
							locale="en-EN"
							disableClock="true"
							format="HH:mm"
							required="true"
						/>
					</StyledDivLabel>
					<StyledDivLabel padding="0" textAlign="left" className="select">
						<label>Lost / seen *</label>
						<Select
							id="lostSeen"
							name="lostSeen"
							options={optionsCat}
							styles={customStylesForUploadForm}
							placeholder="Select lost / seen..."
							isClearable
							menuPlacement="auto"
							value={status}
							onChange={(selectedOption) =>
								handleChange(selectedOption, "status")
							}
							required
						/>
					</StyledDivLabel>
					<StyledDivLabel padding="0" textAlign="left" className="select">
						<label>Coat length *</label>
						<Select
							id="coatLength"
							name="coatLength"
							options={optionsCoatLength}
							styles={customStylesForUploadForm}
							placeholder="Select coat length..."
							isClearable
							menuPlacement="auto"
							value={coatLength}
							onChange={(selectedOption) =>
								handleChange(selectedOption, "coatLength")
							}
							required
						/>
					</StyledDivLabel>
					<StyledDivLabel padding="0" textAlign="left" className="select">
						<label>Coat pattern *</label>
						<Select
							id="coatPattern"
							name="coatPattern"
							options={optionsPattern}
							styles={customStylesForUploadForm}
							placeholder="Select coat pattern..."
							isClearable
							menuPlacement="auto"
							value={pattern}
							onChange={(selectedOption) =>
								handleChange(selectedOption, "coatPattern")
							}
							required
						/>
					</StyledDivLabel>
					<StyledDivLabel padding="0" textAlign="left" className="select">
						<label>Coat color *</label>
						<Select
							id="coatColor"
							name="coatColor"
							options={optionsColor}
							styles={customStylesForUploadForm}
							placeholder="Select coat color(s)..."
							isClearable
							isMulti
							closeMenuOnSelect={false}
							menuPlacement="auto"
							value={color}
							onChange={(selectedOption) =>
								handleChange(selectedOption, "coatColor")
							}
							required
						/>
					</StyledDivLabel>
					<StyledDivSimple className="cat-svg">{catSVG}</StyledDivSimple>
					{status.value === "Lost" && (
						<>
							<StyledDivLabel padding="0" className="text-input">
								<label>Chip number</label>
								<input
									type="text"
									placeholder="Chip number..."
									id="chipNumber"
									name="chipNumber"
									value={chipNumber}
									onChange={(e) => setChipNumber(e.target.value)}
								/>
							</StyledDivLabel>
							<StyledDivLabel padding="0" className="text-input">
								<label>Finder's reward</label>
								<input
									type="text"
									placeholder="Amount of reward in euro..."
									id="reward"
									name="reward"
									value={reward}
									onChange={(e) => setReward(e.target.value)}
								/>
								{/* this has to be styled yet: */}
								<StyledSpan className="euro">€</StyledSpan>
							</StyledDivLabel>
							<StyledDivLabel padding="0" className="text-input">
								<label>Contact phone</label>
								<input
									type="text"
									placeholder="Telephone number..."
									id="contact"
									name="contact"
									value={contact}
									onChange={(e) => setContact(e.target.value)}
								/>
							</StyledDivLabel>
						</>
					)}
					<StyledDivLabel padding="0" className="text-input">
						<label>Notes</label>
						<textarea
							id="notes"
							name="notes"
							rows="5"
							placeholder="Special features, collar, assumed breed, sex, etc."
							value={notes}
							onChange={(e) => setNotes(e.target.value)}
						/>
					</StyledDivLabel>{" "}
					<StyledDivLabel className="photo-upload">
						<label>Photo upload</label>
						<StyledDivSimple padding="0">
							{catImage && (
								<img src={catImage.url || placeholder} alt="selected file" />
							)}
							<label hrmlFor="image">
								<input
									type="file"
									id="image"
									name="image"
									accept="image/*"
									onChange={handleImageChange}
								/>
								<StyledDivBorder className="photo-upload-icon">
									<FaPlus />
								</StyledDivBorder>
							</label>
						</StyledDivSimple>
						<StyledButton
							type="button"
							className="delete-photo"
							onClick={() => setCatImage({ url: "", file: null })}>
							Delete photo
						</StyledButton>
					</StyledDivLabel>
					{showToast === "Cat data was uploaded successfully!" && (
						<Toast type="ok" setShowToast={setShowToast}>
							{showToast}
						</Toast>
					)}
					{showToast && showToast !== "Cat data was uploaded successfully!" && (
						<Toast type="error" setShowToast={setShowToast}>
							{showToast}
						</Toast>
					)}
					<StyledDivSimple padding="0" justify="center">
						<StyledButton onClick={() => navigate(-1)}>Cancel</StyledButton>
						<StyledPrimaryButton type="submit">Upload</StyledPrimaryButton>
					</StyledDivSimple>
				</StyledCatUploadForm>
			</StyledSection>
			<StyledBGSection bgImg={cloudinaryRoot + "catspotter-assets/BG_notification_udcr7h.jpg"}></StyledBGSection>
		</StyledPage>
	);
}
