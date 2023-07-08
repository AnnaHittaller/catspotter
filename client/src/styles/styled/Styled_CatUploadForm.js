import { v } from "../Variables";
import styled from "styled-components";

export const StyledCatUploadForm = styled.form`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: stretch;
	gap: 1rem;
	justify-content: center;
	text-align: center;

	button:nth-of-type(1) {
		align-self: center;
	}

	.react-calendar {
		z-index: 9999;
		position: relative;
		background: ${v.babyPowder};
		border: 2px solid ${v.columbiaBlue};
		font-family: Quicksand, sans-serif;
		line-height: 1.125em;
		border-radius: ${v.borderRadius};
	}

	.react-date-picker__calendar {
		z-index: 9999;
	}

	.react-calendar__month-view__days__day {
		color: ${v.charcoal};
	}

	.react-calendar__month-view__days__day--weekend {
		color: ${v.sunGlow};
	}

	.react-calendar__month-view__days__day--neighboringMonth {
		color: ${v.cadetGrey};
	}

	.react-calendar__tile {
		padding: 7px 5px;
		background: none;
		text-align: center;
		line-height: 16px;
		transition: 0.1s ease;

		&:hover {
			background: ${v.columbiaBlue};
			color: ${v.charcoal};
		}
	}

	.react-date-picker__wrapper,
	.react-time-picker__wrapper {
		border: none;
		padding: 0.5rem 0.75rem;
	}

	.react-date-picker__inputGroup__input:invalid,
	.react-time-picker__inputGroup__input:invalid {
		background: ${v.columbiaBlue};

		&:focus {
			outline: none;
		}
	}

	.react-date-picker__button:enabled:hover .react-date-picker__button__icon,
	.react-date-picker__button:enabled:focus .react-date-picker__button__icon,
	.react-time-picker__button:enabled:hover svg:hover,
	.react-time-picker__button:hover svg {
		stroke: ${v.sunGlow};
	}

	.react-date-picker__button:enabled .react-date-picker__button__icon,
	.react-date-picker__button:enabled .react-date-picker__button__icon,
	.react-time-picker__button:enabled svg {
		stroke: ${v.charcoal};
	}

	.react-calendar__tile--now {
		background: ${v.cadetGrey};
		color: white;

		&:hover {
			background: ${v.columbiaBlue};
		}
	}

	.react-calendar__tile--active {
		background: ${v.sunGlow};
		color: ${v.charcoal};
	}

	.react-time-picker__inputGroup__input,
	.react-time-picker__inputGroup__input:enabled,
	.react-time-picker__inputGroup__input:focus {
		min-width: 0.8em;
		padding: 0px 10px !important;
		color: ${v.charcoal};
		font-family: Quicksand, sans-serif;
		box-sizing: content-box;
		appearance: textfield;
		border: none;
		outline: none;
	}

	img {
		max-width: 200px;
		margin: 0 auto;
	}

	> div {
		align-self: center;
		border: none;
		width: 100%;

		label {
			z-index: 5;
		}
	}

	span:first-of-type {
		margin: 0 auto;
	}

	> div: nth-of-type(1) {
		border: 2px solid ${v.cadetGrey};
	}

	> div:nth-of-type(3),
	> div:nth-of-type(2) {
		border: 2px solid ${v.columbiaBlue};
		min-width: 220px;
		width: 100%;
		max-width: 600px;

		&:hover {
			border: 2px solid ${v.sunGlow};
		}
	}

	> div:nth-of-type(4),
	> div:nth-of-type(5),
	> div:nth-of-type(6),
	> div:nth-of-type(7) {
		width: 100%;
		max-width: 600px;
	}

	#lostSeen,
	#coatPattern,
	#coatLength,
	#coatColor {
		width: 100%;
	}

	textarea,
	input[type="text"] {
		padding: 0.5rem 0.75rem;
		outline: none;
		border: 2px solid ${v.columbiaBlue};
		border-radius: ${v.borderRadius};
		min-width: 220px;
		width: 100%;
		max-width: 600px;
		color: ${v.charcoal};
		font-size: 1rem;
		background-color: ${v.babyPowder};

		&:hover {
			border: 2px solid ${v.sunGlow};
		}
	}
`;
