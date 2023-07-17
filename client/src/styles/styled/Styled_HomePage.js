import styled from "styled-components";
import { v } from "../Variables";
import { cloudinaryRoot } from "../../utils/ImageUrlRoot";



export const StyledHero = styled.div`
	width: 100%;
	padding: calc(${v.lgSpacing} * 5) calc(${v.lgSpacing} * 3);
	background-image: url(${cloudinaryRoot}catspotter-assets/BG_home_xee69h.jpg);
	background-size: cover;
	background-repeat: no-repeat;
	background-color: ${v.columbiaBlue};
	background-position: 50% 70%;

	@media (max-width: 768px) {
		padding: ${v.lgSpacing};
		padding-bottom: calc(${v.lgSpacing} * 15);
		background-position: 90% 50%;
	}

	@media (max-width: 500px) {
		background-position: 90% 0%;
	}
`;

export const StyledHeroData = styled.div`
	border-radius: ${v.borderRadius};
	backdrop-filter: blur(10px);
	background-color: rgba(255, 235, 247, 0.2);
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding: ${v.lgSpacing};
	max-width: 500px;
	gap: ${v.mdSpacing};

	img {
		width: 250px;
	}

	p {
		font-weight: 600;
		font-size: 20px;
	}

	div {
		display: flex;
		flex-direction: row;
		aling-items: center;
		justify-items: center;
		gap: 1rem;
	}

	@media (max-width: 768px) {
		margin: 0 auto;
	}

	@media (max-width: 500px) {
		align-items: center;
		text-align: center;
		div {
			flex-direction: column;
			align-items: center;
			width: 100%;
		}

		img {
			width: 200px;
		}

		p {
			font-weight: 600;
			font-size: 16px;
		}
	}
`;

export const StyledFeatureIconDiv = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-items: flex-start;
	text-align: center;
	gap: 1rem;
	width: 20%;
	min-width: 110px;
	max-width: 200px;

	div {
		display: flex;
		align-items: center;
		justify-items: center;
		border: 3px solid ${v.sunGlow};
		border-radius: 50%;
		background: ${v.babyPowder};
		padding: 1rem;

		svg {
			font-size: 1.5rem;
		}
	}

	@media (max-width: 500px) {
		font-size: 14px;
	}
`;
