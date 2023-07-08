import { StyledPage } from "../styles/styled/Styled_Page";
import {
	StyledBGSection,
	StyledSection,
} from "../styles/styled/Styled_Section";
import {
	StyledPBig,
	StyledP,
	StyledSpan,
	StyledSpanBold,
	StyledPBold,
	StyledLink,
} from "../styles/styled/Styled_Text";
import {
	StyledH2Underline,
	StyledH3,
	StyledH4Underline,
} from "../styles/styled/Styled_Title";
import {
	StyledDivBorder,
	StyledDivLabel,
	StyledDivSimple,
	StyledDivSimpleGrid,
} from "../styles/styled/Styled_Div";
import CatInfoSheetMidi from "../components/CatInfoSheetMidi";
import Toast from "../components/Toast";
import CatInfoSheetMaxi from "../components/CatInfoSheetMaxi";
import BG_upload from "../assets/bgImages/BG_upload.jpg";
import MapForUpload from "../components/MapForUpload";
import { BsQuestionCircle } from "react-icons/bs";
import { useContext, useState } from "react";
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
import MapCatUpload from "../components/leaflet/MapCatUpload";

export default function CatUploadPage() {
	const { location } = useContext(LocationContext);
	const [date, onChange] = useState(new Date());
	const [lost, setLost] = useState(false);

	const handleLostSeenChange = (selectedOption) => {
		if (selectedOption && selectedOption.value === "lost") {
			setLost(true);
		} else {
			setLost(false);
		}
	};

	const currentTime = new Date();
	const formattedTime = currentTime.toTimeString().slice(0, 5);
	const [time, setTime] = useState(formattedTime);

	return (
		<StyledPage display="flex" flexDirection="column">
			<StyledSection justify="center">
				<StyledH2Underline>Upload a cat</StyledH2Underline>
				<StyledPBold>
					Please select the cat's most accurate location (drag the map marker to
					the exact point) on the map and fill out the form below.
				</StyledPBold>
				<StyledCatUploadForm>
					<MapCatUpload height="30vh" />
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
							onChange={handleLostSeenChange}
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
						/>
					</StyledDivLabel>
					<img src="https://picsum.photos/300/200" alt="cat illustration" />
					{lost === true && (
						<>
							<StyledDivLabel padding="0">
								<label>Chip number</label>
								<input type="text" placeholder="Chip number..." />
							</StyledDivLabel>

							<StyledDivLabel padding="0">
								<label>Finder's reward</label>
								<input type="text" placeholder="Amount of reward..." />
							</StyledDivLabel>
							<StyledDivLabel padding="0">
								<label>Contact phone</label>
								<input type="text" placeholder="Telephone number..." />
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
						/>
					</StyledDivLabel>{" "}
					PICTURE UPLOAD
					<StyledDivSimple padding="0" justify="center">
						<StyledButton>Go back</StyledButton>
						<StyledPrimaryButton type="submit">Upload</StyledPrimaryButton>
					</StyledDivSimple>
				</StyledCatUploadForm>
			</StyledSection>
			<StyledBGSection bgImg={BG_upload}></StyledBGSection>
		</StyledPage>
	);
}
