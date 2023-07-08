import styled from "styled-components";
import { v } from "../Variables";

export const StyledLayout = styled.div`
	display: flex;
	position: relative;
`;

export const StyledMain = styled.div`
	width: ${({ theme }) =>
		theme.sidebaropen
			? `calc(100% - ${v.sidebarWidth})`
			: `calc(100% - 100px)`};
	position: absolute;
	right: 0;
	min-height: 100vh;
	padding-bottom: ${({ theme }) => (theme.sidebaropen ? `71px` : `52px`)};
	background: ${v.babyPowder};
	transition: 0.2s ease;

	@media (max-width: 768px) {
		width: ${({ theme }) => (theme.sidebaropen ? `0px` : `100%`)};
		display: ${({ theme }) => (theme.sidebaropen ? `none` : `unset`)};
		padding-bottom: 71px;
	}

	@media (max-width: 380px) {
		padding-bottom: 115px;
		min-height: ${({ location }) =>
			location.pathname === "/login" ? "800px" : "100vh"};
		height: ${({ location }) => (location.pathname === "login" ? "100vh" : "")};
	}
`;
