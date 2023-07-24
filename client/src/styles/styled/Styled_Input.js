import { v } from "../Variables";
import styled from "styled-components";

export const StyledInput = styled.input`
	border: 2px solid ${v.columbiaBlue};
	padding: 0.25rem 0.75rem;
	outline: none;
	border-radius: ${v.borderRadius};
	min-width: 150px;
	color: ${v.charcoal};
	font-size: 1rem;
	background-color: ${v.babyPowder};
    transition: .2s ease;

    &:hover {
        border: 2px solid ${v.sunGlow};
    }
`;