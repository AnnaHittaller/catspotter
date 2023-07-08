import { v } from "../Variables";
import styled from "styled-components";
import { StyledForm } from "./Styled_ContactForm";

export const StyledUserData = styled.div`
	width: 100%;
	max-width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	gap: ${v.smSpacing};
	align-items: center;
	height: 100%;

	> div:nth-of-type(1) {
		display: flex;
		width: 100%;

		> div:first-child {
			flex-shrink: 2;
			text-align: center;
		}

		@media (max-width: 1000px) {
			flex-direction: column;
		}
	}

	> img {
		width: 70px;
		height: 70px;
		background-color: ${v.babyPowder};
		border-radius: 50%;
		color: #384f64;
	}

	button {
		margin-top: auto;
	}

	@media (max-width: 768px) {
		flex-direction: column;
	}
`;

export const StyledUserUpdateForm = styled(StyledForm)`
	input[type="file"] + img {
		width: 100px;
		height: 100px;
		background-color: ${v.babyPowder};
		border-radius: 50%;
		color: #384f64;
	}

	input[type="file"] {
		display: none;
	}

	label:nth-of-type(2) {
		position: relative;
	}

	label:nth-of-type(2) > div {
		cursor: pointer;
		background-color: rgba(255, 253, 247, 0.5);
		border: 2px solid ${v.cadetGrey};
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		width: 100px;
		height: 100px;
		position: absolute;
		top: 0;
		opacity: 0;
		transition: 0.2s ease;

		&:hover {
			opacity: 1;
		}

		svg {
			font-size: 2rem;
		}

		svg path {
			stroke: ${v.charcoal};
		}
	}

	input[type="password"] {
		position: relative;
	}

	> div button {
		margin: 0;
		position: absolute;
		right: 0;
		top: 50%;
		transform: translateY(-30%);

		svg {
			margin: 0;
		}
	}

	> button {

		align-self: center;
	}

	.leaflet-control-geocoder-icon {
		position: relative;
		transform: translateY(0)
	}
`;
