import { v, btnReset } from "../Variables";
import styled from "styled-components";

export const StyledButton = styled.button`
	${btnReset};
	border-radius: ${v.borderRadius};
	border: 3px solid ${v.sunGlow};
	background-color: ${v.babyPowder};
	color: ${v.charcoal};
	font-weight: bold;
	font-size: 1rem;
	line-height: 1rem;
	padding: 0.35rem 0.5rem;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.25rem;
	text-align: center;
	transition: 0.2s ease;

	a {
		text-decoration: none;
		color: unset;
	}

	&:hover {
		background-color: #ffdb67;
	}
`;

export const StyledPrimaryButton = styled(StyledButton)`
	background-color: ${v.sunGlow};
`;
