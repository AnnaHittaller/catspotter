import styled from "styled-components";
import { v } from "../Variables";

export const StyledPage = styled.div`
	min-height: ${({ theme }) =>
		theme.sidebaropen ? `calc(100vh - 71px)` : `calc(100vh - 52px)`};
	width: 100%;
	background-color: ${v.babyPowder};
	display: ${(props) => props.display || "unset"};
	justify-content: ${(props) => props.justify || "unset"};

	@media (max-width: 768px) {
		flex-direction: ${(props) => props.flexDirection || "unset"};
		min-height: calc(100vh - 71px);
	}

	@media (max-width: 380px) {
		min-height: calc(100vh - 115px);
	}
`;
