import { v } from "../Variables";
import styled from "styled-components";

export const StyledSection = styled.section`
	padding: 2rem;
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	align-items: ${(props) => props.align || "flex-start"};
	background-color: ${(props) => props.bgColor || "transparent"};
	background-image: url(${(props) => props.bgImg || null});
	background-position: center;
	background-size: cover;
	min-height: ${(props) => props.minHeight || null};

	${(props) =>
		props.page === "home" &&
		`
    div:only-child {
      display: flex;
      align-items: flex-start;
      gap: 2rem;

      @media (max-width: 1000px) {
        flex-wrap: wrap;
        justify-content: center;
        padding: 1rem 0;
      }
    }
    `}

	${(props) =>
		props.fullpage === "true" &&
		`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    `}
`;

export const StyledBGSection = styled(StyledSection)`
	max-width: 600px;
	width: 30vw;
	min-width: 300px;
	transition: 0.2s ease;

	@media (max-width: 1000px) {
		min-width: ${({ theme }) => (theme.sidebaropen ? `0px` : null)};
		width: ${({ theme }) => (theme.sidebaropen ? `0px` : null)};
		padding: ${({ theme }) => (theme.sidebaropen ? `0px` : null)};
		display: ${({ theme }) => (theme.sidebaropen ? `none` : null)};
	}

	@media (max-width: 768px) {
		width: 100%;
		max-width: unset;
		min-height: 400px;
	}

	@media (max-width: 500px) {
		min-height: 275px;
	}
`;
