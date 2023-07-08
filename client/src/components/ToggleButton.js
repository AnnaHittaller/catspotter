import { useState } from "react";
import { StyledToggleButton } from "../styles/styled/Styled_ToggleButton";

export default function ToggleButton({ value }) {
	const [checked, setChecked] = useState(false);
	console.log(checked, value);

	const handleChange = (e) => {
		setChecked(e.target.checked);
	};

	return (
		<StyledToggleButton>
			<label>
				<input
					type="checkbox"
					onChange={handleChange}
					checked={checked}
					value={value}
				/>
				<div>
					<p>on</p>
				</div>
			</label>
		</StyledToggleButton>
	);
}
