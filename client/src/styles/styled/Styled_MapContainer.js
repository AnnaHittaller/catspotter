import styled from "styled-components";
import { v, btnReset } from "../Variables";

export const StyledMapContainer = styled.div`
	height: ${(props) => props.height || "500px"};
	min-width: 100%;
	border-radius: ${v.borderRadius};
	border: 3px solid ${v.cadetGrey};

	.leaflet-container {
		width: 100%;
		height: 100%;
		border-radius: ${v.borderRadius};
	}

	path.leaflet-interactive {
		stroke: rgba(137, 164, 189, 1);
		fill: rgba(137, 164, 189, 1);
	}

	.cluster-icon {
		width: 30px;
		height: 30px;
		border-radius: 50%;
		background-color: rgba(255, 202, 30, 0.7);
		border: 5px solid rgba(255, 202, 30, 0.2);
		transform: translate(-25%, -25%);
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 600;
		font-size: ${v.mdSpacing};
		color: ${v.charcoal};
	}

	.leaflet-popup-content-wrapper {
		padding: 0;
	}

	.leaflet-popup-content {
		margin: 0;

		p {
			margin: unset;
		}
	}

	.leaflet-popup-close-button span {
		color: ${v.charcoal};
		position: absolute;
		top: -12px;
		right: 7px;
		font-size: 2rem;
	}

	.leaflet-popup-content-wrapper,
	.leaflet-popup-tip {
		background: ${v.babyPowder};
		color: ${v.charcoal};
	}

	.leaflet-popup-tip {
		border-bottom: 2px solid ${v.cadetGrey};
		border-right: 2px solid ${v.cadetGrey};
		position: relative;
		box-shadow: none;
	}

	svg.leaflet-attribution-flag {
		display: none;
	}

	.leaflet-control-locate-location-arrow {
		color: red;
	}

	.leaflet-bar .leaflet-control-locate {
		color: green;
	}

	.leaflet-control-locate.following a .leaflet-control-locate-location-arrow {
		background-image: url(data:image/svg+xml;charset=UTF-8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path fill=\"rgb%2832, 116, 182%29\" d=\"M445 4 29 195c-48 23-32 93 19 93h176v176c0 51 70 67 93 19L508 67c16-38-25-79-63-63z\"/></svg>);
	}

	.leaflet-control-locate.active a .leaflet-control-locate-location-arrow {
		background-image: url(data:image/svg+xml;charset=UTF-8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path fill=\"rgb%2832, 116, 182%29\" d=\"M445 4 29 195c-48 23-32 93 19 93h176v176c0 51 70 67 93 19L508 67c16-38-25-79-63-63z\"/></svg>);
	}

	.leaflet-control-locate-location-arrow {
		color: ${v.charcoal};
	}

	.leaflet-control-zoom-in,
	.leaflet-control-zoom-out {
		color: ${v.charcoal};
	}

	.leaflet-control-zoom-in {
		border-bottom: 1px solid ${v.sunGlow};
	}

	.leaflet-bar {
		border: 2px solid ${v.sunGlow};
	}
`;
