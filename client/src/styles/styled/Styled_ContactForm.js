import { v } from "../Variables";
import styled from "styled-components";

export const StyledForm = styled.form`
	width: 100%;
	max-width: 600px;
	margin: 3rem auto 0;
	display: flex;
	flex-direction: column;
	gap: ${v.mdSpacing};

	input,
	textarea {
		background: transparent;
		outline: none;
		border: none;
		padding: 0;
		width: 100%;
		font-size: ${v.mdSpacing};

		::placeholder {
			color: ${v.columbiaBlue};
		}
	}

	button {
		margin-top: ${v.xlSpacing};
		align-self: flex-start;
	}

	input:-webkit-autofill,
	input:-webkit-autofill:hover,
	input:-webkit-autofill:focus {
		background-color: transparent;
		-webkit-background-clip: text !important;
		-webkit-text-fill-color: ${v.charcoal};
	}
`;
