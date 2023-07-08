import styled from "styled-components";

export const StyledNotFound = styled.div`
	width: 80%;
	max-width: 1000px;
	margin: auto;

	img {
		width: 50%;
		min-height: 50vh;
		object-fit: cover;
	}

	div {
		overflow: hidden;
	}

	div > div {
		text-align: center;
	}

	button {
		margin-top: 2rem;
	}

	@media (max-width: 700px) {
		width: 100%;

		img {
			min-height: unset;
			width: 100%;
			height: 50%;
		}

		div {
			flex-direction: column-reverse;
		}

		div > div {
			flex-direction: column;
			padding: 2rem;
		}
	}
`;
