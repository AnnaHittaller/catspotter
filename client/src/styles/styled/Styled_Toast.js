import { v } from "../Variables";
import styled from "styled-components";
import { StyledDivBorder } from "./Styled_Div";

export const StyledToast = styled(StyledDivBorder)`
	border: 2px solid
		${({ type }) => {
			if (type === "error") return "#e33454 !important";
			if (type === "ok") return "#34e365 !important";
			return `${v.sunGlow} !important`; // Default border color
		}};
	position: relative;
	overflow: hidden;

	svg {
		position: absolute;
		top: 0;
		right: 0;
		padding: 0.25rem;
		font-size: 1.5rem;
		color: ${({ type }) => {
			if (type === "error") return "#e33454";
			if (type === "ok") return "#34e365";
			return v.sunGlow;
		}};
		background-color: transparent;
		border-radius: 0 0 0 10px;
		border: ${({ type }) => {
			if (type === "error") return "#e33454";
			if (type === "ok") return "#34e365";
			return "2px solid v.sunGlow";
		}};
		cursor: pointer;
		transition: 0.2s ease;

		&:hover {
			font-weight: 800;
		}
	}

	p {
		font-size: 14px;
		text-align: center;
		margin: 0 auto;
	}
`;

export const StyledToastError = styled(StyledToast)`
	border-color: #e33454;
`;

export const StyledToastOk = styled(StyledToast)`
	border-color: #34e365;
`;
