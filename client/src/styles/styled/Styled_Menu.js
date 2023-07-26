import { v } from "../Variables";
import styled from "styled-components";
import { StyledDivBorder } from "./Styled_Div";

export const StyledMenuMini = styled(StyledDivBorder)`
	flex-direction: column;
	padding: 0;
	width: unset;
	gap: 0;
	background-color: ${v.babyPowder};
	position: absolute;
	right: 3rem;
	overflow: hidden;
	height: unset;

	a {
		text-decoration: none;
		color: ${v.charcoal};
		//transition: 0.2s ease;
	}

	// a:hover {
	// 	background-color: ${v.cadetGrey};
	// }

	a p {
		font-weight: 600;
		transition: 0.2s ease;
	}

	a p:hover {
		color: ${v.sunGlow};
	}

	p {
		padding: 0.5rem;
	}

	div {
		height: 2px;
		background-color: ${v.cadetGrey};
		width: 100%;
	}
`;

export const StyledMenuMidi = styled(StyledDivBorder)`
	flex-direction: column;
	padding: 0;
	width: unset;
	gap: 0;
	text-align: center;
	overflow: hidden;
	font-size: 16px;

	p {
		font-size: 14px;
	}

	a {
		text-decoration: none;
		color: ${v.charcoal};
		transition: 0.2s ease;
		width: 100%;
	}

	// a:hover {
	// 	background-color: ${v.columbiaBlue};
	// }

	a p {
		font-weight: 600;
		transition: 0.2s ease;
		padding-top: 0.25rem;
	}

	a p:hover {
		color: ${v.sunGlow};
	}

	div:nth-child(even) {
		height: 2px;
		background-color: ${v.cadetGrey};
		width: 100%;
	}

	div:nth-child(1) {
		background-color: ${(props) =>
			props.type === "Lost" ? v.sunGlow : v.columbiaBlue};
		width: 100%;
		font-weight: 600;
		padding-top: 0.25rem;
	}

	div:nth-child(3) {
		width: 100%;
		padding: 0.5rem;
		font-weight: 600;
	}

	p:first-child {
		padding-bottom: 0.25rem;
	}
`;

export const StyledMenuAddress = styled(StyledDivBorder)`
	flex-direction: column;
	padding: 0.75rem 0.5rem;
	width: unset;
	gap: 0;
	text-align: center;
	overflow: hidden;
	font-size: 14px;
`;
