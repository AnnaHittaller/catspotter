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
import { LocationContext } from "../context/LocationContext";
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

export default function CatUploadPage() {
	//const { location } = useContext(LocationContext);
	const { state } = useContext(AppContext);
	const [toast, setToast] = useState("");
	const [date, onChange] = useState(new Date());
	const [lost, setLost] = useState(false);
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

	const placeholder =
		"https://res.cloudinary.com/dgum1eu6e/image/upload/v1688906503/placeholder_sfuu70.png";

	const [catImage, setCatImage] = useState({
		url: placeholder,
		file: null,
	});

	// const handleLostSeenChange = (selectedOption) => {
	// 	if (selectedOption && selectedOption.value === "lost") {
	// 		setLost(true);
	// 	} else {
	// 		setLost(false);
	// 	}
	// };

	useEffect(() => {
		const fetchAddress = async () => {
			try {
				const response = await axios.get(
					`https://nominatim.openstreetmap.org/reverse?lat=${markerCoords.lat}&lon=${markerCoords.lng}&format=json`
				);
				console.log("nominatim", response.data.address);
				if (response.data.address.postcode)
					setPostcode(response.data.address.postcode);
				if (response.data.address.city) setCity(response.data.address.city);
				if (response.data.address.suburb)
					setSuburb(response.data.address.suburb);
				if (response.data.address.road) setStreet(response.data.address.road);
			} catch (error) {
				console.log(error);
				setToast("Error while uploading the data.");
			}
		};
		fetchAddress();
	}, [markerCoords]);

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
				setStatus(selectedOption);
				break;
			case "coatLength":
				setCoatLength(selectedOption);
				break;
			case "coatPattern":
				setPattern(selectedOption);
				break;
			case "coatColor":
				setColor(selectedOption);
				break;
			default:
				break;
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

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

			console.log("formdata", formdata);

			for (let pair of formdata.entries()) {
				console.log(pair[0] + ": " + pair[1]);
			}

			console.log("pattern", pattern);
			console.log("color", color);
			console.log("status", status);
			console.log("coatLength", coatLength);
			console.log(typeof markerCoords.lng, markerCoords.lng);

			const response = await axios.post("/cats/add", formdata);
			console.log("response", response);
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
					<StyledSpan type="icon-span">
						<StyledPBold>
							{" "}
							<BsQuestionCircle />
							Check <StyledLink to="/guides">the guides</StyledLink> for
							detailed description of coat patterns and colors.
						</StyledPBold>
					</StyledSpan>
					<StyledDivLabel padding="0">
						<label>Pick a date</label>
						<DatePicker onChange={onChange} value={date} locale="en-EN" />
					</StyledDivLabel>
					<StyledDivLabel padding="0">
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
					<StyledDivLabel padding="0" textAlign="left">
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
						/>
					</StyledDivLabel>
					<StyledDivLabel padding="0" textAlign="left">
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
						/>
					</StyledDivLabel>
					<StyledDivLabel padding="0" textAlign="left">
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
						/>
					</StyledDivLabel>
					<StyledDivLabel padding="0" textAlign="left">
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
						/>
					</StyledDivLabel>
					<img src="https://picsum.photos/300/200" alt="cat illustration" />
					{status.value === "lost" && (
						<>
							<StyledDivLabel padding="0">
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
							<StyledDivLabel padding="0">
								<label>Finder's reward</label>
								<input
									type="text"
									placeholder="Amount of reward..."
									id="reward"
									name="reward"
									value={reward}
									onChange={(e) => setReward(e.target.value)}
								/>
							</StyledDivLabel>
							<StyledDivLabel padding="0">
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
					<StyledDivLabel padding="0">
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
					<StyledDivLabel>
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
								<StyledDivBorder className="photo-upload">
									<FaPlus />
								</StyledDivBorder>
							</label>
						</StyledDivSimple>
						<StyledButton
							type="button"
							onClick={() => setCatImage({ url: "", file: null })}>
							Delete photo
						</StyledButton>
					</StyledDivLabel>
					<StyledDivSimple padding="0" justify="center">
						<StyledButton>Go back</StyledButton>
						<StyledPrimaryButton type="submit">Upload</StyledPrimaryButton>
					</StyledDivSimple>
				</StyledCatUploadForm>
			</StyledSection>
			<StyledBGSection bgImg="https://res.cloudinary.com/dgum1eu6e/image/upload/v1688899663/catspotter-assets/BG_notification_udcr7h.jpg"></StyledBGSection>
		</StyledPage>
	);
}
