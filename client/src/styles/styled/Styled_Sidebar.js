import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { v, btnReset } from "../Variables";

export const StyledSidebar = styled.div`
	width: ${({ isOpen }) => (!isOpen ? "100px" : v.sidebarWidth)};
	background-color: ${v.charcoal};
	height: min-content;
	min-height: 100vh;
	padding: ${v.lgSpacing};
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	transition: width 0.2s ease;
	overflow: visible;
	color: ${v.babyPowder};
	z-index: 99999;

	@media (max-width: 768px) {
		width: ${({ isOpen }) => (!isOpen ? "100px" : "100vw")};
		left: ${({ isOpen }) => (!isOpen ? "-100px" : "0")};
		position: absolute;
		padding-bottom: 2rem;
		
	}
`;

export const StyledSidebarButton = styled.button`
	${btnReset};
	position: absolute;
	top: calc(${v.xlSpacing});
	left: ${({ isOpen }) =>
		isOpen ? `calc(${v.sidebarWidth} - 22.5px)` : `110px`};
	width: 45px;
	height: 45px;
	border-radius: 50%;
	background: ${v.charcoal};
	box-shadow: 0 0 4px #89a4bd, 0 0 7px #384f64;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0 3px;
	cursor: pointer;
	font-size: 18px;
	transition: transform 0.3s ease;

	transform: ${({ isOpen }) => (!isOpen ? "rotate(180deg)" : "initial")};

	@media (max-width: 768px) {
		height: 35px;
		width: 35px;
		left: unset;
		left: ${({ isOpen }) => (isOpen ? "unset" : `25px`)};
		right: ${({ isOpen }) => (isOpen ? "40px" : `unset`)};
		position: fixed;
		top: 1.5rem;
	}
`;

export const StyledLogo = styled.div`
	width: 100%;
	display: flex;
	height: 60px;
	justify-self: flex-start;
	align-items: center;
	margin: 0 0 3rem 0;

	img {
		height: ${({ isOpen }) => (isOpen ? "57px" : "65px")};
		transition: 0.2s ease;
	}

	margin-bottom: ${v.xlSpacing};
`;

export const StyledUserInfo = styled.div`
	width: 100%;
	display: flex;
	justify-content: flex-start;
	gap: ${v.mdSpacing};
	align-items: center;

	img {
		width: 50px;
		height: 50px;
		background-color: ${v.babyPowder};
		border-radius: 50%;
		color: #384f64;
	}

	div {
		color: ${v.babyPowder};
		font-weight: 600;
		font-size: 18px;
		white-space: nowrap;
	}
`;

export const StyledDivider = styled.div`
	height: 2px;
	width: 100%;
	background: ${v.babyPowder};
	opacity: 0.5;
	margin: ${v.lgSpacing} 0;
	border-radius: ${v.borderRadius};
`;

export const StyledLinkContainer = styled.div`
	background: ${({ isActive }) => (!isActive ? `transparent` : "#89a4bd")};
	border-radius: ${v.borderRadius};
	margin: 8px 0;
	transition: 0.2s ease;
`;

export const StyledLink = styled(NavLink)`
	display: flex;
	align-items: center;
	text-decoration: none;
	color: ${v.babyPowder};
	font-size: 16px;
	padding: calc(${v.smSpacing} - 5px);
	border-radius: ${v.borderRadius};

	&:hover {
		box-shadow: inset 0 0 0 1px ${v.cadetGrey};
	}

	&.active {
		background: ${v.cadetGrey};
	}
`;

export const StyledLinkIcon = styled.div`
	padding: ${v.smSpacing} 16px ${v.smSpacing} 14px;
	display: flex;

	svg {
		color: ${({ isActive }) =>
			!isActive ? `${v.babyPowder}` : `${v.sunGlow}`};
		font-size: 20px;
	}
`;

export const StyledLinkLabel = styled.span`
	display: block;
	color: ${({ isActive }) => (!isActive ? `${v.babyPowder}` : `${v.charcoal}`)};
	font-weight: ${({ isActive }) => (!isActive ? "" : "bold")};
	flex: 1;
	margin-left: calc(${v.smSpacing} - 8px);
	white-space: nowrap;
`;
