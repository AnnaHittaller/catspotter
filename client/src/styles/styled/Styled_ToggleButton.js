import { v } from "../Variables";
import styled from "styled-components";

export const StyledToggleButton = styled.div`
	label {
		display: flex;
		align-items: center;
		gap: 10px;
		cursor: pointer;
	}

	input {
		display: none;

		&:checked + div {
			background: ${v.sunGlow};

			&:before {
				transform: translate(21px, -50%);
			}
		}
	}

	div {
		position: relative;
		width: 50px;
		height: 28px;
		background: ${v.columbiaBlue};
		border-radius: 20px;
		padding: 4px;
		transition: 300ms all;
		display: flex;
		align-items: center;

		&:before {
			content: "";
			position: absolute;
			width: 23px;
			height: 23px;
			border-radius: 50%;
			top: 50%;
			left: 3px;
			background: ${v.charcoal};
			transform: translate(0, -50%);
			transition: 300ms all;
		}

		p {
			font-weight: 500;
			font-size: 14px;
		}
	}
`;
