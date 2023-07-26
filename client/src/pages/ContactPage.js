import { StyledPage } from "../styles/styled/Styled_Page";
import {
	StyledBGSection,
	StyledSection,
} from "../styles/styled/Styled_Section";

import {
	StyledH2Underline,

} from "../styles/styled/Styled_Title";
import {
	StyledDivBorder,
	StyledDivLabel,
	StyledDivSimple,
	StyledDivSimpleGrid,
} from "../styles/styled/Styled_Div";
import { StyledForm } from "../styles/styled/Styled_ContactForm";

import { useEffect, useState } from "react";
import { StyledPrimaryButton } from "../styles/styled/Styled_Button";

import Toast from "../components/Toast";
import axios from "axios";
import { cloudinaryRoot } from "../utils/ImageUrlRoot";


export default function ContactPage() {
	//dotenv.config();
	const [message, setMessage] = useState({
		name: "",
		email: "",
		text: "",
	});

	const [emailError, setEmailError] = useState(false);
	const [formError, setFormError] = useState(false);
	const [formSubmitted, setFormSubmitted] = useState(false);
	const [showToast, setshowToast] = useState(false);
 
	const validateEmail = (email) => {
		const emailRegex = /^\S+@\S+\.\S+$/;
		return emailRegex.test(email);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		//console.log("handleSubmit fired");
		

		if (!message.name || !message.text) {
			setFormError(true);
			setEmailError(false);
			setshowToast(true);
			return;
		}

		if (!validateEmail(message.email)) {
			setEmailError(true);
			setFormError(false);
			setshowToast(true);
			return;
		}

		//submission logic comes here
		console.log("submit", message);

		try {
			await axios.post("https://formspree.io/f/mzblpvwo", message, {
				withCredentials: true,
			});

			// Reset the form
			setMessage({ name: "", email: "", text: "" });
			setEmailError(false);
			setFormError(false);
			setshowToast(true);
			setFormSubmitted(true);
		} catch (error) {
			console.log("Error submitting form:", error);
			// Handle the error
		}
	};

	useEffect(() => {
		if (showToast) {
			const timer = setTimeout(() => {
				setshowToast(false);
			}, 3000);

			return () => {
				clearTimeout(timer);
			};
		}
	}, [showToast]);

	return (
		<StyledPage display="flex" flexDirection="column" justify="space-between">
			<StyledSection minHeight="100%">
				<StyledH2Underline>Contact</StyledH2Underline>
				<StyledForm
					noValidate
					onSubmit={handleSubmit}
					action="https://formspree.io/f/mzblpvwo">
					<StyledDivLabel>
						<label htmlFor="name">Name</label>
						<input
							type="text"
							id="name"
							name="name"
							placeholder="Your name"
							value={message.name}
							onChange={(e) => setMessage({ ...message, name: e.target.value })}
							required
						/>
					</StyledDivLabel>
					<StyledDivLabel>
						<label htmlFor="email">Email</label>
						<input
							type="text"
							id="email"
							name="email"
							placeholder="Your email address"
							value={message.email}
							onChange={(e) =>
								setMessage({ ...message, email: e.target.value })
							}
							required
						/>
					</StyledDivLabel>
					{emailError && showToast && (
						<Toast type="error">Please enter a valid email address.</Toast>
					)}
					<StyledDivLabel>
						<label htmlFor="text">Message</label>
						<textarea
							id="text"
							name="text"
							placeholder="Your message"
							rows="5"
							value={message.text}
							onChange={(e) => setMessage({ ...message, text: e.target.value })}
							required
						/>
					</StyledDivLabel>

					{formError && showToast && (
						<Toast type="error">Please fill in all required fields.</Toast>
					)}
					{formSubmitted && showToast && (
						<Toast type="ok">Form submitted successfully.</Toast>
					)}
					<StyledPrimaryButton type="submit">Send message</StyledPrimaryButton>
				</StyledForm>
			</StyledSection>
			<StyledBGSection
				bgImg={
					cloudinaryRoot + "catspotter-assets/BG_contact2_rnmpis.jpg" // or import the cloudinaryRoot to styled section directly?
				}></StyledBGSection>
		</StyledPage>
	);
}
