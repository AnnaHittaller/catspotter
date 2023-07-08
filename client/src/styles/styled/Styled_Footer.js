import styled from "styled-components";
import { v } from "../Variables";

export const StyledFooter = styled.div`
	display: flex;
	flex-direction: ${({ sidebaropen }) => (sidebaropen ? `column` : `row`)};
	align-items: center;
	position: absolute;
	bottom: 0;
	right: 0;
	background-color: ${v.cadetGrey};
	justify-content: space-between;
	padding: ${v.mdSpacing} ${v.xlSpacing};
	width: 100%;
	transition: 0.2s ease;
	height: ${({ sidebaropen }) => (sidebaropen ? `71px` : `52px`)};

	span,
	a span {
		display: flex;
		align-items: center;
		justify-content: ${({ sidebaropen }) =>
			sidebaropen ? `center` : `flex-start`};
		gap: 0.4rem;
		color: ${v.babyPowder};
		font-size: 0.8rem;
		transition: 0.2s ease;
	}

	a {
		cursor: pointer;
		text-decoration: none;
		color: ${v.babyPowder};
	}

	a:hover span {
		color: ${v.charcoal};
	}

	span:nth-child(2) svg {
		color: pink;
	}

	@media (max-width: 768px) {
		width: ${({ sidebaropen }) => (sidebaropen ? `0px` : `100%`)};
		display: ${({ sidebaropen }) => (sidebaropen ? `none` : `unset`)};
		height: 71px;

		span,
		a span {
			justify-content: center;
			white-space: nowrap;
		}
	}

	@media (max-width: 380px) {
		height: unset;
		span:nth-child(2) {
			display: flex;
			flex-direction: column;
			align-items: center;
			text-align: center;
			justify-items: center;
		}
	}
`;
