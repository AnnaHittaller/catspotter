import { v } from "../Variables";
import styled from "styled-components";

export const StyledAreaRangeSlider = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	gap: 1rem;

	#rangeSlider {
		background: ${v.columbiaBlue};
	}

	div {
		display: flex;
		justify-content: space-between;
		width: 100%;
	}

	.range-slider__thumb[data-lower] {
		width: 0;
	}

	.range-slider__thumb[data-upper] {
		background: ${v.charcoal};
	}

	.range-slider .range-slider__range {
		border-radius: 6px;
		background: ${v.cadetGrey};
	}
`;
