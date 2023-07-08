import styled from "styled-components";
import { v, btnReset } from "../Variables";
import { StyledButton } from "./Styled_Button";

export const StyledFormWrapper = styled.div`
	position: relative;
	min-height: 440px;
	background: rgba(203, 215, 226, 0.5);
	border: 2px solid rgba(203, 215, 226, 0.8);
	border-radius: 10px;
	box-shadow: 0 0 30px rgba(56, 79, 100, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
`;

// this below is not more needed
export const StyledCloseIcon = styled.div`
	position: absolute;
	top: 0;
	right: 0;
	padding: 0.5rem;
	font-size: 1.5rem;
	font-weight: bold;
	background-color: ${v.babyPowder};
	color: ${v.charcoal};
	border-radius: 0 0 0 10px;
	z-index: 1;
`;

export const StyledFormBox = styled.div`
	width: 100%;
	padding: 40px;

	h2 {
		font-size: 2rem;
		color: ${v.charcoal};
		margin-top: 1rem;
		text-align: center;
		letter-spacing: 0.5px;
		font-weight: 400;
	}
`;

export const StyledInputBox = styled.div`
	position: relative;
	width: 100%;
	height: 50px;
	border-bottom: 2px solid ${v.charcoal};
	margin: 30px 0;

	label {
		position: absolute;
		top: 30px;
		left: 5px;
		transform: translateY(-50%);
		font-size: 1rem;
		color: ${v.charcoal};
		font-weight: 500;
		pointer-events: none;
		transition: 0.5s;
	}

	input {
		width: 100%;
		height: 100%;
		background: transparent;
		border: none;
		outline: none;
		color: ${v.charcoal};
		font-weight: 600;
		padding: 0 35px 0 6px;
		letter-spacing: 1.5px;
	}

	input:-webkit-autofill,
	input:-webkit-autofill:hover,
	input:-webkit-autofill:focus {
		background-color: transparent;
		-webkit-background-clip: text !important;
		-webkit-text-fill-color: ${v.charcoal};
	}

	input:-internal-autofill-selected {
		appearance: menulist-button;
		background-image: none !important;
	}

	input:focus ~ label,
	input:not(:placeholder-shown) ~ label {
		top: 0px;
		color: ${v.cadetGrey};
	}

	svg {
		position: absolute;
		right: 8px;
		bottom: 12px;
		font-size: 1.2rem;
		color: ${v.charcoal};
	}
`;

export const StyledVisibilityBtn = styled.button`
	background: transparent;
	position: absolute;
	height: 30px;
	width: 30px;
	bottom: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	right: 40px;
	color: ${v.charcoal};
	font-size: 1.5rem;
	border: none;
	cursor: pointer;

	svg {
		position: absolute;
		right: 8px;
		bottom: 10px;
		font-size: 1.2rem;
		color: ${v.charcoal};
	}
`;

export const StyledRememberForgotBox = styled.div`
	display: flex;
	color: ${v.charcoal};
	font-size: 0.9rem;
	margin: -1rem 0 1rem;
	justify-content: space-between;
	align-items: center;
	font-weight: 400;
	line-height: 0.9rem;
	gap: 1rem;

	label {
		display: flex;
		align-items: ${({ currentForm }) =>
			currentForm === "login" ? "center" : "flex-start"};

		white-space: ${({ currentForm }) =>
			currentForm === "login" ? "nowrap" : "normal"};
	}

	input {
		margin-right: 0.25rem;
		accent-color: ${v.charcoal};
		color: white;
		font-size: 0.9rem;
		margin-top: ${({ currentForm }) =>
			currentForm === "login" ? null : "4px"};
	}

	button {
		color: ${v.charcoal};
		border: none;
		background-color: transparent;
		width: unset;
		border-radius: unset;
		font-size: 0.9rem;
		height: unset;
		padding: 0;
		font-weight: 400;
		letter-spacing: 0.2px;
		cursor: pointer;
		transition: 0.3s;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		white-space: nowrap;

		a {
			text-decoration: none;
			color: inherit;
		}

		:after {
			content: "";
			background-color: ${v.cadetGrey};
			position: absolute;
			height: 2px;
			width: 0%;
			left: 0;
			bottom: 0;
			right: 0;
			transition: 0.2s;
			tranform-origin: left;
		}
	}

	button:hover {
		:after {
			width: 100%;
		}
	}

	@media (max-width: 400px) {
		flex-direction: column;
		gap: 0.5rem;
	}
`;

export const StyledSubmitButton = styled(StyledButton)`
	width: 100%;
	height: 45px;
`;

export const StyledLoginRegisterBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 0.5rem;
	font-size: 0.9rem;
	color: ${v.charcoal};
	font-weight: 400;
	padding: 1rem 0;
	text-align: center;

	p {
		white-space: nowrap;
	}

	button {
		background: transparent;
		border: none;
		color: ${v.charcoal};
		font-size: 0.9rem;
		font-weight: bold;
		letter-spacing: 0.2px;
		cursor: pointer;
		transition: 0.3s;
		border-bottom: 1px solid transparent;
		position: relative;

		:after {
			content: "";
			background-color: ${v.cadetGrey};
			position: absolute;
			height: 2px;
			width: 0%;
			left: 0;
			bottom: 0;
			right: 0;
			transition: 0.2s;
			tranform-origin: left;
		}
	}

	button:hover {
		:after {
			width: 100%;
		}
	}

	@media (max-width: 400px) {
		flex-direction: column;
		gap: 0.5rem;
	}
`;

export const StyledFlipContainer = styled.div`
	perspective: 1000px;

	@media (max-width: 500px) {
		padding-bottom: 0rem;
	}
`;

export const StyledFlipper = styled.div`
	position: relative;
	transition: transform 0.6s;
	transform-style: preserve-3d;
	display: flex;
	align-items: flex-start;
	justify-content: center;
	width: 100%;
	min-height: 560px;
	padding-top: 4rem;

	@media (max-width: 600px) {
		padding-top: 2rem;
	}

	&.flip {
		transform: rotateY(180deg);
	}
`;

export const StyledFront = styled.div`
	position: absolute;
	min-height: 440px;
	min-width: 260px;
	width: 500px;
	backface-visibility: hidden;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	@media (max-width: 500px) {
		width: 260px;
	}
`;

export const StyledBack = styled.div`
	position: absolute;
	min-height: 440px;
	min-width: 260px;
	width: 500px;
	backface-visibility: hidden;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	transform: rotateY(180deg);

	@media (max-width: 500px) {
		width: 260px;
	}
`;
