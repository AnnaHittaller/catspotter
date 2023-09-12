import { v } from "../Variables";
import styled from "styled-components";

export const StyledCatInfoSheetMini = styled.div`
	position: relative;
	max-width: 600px;
	height: 100%;

	> div {
		height: 100%;
	}
	
	> div > div:nth-of-type(1) {
		height: 100%;

	}

	img:nth-child(1) {
		height: 50px;
	}

	.thumbnail-wrapper {
		align-self: flex-start;
		max-width: 70px;
		
	}

	.thumbnail {
		height: 50px;
		width: 70px;
		object-fit: cover;
		padding: 0;
		border-radius: ${v.borderRadius};
		border: 1px solid ${v.cadetGrey};
	}
	
	.thumbnail-svg {
		height: 50px;
		width: 70px;
		object-fit: cover;
	}

	.thumbnail-svg svg {
		height: 50px;
		width: 70px;
		object-fit: cover;
		margin: 0;
		border: none;
	}

	svg {
		font-size: 2rem;
		cursor: pointer;
		color: ${v.cadetGrey};
	}
`;

export const StyledCatInfoSheetMidi = styled.div`
	max-width: 300px;
	min-width: 200px;

	> div {
		height: 100%;
		
	}

	h3 {
		padding: 0.5rem 0;
	}

	img {
		height: 150px;
		width: 100%;
		object-fit: cover;
	}

	.cat-svg svg {
		height: 150px;
		margin: 0 auto;
	}

	> div > svg {
		font-size: 2rem;
		color: ${v.sunGlow};
		position: absolute;
		background-color: ${v.babyPowder};
		padding: 0;
		top: -0.5rem;
		right: 0.5rem;
	}

	div:not(:nth-of-type(1)) {
		justify-content: center;
		padding: 0.5rem 1rem;
		gap: 0.5rem;
	}

	div > div {
		gap: 0;
	}

	button {
		justify-self: flex-end;
		margin-top: auto;
	}
`;

export const StyledCatInfoSheetMaxi = styled.div`
	width: 100%;
	position: relative;

	p {
		text-align: center;
	}

	div > svg + p:nth-child(2) {
		color: ${v.sunGlow};
		font-size: 2rem;
		margin-bottom: -1rem;
	}

	.lostP {
		color: ${v.sunGlow};
		font-size: 2rem;
		margin-bottom: -1rem;
	}

	> div > div:nth-of-type(2) {
		align-items: flex-start;
		gap: 2rem;

		@media (max-width: 1000px) {
			flex-direction: column;
			gap: 1rem;
		}
	}

	img:nth-of-type(1) {
		width: 100%;
		// max-width: 400px;
		height: auto;
		max-height: 400px;
		object-fit: cover;
		border-radius: 10px;
	}

	svg:nth-of-type(1) {
		font-size: 2rem;
		color: ${v.sunGlow};
		position: absolute;
		background-color: ${v.babyPowder};
		padding: 0;
		top: -0.25rem;
		right: 0.5rem;
	}

	.cat-svg svg {
		width: 100%;
		max-width: 200px;
		height: auto;
		position: unset;
		margin: 0 auto;
	}

	a {
		color: inherit;
	}

	div > div:nth-last-child(2) {
		position: relative;
	}

	svg:nth-child(2) {
		position: absolute;
		right: 0;
		font-size: 1.5rem;
		cursor: pointer;
		color: ${v.cadetGrey};
	}

	.leaflet-attribution-flag {
		visibility: hidden;
	}
`;



export const StyledCatInfoSheetNotification = styled.div`
	width: 100%;
	max-width: 500px;
	text-align: center;

	img {
		width: 100%;
		border-radius: ${v.borderRadius};
	}

	.data-wrapper {
		flex-direction: row;
		align-items: stretch;
		> div > div{

			height: 100%;
			
		}

		@media (max-width: 800px) {
			flex-direction: column;
		}
	}
`;