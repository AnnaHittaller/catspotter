import { v } from "../Variables";
import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledP = styled.p`
	font-size: ${v.mdSpacing};
	font-weight: 400;
	color: ${(props) => props.color || ""};

	@media (max-width: 500px) {
		font-size: 14px;
	}
`;

export const StyledPBold = styled(StyledP)`
	font-weight: 600;
`;

export const StyledSpan = styled.span`
	font-size: ${v.mdSpacing};
	font-weight: 400;

	${(props) =>
		props.type === "icon-span" &&
		`
    display: flex;
    align-items: center;
    line-height: 1.5;
    gap: .5rem;
    
    svg {
      color: ${v.sunGlow};
      font-size: 20px;
      flex-shrink: 0;
      font-weight: 600;
      margin-bottom: -4px;
      margin-right: .5rem;
    }
    `}
`;

export const StyledSpanBold = styled(StyledSpan)`
	font-size: ${v.mdSpacing};
	font-weight: 600;
	color: ${(props) => props.color || ""};
`;

export const StyledPBig = styled(StyledPBold)`
	font-size: 20px;

	@media (max-width: 500px) {
		font-size: 1rem;
	}
`;

export const StyledLink = styled(Link)`
	color: ${v.cadetGrey};

	&:visited {
		color: ${v.cadetGrey};
	}
`;
