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

	.delete-photo {
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
		background: transparent;

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

	.select,
	.text-input,
	.date-time-picker {
		align-self: center;
		width: 100%;
		max-width: 600px;
		border: 2px solid ${v.columbiaBlue};

		label {
			z-index: 5;
		}
	}

	.text-input span {
		position: absolute;
		right: 1rem;
		top: 50%;
		transform: translateY(-50%);
	}

	.date-time-picker {
		&:hover {
			border: 2px solid ${v.sunGlow};
		}
	}

	.icon-span {
		margin: 0 auto;
	}

	>div: nth-of-type(1) {
		border: 2px solid ${v.cadetGrey};
	}

	.select {
		border: none;
	}

	#lostSeen,
	#coatPattern,
	#coatLength,
	#coatColor {
		width: 100%;
		border: none;
	}

	.cat-svg svg {
		max-width: 200px;
		margin: 0 auto;
	}

	textarea,
	input[type="text"] {
		padding: 0.5rem 0.75rem;
		outline: none;
		border: none;
		border-radius: ${v.borderRadius};
		min-width: 220px;
		width: 100%;
		max-width: 600px;
		color: ${v.charcoal};
		font-size: 1rem;
		background-color: ${v.babyPowder};
	}

	.photo-upload {
		max-width: 600px;
		width: 100%;
		margin: 0 auto;

		> div {
			justify-content: center;
			flex-wrap: wrap;
		}

		input[type="file"] {
			display: none;
		}

		img {
			width: 120px;
			height: 120px;
			object-fit: cover;
			margin: 0;
		}
	}

	.photo-upload-icon {
		width: 120px;
		height: 120px;

		display: flex;
		align-items: center;
		justify-content: center;
		background-color: ${v.columbiaBlue};
		cursor: pointer;

		svg {
			font-size: 3rem;
		}
	}
`;
