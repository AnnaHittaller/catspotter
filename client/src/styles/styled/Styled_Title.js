import { v } from "../Variables";
import styled from "styled-components";

export const StyledH2 = styled.h2`
	font-size: ${v.xlSpacing};
	font-weight: 400;
	position: relative;
	z-index: 0;
	white-space: nowrap;
`;

export const StyledH2Underline = styled(StyledH2)`
	text-align: center;
	margin: 0 auto;

	&::after {
		content: "";
		background-color: ${v.columbiaBlue};
		height: ${v.mdSpacing};
		width: calc(100% + 10px);
		position: absolute;
		left: -5px;
		z-index: -1;
		bottom: 0;
		transform: translateY(25%);
	}

	${(props) =>
		props.page === "home" &&
		`
    @media (max-width: 1200px) {
      font-size: ${v.lgSpacing};
    }
  `}

	@media (max-width: 768px) {
		text-align: center;
		align-self: center;
	}
`;

export const StyledH3 = styled.h3`
	font-size: ${v.lgSpacing};
	font-weight: 400;
`;

export const StyledH4Underline = styled.h4`
	font-size: 20px;
	font-weight: 800;
	position: relative;
	z-index: 0;

	&::after {
		content: "";
		background-color: ${v.sunGlow};
		height: 13px;
		width: calc(100% + 10px);
		position: absolute;
		left: -5px;
		z-index: -1;
		bottom: 0;
		transform: translateY(25%);
	}
`;
