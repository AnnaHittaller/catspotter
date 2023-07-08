import { StyledAreaRangeSlider } from "../../styles/styled/Styled_AreaRangeSlider";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { useEffect, useState } from "react";
import { StyledP, StyledPBold } from "../../styles/styled/Styled_Text";

export default function AreaRangeSlider({ setArea, area, rangeValue, setRangeValue }) {
	const [value, setValue] = useState([0, 0]);

	// useEffect(() => {
	// 	const radiusInMeter = value[1] * 1000;
	// 	setArea((prevArea) => ({
	// 		...prevArea,
	// 		radius: radiusInMeter,
	// 	}));
	// }, [value, setArea]);

	useEffect(() => {
		const radiusInMeter = value[1] * 1000;
		console.log(radiusInMeter);
		
	}, [value]);

	return (
	   <StyledAreaRangeSlider>
      <div>
        <StyledP>My area radius:</StyledP>
              {rangeValue && rangeValue.length === 2 && (
          <StyledPBold>{rangeValue[1]} km</StyledPBold>
        )}
      </div>
      <RangeSlider
        id="rangeSlider"
        value={rangeValue}
        min={0}
        max={5}
        step={0.2}
        onInput={setRangeValue}
        thumbsDisabled={[true, false]}
        rangeSlideDisabled={true}
      />
    </StyledAreaRangeSlider>
	);
}
